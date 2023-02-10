import { isAddress } from '@ethersproject/address'
import { formatEther, parseEther } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'
import { NOT_ON_SALE_SELLER } from 'config/constants'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxError from 'hooks/useCatchTxError'
import { useSWRContract } from 'hooks/useSWRContract'
import { useState } from 'react'
import addresses from 'config/constants/contracts'
import bep20Abi from '../../config/abi/erc20.json'
import styled from 'styled-components'
import { FDAOIcon, MDAOIcon, PresaleLink } from '../../../packages/uikit/src/components/Svg'
import useToast from 'hooks/useToast'
import { getContract } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getDonateAddress, getDonateRMAddress } from 'utils/addressHelpers'
import { MaxUint256 } from '@ethersproject/constants'
import { isNumber } from 'lodash'
import { Button, Input, Flex } from '@pancakeswap/uikit'
import { BigNumber } from '@ethersproject/bignumber'
import { useDonateBNB, useDonateRM } from 'hooks/useContract'

const Content = styled.div`
  background: #ffffff;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  color: #007be4;
`

const TokenName = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
`

const PresaleTitle = styled.div`
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;
  margin: 20px 0;
`

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 260px;
  margin: 10px 0;
`

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #2e2b54;
`

const DonateButton = styled(Button)`
  margin: 20px 8px;
`

export default function CommonPresaleCard(props) {
  const { type = 0 } = props
  const tokenName = type == 0 ? 'RM' : 'BNB'

  const donateContract = type == 0 ? useDonateRM(type) : useDonateBNB(type)
  const { account } = useWeb3React()
  const { library } = useActiveWeb3React()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError, loading: isLoading } = useCatchTxError()
  const [buyAmount, setBuyAmount] = useState(null)
  const [isApproved, setIsApproved] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { data: price } = useSWRContract([donateContract, type == 0 ? 'priceRM' : 'priceBNB'])
  const { data: raised } = useSWRContract([donateContract, 'poolInfos', [type == 0 ? 1 : 2]])
  const { data: user } = useSWRContract([donateContract, 'getInfo', [account || NOT_ON_SALE_SELLER]])
  const { data: nowPhase } = useSWRContract([donateContract, 'nowPhase'])

  const handleDonate = async () => {
    const receipt = await fetchWithCatchTxError(() =>
      callWithGasPrice(donateContract, type == 0 ? 'RMDonate' : 'BNBDonate', [buyAmount], {
        value: type === 1 ? BigNumber.from(buyAmount.toString()).mul(price) : undefined,
      }),
    )
    if (receipt?.status) {
      alert(`success:${receipt.transactionHash}`)
    }
    setBuyAmount(0)
  }

  const approve = async () => {
    const rmC = addresses.rm[56]
    const isValidAddress = isAddress(rmC) !== false
    if (!isValidAddress) {
      toastError('not valid address')
      return
    }
    const contract = getContract(rmC, bep20Abi, library.getSigner())
    const receipt = await fetchWithCatchTxError(() => {
      return callWithGasPrice(contract, 'approve', [getDonateRMAddress(), MaxUint256])
    })
    if (receipt?.status) {
      toastSuccess('Approved')
      setIsApproved(true)
    }
  }

  const refund = async () => {
    const receipt = await fetchWithCatchTxError(() => callWithGasPrice(donateContract, 'claimRefund'))
    if (receipt?.status) {
      alert(`refund success:${receipt.transactionHash}`)
    }
    setBuyAmount(0)
  }

  const claimFDAO = async () => {
    const receipt = await fetchWithCatchTxError(() => callWithGasPrice(donateContract, 'claimFdao'))
    if (receipt?.status) {
      alert(`claim success:${receipt.transactionHash}`)
    }
  }
  const percentage = () => {
    if (raised && price) {
      const m1 = Number(formatEther(type == 0 ? raised.raisedRM : raised.raisedBNB))
      const m2 = Number(formatEther(price))
      const m3 = Number(formatEther(raised.totalFdao))

      return Number(Number(m1 / (m2 * m3)).toFixed(1)) * 100
    }
    return '?'
  }

  const needPrice = Number(buyAmount) > 0 && price ? (Number(formatEther(price)) * Number(buyAmount)).toFixed(6) : '0'

  return (
    <Content>
      {/* <MDAOIcon style={{ margin: '20px 0' }} width={80} height={80} /> */}
      <FDAOIcon style={{ margin: '20px 0' }} width={80} height={80} />
      <TokenName>FDAO</TokenName>
      <PresaleTitle>{tokenName} Super Raising</PresaleTitle>
      <PresaleLink width={280} style={{ margin: '20px 0' }} />
      <InfoBox>
        <InfoItem>
          <div>Price</div>
          <div>
            {price ? Number(formatEther(price)).toFixed(6) : 0} {tokenName}/FDAO
          </div>
        </InfoItem>
        <InfoItem>
          <div>Total</div>
          <div>{raised ? Number(formatEther(raised.totalFdao)).toFixed(1) : 0} FDAO</div>
        </InfoItem>
        <InfoItem>
          <div>Rasied</div>
          <div style={{ textAlign: 'right' }}>
            {raised ? Number(formatEther(type == 0 ? raised.raisedRM : raised.raisedBNB)).toFixed(2) : 0} {tokenName}{' '}
            <br />({percentage()}%)
          </div>
        </InfoItem>
        <InfoItem>
          <div>Donated</div>
          <div>
            {user ? Number(formatEther(user.totalPayAmount)).toFixed(6) : 0} {tokenName}
          </div>
        </InfoItem>

        <InfoItem>
          <div>Need {type == 0}</div>
          <div>
            {needPrice} {tokenName}
          </div>
        </InfoItem>
        <Input
          style={{ margin: '10px 0' }}
          placeholder={'Paste buy FDAO number'}
          scale="md"
          autoComplete="off"
          value={buyAmount}
          onChange={(e) => setBuyAmount(e.target.value as any)}
        />
      </InfoBox>

      <Flex>
        <DonateButton
          disabled={isNumber(buyAmount) && Number(buyAmount) > 0}
          onClick={() => {
            if (type == 1) {
              handleDonate()
              return
            }
            if (isApproved) {
              handleDonate()
            } else {
              approve()
            }
          }}
          isLoading={isLoading}
          scale="md"
        >
          {type == 1 ? 'Get FDAO' : isApproved ? 'Get FDAO' : 'Approve'}
        </DonateButton>

        <DonateButton
          disabled={!(nowPhase == 4 && user && !user.refunded)}
          onClick={refund}
          isLoading={isLoading}
          scale="md"
        >
          {'Refund'}
        </DonateButton>
        {user && Number(formatEther(user.canClaimAmount)) > 0 && (
          <DonateButton onClick={claimFDAO} isLoading={isLoading} scale="md">
            {'Claim'}
          </DonateButton>
        )}
      </Flex>
    </Content>
  )
}
