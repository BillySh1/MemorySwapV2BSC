import { TokenImage } from 'components/TokenImage'
import styled from 'styled-components'
import { Fetcher, WETH } from '@pancakeswap/sdk'
import { Button, TimeLockIcon } from '@pancakeswap/uikit'
import TimeCards from './TImeCards'
import { useEffect, useState } from 'react'
import useTheme from 'hooks/useTheme'
import { formatEther } from '@ethersproject/units'
import useCatchTxError from 'hooks/useCatchTxError'
import { useERC20, useTimeLocker } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useToast from 'hooks/useToast'
import SteamIcon from '../assets/steam'
import { useTranslation } from 'contexts/Localization'
import { useAsync } from 'react-use'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.card.background};
  border-radius: 48px;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 123, 228, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0 0.8rem 2rem;
  ${({ theme }) => theme.mediaQueries.xs} {
    max-width: 100%;
    margin: 0 0.8rem 0.8rem;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 360px;
    transform: none;
  }
`
const InfoHeader = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 0.8rem;
`
const TokenTitle = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`

const InfoRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 1rem;
`

const InfoStatus = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  gap: 8px;
  margin: 8px 0;
`
const InfoItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0;
  font-size: 12px;
`

const LinkWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`

interface LockItemProps {
  info: any
}

export function LockItem(props: LockItemProps) {
  const { info } = props
  const [remainTime, setRemainTime] = useState(['00', '00', '00'])
  const [lockInfo, setLockInfo] = useState<any>({})
  const [canClaim, setCanClaim] = useState(false)
  const { callWithGasPrice } = useCallWithGasPrice()
  const lockerContract = useTimeLocker()
  const { t } = useTranslation()

  const { fetchWithCatchTxError, loading: isClaiming } = useCatchTxError()
  const { toastSuccess } = useToast()
  const color = useTheme()
  const tokenC = useERC20(info.tokenAddress)
  const { value: token } = useAsync(async () => {
    return {
      name: await tokenC.name(),
      symbol: await tokenC.symbol(),
    }
  }, [info])
  useEffect(() => {
    setLockInfo({
      amount: formatEther(info.amount),
      lockId: info.lockId.toString(),
      releaseTime: info.releaseTime.toString(),
      lockTime: info.lockTime.toString(),
      claimed: info.claimed,
      address: info.tokenAddress,
    })
    setCanClaim(info.releaseTime.toString() <= Math.floor(new Date().getTime() / 1000))
    getRemainTime(lockInfo.releaseTime)
  }, [info])

  const getRemainTime = (v) => {
    const diff = Math.ceil((v * 1000 - new Date().getTime()) / 1000)
    if (diff <= 0) {
      setRemainTime(['00', '00', '00'])
      setCanClaim(true)
      return
    }
    const days = Math.floor(diff / 3600 / 24)
    const hours = Math.floor((diff - days * 24 * 3600) / 3600)
    const mins = Math.floor((diff - days * 24 * 3600 - hours * 3600) / 60)
    setRemainTime([
      days.toString().padStart(2, '0'),
      hours.toString().padStart(2, '0'),
      mins.toString().padStart(2, '0'),
    ])
  }
  const onClaim = async () => {
    const receipt = await fetchWithCatchTxError(() =>
      callWithGasPrice(lockerContract, 'claim', ['0x7991FCCDbA857f944Af88b39d49cb7e91E4e4a41', lockInfo.lockId]),
    )
    if (receipt?.status) {
      toastSuccess('Success')
    }
  }
  if(!info || !token) return null
  return (
    <Wrapper>
      <InfoHeader>
        <TokenImage width={36} height={36} token={WETH[1819]} />
        <TokenTitle>{token.symbol ?? token.name}</TokenTitle>
        {(canClaim && (
          <InfoStatus>
            <TimeLockIcon width={24} height={24} />
            <span>{lockInfo.claimed ? t('lock progress') : t('lock received')}</span>
          </InfoStatus>
        )) || (
          <InfoStatus>
            <TimeLockIcon width={24} height={24} />
            <span>{info.claimed ? t('lock_finished') : t('lock progress')}</span>
          </InfoStatus>
        )}
        <LinkWrapper>
          <SteamIcon width={48} height={48} />
        </LinkWrapper>
      </InfoHeader>
      <div style={{ width: '100%', margin: '8px 0' }}>
        <InfoRow>
          <div>2022.9.2 16:00 {t('Start')}</div>
          <div>-</div>
          <div>2022.9.12 20:00 {t('end')}</div>
        </InfoRow>
        <TimeCards remainTime={remainTime} />
      </div>
      <InfoItem>
        <div>{t('LockUpQuanity')}</div>
        <div> {lockInfo.amount} MDAO</div>
      </InfoItem>
      <InfoItem style={{ color: color.theme.colors.primary }}>
        <div>{t('LockUpTime')}</div>
        <div> {remainTime[0] + 'd' + remainTime[1] + 'h' + remainTime[2] + 'm'} </div>
      </InfoItem>

      {!info.claimed && (
        <InfoItem style={{ justifyContent: 'center' }}>
          <Button scale="md" width={'100%'} isLoading={isClaiming} onClick={onClaim}>
            {t('Receive')}
          </Button>
        </InfoItem>
      )}
    </Wrapper>
  )
}
