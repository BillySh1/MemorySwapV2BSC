import { Button, CardBody, CardFooter, Flex, Input } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from '@ethersproject/bignumber'
import { AppBody, AppHeader } from 'components/App'
import { useTranslation } from 'contexts/Localization'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxError from 'hooks/useCatchTxError'
import { useERC20, useFDAOClaim, useXen } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import Page from 'views/Page'
import { useCurrencyBalance } from 'state/wallet/hooks'
import NumericalInput from 'components/CurrencyInputPanel/NumericalInput'
import { Token } from '@pancakeswap/sdk'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { MaxUint256 } from '@ethersproject/constants'
import { useSWRContract } from 'hooks/useSWRContract'
import { parseEther } from '@ethersproject/units'
const Body = styled(CardBody)`
  background-color: ${({ theme }) => theme.colors.backgroundAlt2};
`
const PageWrapper = styled(Page)`
  justify-content: center;
`
const Intro = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 12px 0;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`
const InputPanel = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  z-index: 1;
`

const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
`

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`

const Container = styled.div`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`

const oldFDAO = '0xc0719014339Dd1A3914aB13aE7f3D4Bc0521E105'
const newFDAO = '0x3bdB1dD1eB0034D231B3e62fA0D98f1e4bf53AdD'

export default function FDAOExchange() {
  const FDAOClaimContract = useFDAOClaim()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { callWithGasPrice } = useCallWithGasPrice()
  const [mintAmount, setMintAmount] = useState<any>(0)
  const [isApproved, setIsApproved] = useState(false)
  const { fetchWithCatchTxError, loading: isLoading } = useCatchTxError()
  const oldfdaoC = useERC20(oldFDAO)
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, new Token(513100, oldFDAO, 18, 'FDAO'))
  const newFDAOBalance = useCurrencyBalance(account ?? undefined, new Token(513100, newFDAO, 18, 'FDAO'))
  const { data: canClaim } = useSWRContract([FDAOClaimContract, 'canClaim'])

  const handleClaim = async () => {
    const receipt = await fetchWithCatchTxError(() =>
      callWithGasPrice(FDAOClaimContract, 'claim', [parseEther(mintAmount)]),
    )
    if (receipt?.status) {
      alert(`Exhcange Success:${receipt.transactionHash}`)
    }
  }
  const maxAmountInput = maxAmountSpend(selectedCurrencyBalance)
  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      setMintAmount(maxAmountInput.toExact())
    }
  }, [maxAmountInput, setMintAmount])

  const approve = async () => {
    const receipt = await fetchWithCatchTxError(() =>
      callWithGasPrice(oldfdaoC, 'approve', [FDAOClaimContract.address, MaxUint256]),
    )
    if (receipt?.status) {
      setIsApproved(true)
    } else {
      setIsApproved(false)
    }
  }
  return (
    <PageWrapper>
      <AppBody>
        <AppHeader noConfig title={t('FDAO Exchange')} subtitle={t('Exchange your old FDAO to new FDAO')}></AppHeader>
        <Body>
          <Flex width="100%" alignItems="center" flexDirection="column">
            <Intro>
              <div>{t('FDAO(EXPIRED)')}</div>
              <div>
                {t('Balance: %balance%', { balance: selectedCurrencyBalance?.toSignificant(6) ?? t('Loading') })}
              </div>
            </Intro>
            <Intro>
              <div>{t('FDAO')}</div>
              <div>{t('Balance: %balance%', { balance: newFDAOBalance?.toSignificant(6) ?? t('Loading') })}</div>
            </Intro>
            <InputPanel>
              <Container>
                <LabelRow>
                  <NumericalInput
                    className="token-amount-input"
                    value={mintAmount}
                    onUserInput={(val) => {
                      setMintAmount(val)
                    }}
                  />
                </LabelRow>
                <InputRow selected={true}>
                  {account && (
                    <Button onClick={handleMaxInput} scale="xs" variant="secondary">
                      {'MAX'}
                    </Button>
                  )}
                </InputRow>
              </Container>
            </InputPanel>
          </Flex>
        </Body>
        <CardFooter style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <Button
            disabled={!canClaim}
            onClick={() => {
              if (isApproved) {
                handleClaim()
              } else {
                approve()
              }
            }}
            isLoading={isLoading}
            scale="md"
          >
            {isApproved ? t('Exchange') : 'Approve'}
          </Button>
        </CardFooter>
      </AppBody>
    </PageWrapper>
  )
}
