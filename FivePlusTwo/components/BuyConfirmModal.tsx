import { useEffect, useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { requiresApproval } from 'utils/requiresApproval'
import { MaxUint256 } from '@ethersproject/constants'
import {
  Modal,
  Text,
  Flex,
  HelpIcon,
  BalanceInput,
  Ticket,
  useTooltip,
  Skeleton,
  Button,
  ArrowForwardIcon,
  Input,
} from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import tokens from 'config/constants/tokens'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import { useAppDispatch } from 'state'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useLottery } from 'state/lottery/hooks'
import { fetchUserTicketsAndLotteries } from 'state/lottery'
import useTheme from 'hooks/useTheme'
import useTokenBalance from 'hooks/useTokenBalance'
import { FetchStatus } from 'config/constants/types'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useCake, useFivePlusTwo, useLotteryV2Contract, useMdao } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useToast from 'hooks/useToast'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { ToastDescriptionWithTx } from 'components/Toast'
import ApproveConfirmButtons, { ButtonArrangement } from 'components/ApproveConfirmButtons'
import { useTicketsReducer } from 'views/Lottery/components/BuyTicketsModal/useTicketsReducer'
import EditNumbersModal from 'views/Lottery/components/BuyTicketsModal/EditNumbersModal'
import NumTicketsToBuyButton from 'views/Lottery/components/BuyTicketsModal/NumTicketsToBuyButton'
import NumberCom from './NumberCom'
import { useAsync } from 'react-use'
import { formatUnits, parseUnits } from '@ethersproject/units'

const StyledModal = styled(Modal)`
  min-width: 280px;
  max-width: 320px;
`

const ShortcutButtonsWrapper = styled(Flex)<{ isVisible: boolean }>`
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 24px;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
`

interface BuyTicketsModalProps {
  onDismiss?: () => void
  frontNumbers: Array<string | number>
  backNumbers: Array<string | number>
  contract: any
}

enum BuyingStage {
  BUY = 'Buy',
  EDIT = 'Edit',
}

const BuyConfirmModal: React.FC<BuyTicketsModalProps> = ({ onDismiss, frontNumbers, backNumbers, contract }) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { theme } = useTheme()
  const {
    maxNumberTicketsPerBuyOrClaim,
    currentLotteryId,
    currentRound: {
      priceTicketInCake = new BigNumber('200000'),
      discountDivisor,
      userTickets: { tickets: userCurrentTickets },
    },
  } = useLottery()
  const { callWithGasPrice } = useCallWithGasPrice()
  const [totalCost, setTotalCost] = useState(0)
  const [multiple, setMultiple] = useState('1')
  const [buyingStage, setBuyingStage] = useState<BuyingStage>(BuyingStage.BUY)
  const [maxPossibleTicketPurchase, setMaxPossibleTicketPurchase] = useState(BIG_ZERO)
  const [maxTicketPurchaseExceeded, setMaxTicketPurchaseExceeded] = useState(false)
  const [buyToAddress, setBuyToAddress] = useState(account)
  const [userNotEnoughCake, setUserNotEnoughCake] = useState(false)
  const { reader: mdaoContractReader, signer: mdaoContractApprover } = useMdao()
  const { toastSuccess } = useToast()
  const { balance: userCake, fetchStatus } = useTokenBalance(tokens.cake.address)
  // balance from useTokenBalance causes rerenders in effects as a new BigNumber is instantiated on each render, hence memoising it using the stringified value below.
  const stringifiedUserCake = userCake.toJSON()
  const memoisedUserCake = useMemo(() => new BigNumber(stringifiedUserCake), [stringifiedUserCake])

  const dispatch = useAppDispatch()
  const hasFetchedBalance = fetchStatus === FetchStatus.Fetched

  const { value: priceSingleLottery } = useAsync(async () => {
    const res = await contract.getTicketPrice()
    if (!res) return ''
    return formatUnits(res).toString()
  })

  const TooltipComponent = () => (
    <>
      <Text mb="16px">
        {t(
          'Buying multiple tickets in a single transaction gives a discount. The discount increases in a linear way, up to the maximum of 100 tickets:',
        )}
      </Text>
      <Text>{t('2 tickets: 0.05%')}</Text>
      <Text>{t('50 tickets: 2.45%')}</Text>
      <Text>{t('100 tickets: 4.95%')}</Text>
    </>
  )
  const { targetRef, tooltip, tooltipVisible } = useTooltip(<TooltipComponent />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })

  const limitNumberByMaxTicketsPerBuy = useCallback(
    (number: BigNumber) => {
      return number.gt(maxNumberTicketsPerBuyOrClaim) ? maxNumberTicketsPerBuyOrClaim : number
    },
    [maxNumberTicketsPerBuyOrClaim],
  )

  const getTicketCostAfterDiscount = useCallback(
    (numberTickets: BigNumber) => {
      const totalAfterDiscount = priceTicketInCake
        .times(numberTickets)
        .times(discountDivisor.plus(1).minus(numberTickets))
        .div(discountDivisor)
      return totalAfterDiscount
    },
    [discountDivisor, priceTicketInCake],
  )

  const getMaxTicketBuyWithDiscount = useCallback(
    (numberTickets: BigNumber) => {
      const costAfterDiscount = getTicketCostAfterDiscount(numberTickets)
      const costBeforeDiscount = priceTicketInCake.times(numberTickets)
      const discountAmount = costBeforeDiscount.minus(costAfterDiscount)
      const ticketsBoughtWithDiscount = discountAmount.div(priceTicketInCake)
      const overallTicketBuy = numberTickets.plus(ticketsBoughtWithDiscount)
      return { overallTicketBuy, ticketsBoughtWithDiscount }
    },
    [getTicketCostAfterDiscount, priceTicketInCake],
  )

  const validateInput = useCallback(
    (inputNumber: BigNumber) => {
      const limitedNumberTickets = limitNumberByMaxTicketsPerBuy(inputNumber)
      const cakeCostAfterDiscount = getTicketCostAfterDiscount(limitedNumberTickets)

      if (cakeCostAfterDiscount.gt(userCake)) {
        setUserNotEnoughCake(true)
      } else if (limitedNumberTickets.eq(maxNumberTicketsPerBuyOrClaim)) {
        setMaxTicketPurchaseExceeded(true)
      } else {
        setUserNotEnoughCake(false)
        setMaxTicketPurchaseExceeded(false)
      }
    },
    [limitNumberByMaxTicketsPerBuy, getTicketCostAfterDiscount, maxNumberTicketsPerBuyOrClaim, userCake],
  )

  useEffect(() => {
    if (multiple) {
      const res = Number(priceSingleLottery) * parseInt(multiple, 10)
      setTotalCost(res)
    }
    const getMaxPossiblePurchase = () => {
      const maxBalancePurchase = memoisedUserCake.div(priceTicketInCake)
      const limitedMaxPurchase = limitNumberByMaxTicketsPerBuy(maxBalancePurchase)
      let maxPurchase

      // If the users' max CAKE balance purchase is less than the contract limit - factor the discount logic into the max number of tickets they can purchase
      if (limitedMaxPurchase.lt(maxNumberTicketsPerBuyOrClaim)) {
        // Get max tickets purchasable with the users' balance, as well as using the discount to buy tickets
        const { overallTicketBuy: maxPlusDiscountTickets } = getMaxTicketBuyWithDiscount(limitedMaxPurchase)

        // Knowing how many tickets they can buy when counting the discount - plug that total in, and see how much that total will get discounted
        const { ticketsBoughtWithDiscount: secondTicketDiscountBuy } =
          getMaxTicketBuyWithDiscount(maxPlusDiscountTickets)

        // Add the additional tickets that can be bought with the discount, to the original max purchase
        maxPurchase = limitedMaxPurchase.plus(secondTicketDiscountBuy)
      } else {
        maxPurchase = limitedMaxPurchase
      }

      if (hasFetchedBalance && maxPurchase.lt(1)) {
        setUserNotEnoughCake(true)
      } else {
        setUserNotEnoughCake(false)
      }

      setMaxPossibleTicketPurchase(maxPurchase)
    }
    getMaxPossiblePurchase()
  }, [
    maxNumberTicketsPerBuyOrClaim,
    priceTicketInCake,
    memoisedUserCake,
    limitNumberByMaxTicketsPerBuy,
    getTicketCostAfterDiscount,
    getMaxTicketBuyWithDiscount,
    hasFetchedBalance,
    multiple,
  ])

  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
    useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        return requiresApproval(mdaoContractReader, account, contract.address)
      },
      onApprove: () => {
        return callWithGasPrice(mdaoContractApprover, 'approve', [contract.address, MaxUint256])
      },
      onApproveSuccess: async ({ receipt }) => {
        toastSuccess(
          t('Contract enabled - you can now purchase lottery'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
        )
      },
      onConfirm: () => {
        console.log('param', frontNumbers, backNumbers, multiple, buyToAddress)
        return callWithGasPrice(contract, 'buyTicket', [frontNumbers, backNumbers, multiple, buyToAddress ?? account])
      },
      onSuccess: async ({ receipt }) => {
        onDismiss?.()
        dispatch(fetchUserTicketsAndLotteries({ account, currentLotteryId }))
        toastSuccess(t('Purchased!'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      },
    })

  const getErrorMessage = () => {
    if (userNotEnoughCake) return t('Insufficient CAKE balance')
    return t('The maximum number of tickets you can buy in one transaction is %maxTickets%', {
      maxTickets: maxNumberTicketsPerBuyOrClaim.toString(),
    })
  }

  const disableBuying = !isApproved || isConfirmed

  return (
    <StyledModal title={t('Buy 5+2')} onDismiss={onDismiss} headerBackground={theme.colors.gradients.cardHeader}>
      {tooltipVisible && tooltip}
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Text color="textSubtle">{t('Your Numbers')}:</Text>
      </Flex>
      <Flex flexWrap={'wrap'} justifyContent="center" style={{ gap: '8px' }}>
        {frontNumbers.map((x) => (
          <NumberCom outline value={x as any} width={32} height={32} fontSize={14} />
        ))}
        {backNumbers.map((i) => (
          <NumberCom outline extra value={i as any} width={32} height={32} fontSize={14} />
        ))}
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Text color="textSubtle">{t('To (optional)')}:</Text>
      </Flex>
      <Flex style={{ gap: '8px' }}>
        <Input value={buyToAddress} onChange={(e) => setBuyToAddress(e.target.value)} />
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Text color="textSubtle">{t('Multiple')}:</Text>
      </Flex>
      <Flex style={{ gap: '8px' }}>
        <Input value={multiple} onChange={(e) => setMultiple(e.target.value)} />
      </Flex>
      <Flex alignItems="center" justifyContent="flex-end" mt="4px" mb="12px">
        <Flex justifyContent="flex-end" flexDirection="column">
          {account && (userNotEnoughCake || maxTicketPurchaseExceeded) && (
            <Text fontSize="12px" color="failure">
              {getErrorMessage()}
            </Text>
          )}
        </Flex>
      </Flex>

      <Flex flexDirection="column">
        <Flex mb="8px" justifyContent="space-between">
          <Text color="textSubtle" fontSize="14px">
            {t('Cost')} (MDAO)
          </Text>
          <Text color="textSubtle" fontSize="14px">
            {priceSingleLottery} MDAO
          </Text>
        </Flex>

        <Flex borderTop={`1px solid ${theme.colors.cardBorder}`} pt="8px" mb="24px" justifyContent="space-between">
          <Text color="textSubtle" fontSize="16px">
            {t('You pay')}
          </Text>
          <Text fontSize="16px" bold>
            ~{totalCost} MDAO
          </Text>
        </Flex>

        {account ? (
          <>
            <ApproveConfirmButtons
              isApproveDisabled={isApproved}
              isApproving={isApproving}
              isConfirmDisabled={disableBuying}
              isConfirming={isConfirming}
              onApprove={handleApprove}
              onConfirm={handleConfirm}
              buttonArrangement={ButtonArrangement.SEQUENTIAL}
              confirmLabel={t('Buy Instantly')}
              confirmId="lotteryBuyInstant"
            />
          </>
        ) : (
          <ConnectWalletButton />
        )}

        <Text mt="24px" fontSize="12px" color="textSubtle">
          5+2 {t('Tips')}
        </Text>
      </Flex>
    </StyledModal>
  )
}

export default BuyConfirmModal
