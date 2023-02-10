import { Button, CardBody, CardFooter, Flex, Input } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from '@ethersproject/bignumber'
import { AppBody, AppHeader } from 'components/App'
import { useTranslation } from 'contexts/Localization'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxError from 'hooks/useCatchTxError'
import { useXen } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { useState } from 'react'
import styled from 'styled-components'
import Page from 'views/Page'
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
`

export default function Xen() {
  const XENContract = useXen()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess } = useToast()
  const [mintAmount, setMintAmount] = useState(1)
  const [lockDays, setLockDays] = useState(1)
  const [canClaimNum, setCanClaimNum] = useState(0)
  const { fetchWithCatchTxError, loading: isLoading } = useCatchTxError()

  const queryNum = async () => {
    const res = await XENContract.userTermLength(account, lockDays)
    console.log(`Success ${res.toString()}`)
    setCanClaimNum(res.toString() as any)
  }
  const handleMint = async () => {
    const receipt = await fetchWithCatchTxError(() =>
      callWithGasPrice(XENContract, 'mint', [mintAmount, lockDays], {
        value: BigNumber.from((mintAmount * 10 ** 18).toString()),
      }),
    )
    if (receipt?.status) {
      alert(`Mint Success:${receipt.transactionHash}`)
    }
  }

  const handleClaim = async () => {
    const receipt = await fetchWithCatchTxError(() => callWithGasPrice(XENContract, 'claim', [mintAmount, lockDays]))
    if (receipt?.status) {
      alert(`Mint Success:${receipt.transactionHash}`)
    }
  }

  return (
    <PageWrapper>
      <AppBody>
        <AppHeader noConfig title={t('FrenTitle')} subtitle={t('FrenSubtitle')}></AppHeader>
        <Body>
          <Flex width="100%" alignItems="center" flexDirection="column">
            <Intro>{t('FrenAccount')}</Intro>
            <Input
              placeholder={'Please paste number'}
              scale="md"
              autoComplete="off"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value as any)}
            />

            <Intro>{t('FrenLockdays')}</Intro>
            <Input
              placeholder={'Please paste number'}
              scale="md"
              autoComplete="off"
              value={lockDays}
              onChange={(e) => setLockDays(e.target.value as any)}
            />
            <Intro>{t('FrenMinted')}</Intro>
            <Intro>{canClaimNum}</Intro>
          </Flex>
        </Body>
        <CardFooter style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <Button onClick={queryNum} isLoading={isLoading} scale="md">
            {t('Query')}
          </Button>
          <Button onClick={handleMint} isLoading={isLoading} scale="md">
            {t('Mint')}
          </Button>
          <Button onClick={handleClaim} isLoading={isLoading} scale="md">
            {t('Claim')}
          </Button>
        </CardFooter>
      </AppBody>
    </PageWrapper>
  )
}
