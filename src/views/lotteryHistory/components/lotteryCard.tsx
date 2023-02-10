import { formatUnits } from '@ethersproject/units'
import { useTranslation } from 'contexts/Localization'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxError from 'hooks/useCatchTxError'
import { useFivePlusTwo } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAsync } from 'react-use'
import styled from 'styled-components'
import isZero from 'utils/isZero'
import NumberCom from 'views/FivePlusTwo/components/NumberCom'
import { useMatchBreakpoints } from '../../../../packages/uikit/src/hooks'
import BadgeIcon from '../assets/badge'
import LotteryCardIcon from '../assets/lottery'

const LotteryCardWrapper = styled.div<{ type: number }>`
  position: relative;
  width: 100%;
  background: ${({ type }) => (type === 0 ? '#007BE4' : type === 1 ? '#1A73BE' : '#CC6D6D')};
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: column;
    padding: 12px 8px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    padding: 24px;
  }
`

const BadgeIconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  ${({ theme }) => theme.mediaQueries.xs} {
    zoom: 0.5;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    zoom: 1;
  }
`

const LotteryInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: auto;
  }
`

const LotteryInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-weight: 800;
  color: white;
  text-align: center;
  justify-content: space-between;
  gap: 1rem;
  ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: row;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: column;
  }
`

const LotteryInfoRow = styled.div`
  text-align: center;
  margin: 8px 0;
  & > p {
    font-size: 20px;
    margin: 8px 0;
  }
  ${({ theme }) => theme.mediaQueries.xs} {
    & > p {
      font-size: 14px;
    }
  }
  ${({ theme }) => theme.mediaQueries.md} {
    & > p {
      font-size: 20px;
    }
  }
`

const TitleLeft = styled.div`
  display: flex;
  align-items: center;
  color: white;
  margin-bottom: 12px;
`

const LotteryMainWrapper = styled.div`
  width: 50%;
  ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 50%;
  }
`

const RoundInfo = styled.div`
  width: auto;
  display: flex;
  align-items: flex-end;
  color: white;
  justify-content: space-between;
  box-sizing: border-box;
  ${({ theme }) => theme.mediaQueries.xs} {
    margin: 12px 4px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin: 0 0 28px 0;
  }
`

const LotteryStatusTimeInfo = styled.div`
  display: flex;
  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 12px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`

const ActionWrapper = styled.div`
  width: 100%;
  position: relative;
  border-radius: 75px;
`

const NumbersWrapper = styled.div`
  width: 75%;
  background: #fafcfe;
  border-radius: 75px;
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
`

const ActionText = styled.div`
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  color: white;
  font-weight: 800;
  cursor: pointer;
  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 12px;
    transform: translate(30%, -50%);
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
    transform: translateY(-50%);
  }
`
const BadgeText = styled.div<{ type: number }>`
  color: ${({ type }) => (type === 0 ? 'rgba(0, 123, 228, 1)' : 'white')};
  font-size: 16px;
  font-weight: 800;
  position: absolute;
  top: 40%;
  right: 0;
  transform: translate(-20%, -50%);
`

function getDistanceTime(time: string | number) {
  const end = new Date(time)
  const now = new Date()
  const t = end.getTime() - now.getTime()
  // const d = Math.floor(t / 1000 / 60 / 60 / 24)
  const h = Math.floor((t / 1000 / 60 / 60) % 24)
  const m = Math.floor((t / 1000 / 60) % 60)
  const s = Math.floor((t / 1000) % 60)
  return `${h} : ${m} : ${s}`
}

export default function LotteryCard(props) {
  const { info, periodInfo } = props
  console.log(info, periodInfo, 'ggg')
  const contract = useFivePlusTwo()
  const router = useRouter()
  const [numbers, setNumbers] = useState([])
  const [multiple, setMultiple] = useState('')
  const { isMobile } = useMatchBreakpoints()
  const { fetchWithCatchTxError, loading: isApproving } = useCatchTxError()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()

  useEffect(() => {
    const res = []
    info.ticket.redNumbers.forEach((x) => {
      res.push({
        value: x.toString(),
        extra: false,
      })
    })
    info.ticket.blueNumbers.forEach((x) => {
      res.push({
        value: x.toString(),
        extra: true,
      })
    })
    setMultiple(info.ticket.multiple.toString())
    setNumbers(res)
  }, [info])

  const handleClaim = async () => {
    // console.log(info.periodId, info.ticketId, 'param')
    const receipt = await fetchWithCatchTxError(() =>
      callWithGasPrice(contract, 'claim', [info.ticket.periodId, info.ticket.ticketId]),
    )
    if (receipt?.status) {
      toastSuccess('Claim Success')
    }
  }

  if (!info || !periodInfo) return null

  const type = (() => {
    if (!periodInfo.isCaculated) return 0
    if (info.bonusLevel.toString() != 0) return 1
    return 2
  })()

  const action = (() => {
    if (!periodInfo.isCaculated) return t('Betting')
    if (info.bonusLevel.toString() != 0) {
      if (info.ticket.claimTime.toString() == 0) {
        return 'Claim'
      }
      return 'Claimed'
    }
    return 'Failed'
  })()

  const handleAction = async () => {
    if (type === 1 && info.ticket.claimTime.toString() == 0) {
      await handleClaim()
    }
    if (type === 0) {
      router.push('/fivePlusTwo')
    }
  }
  return (
    <LotteryCardWrapper type={type}>
      <LotteryInfoWrapper>
        <LotteryCardIcon width={isMobile ? 48 : 200} height={isMobile ? 48 : 200} style={{ marginRight: 32 }} />
        <LotteryInfo>
          <LotteryInfoRow>
            {type === 0 ? (
              <>
                <p>{t('Lottery Time Remain')}</p>
                <p>{getDistanceTime(periodInfo.saleCloseTime.toString() * 1000)}</p>
              </>
            ) : type === 1 ? (
              <>
                <p>{t('Lottery Win')}</p>
                <p>{formatUnits(info.bonus.toString(), 18)}</p>
              </>
            ) : (
              <p>{t('Lottery Failed')}</p>
            )}
          </LotteryInfoRow>

          <LotteryInfoRow>
            {type === 0 ? (
              <>
                <p>{t('Lottery Multiple')}</p>
                <p>{multiple}</p>
              </>
            ) : type === 1 ? (
              <>
                <p>{t('Lottery Win Level')}</p>
                <p>{info.bonusLevel.toString()}</p>
              </>
            ) : (
              <>
                <p>{t('Lottery Multiple')}</p>
                <p>{multiple}</p>
              </>
            )}
          </LotteryInfoRow>
        </LotteryInfo>
      </LotteryInfoWrapper>

      <LotteryMainWrapper>
        <RoundInfo>
          <div>
            <TitleLeft>
              <h2 style={{ fontSize: isMobile ? 14 : 18, marginRight: isMobile ? 8 : 24 }}>{t('Round')}</h2>
              <div
                style={{
                  padding: isMobile ? '2px 12px' : '4px 24px',
                  border: '1px solid #FFFFFF',
                  borderRadius: '30px',
                  fontSize: isMobile ? 14 : 16,
                }}
              >
                {1}
              </div>
            </TitleLeft>
            <div style={{ fontSize: isMobile ? 12 : 16 }}>{new Date().toDateString()}</div>
          </div>
          <LotteryStatusTimeInfo>
            <div style={{ marginRight: 8 }}>{t('Launch Ends At')}</div>
            <div>{new Date(parseInt(periodInfo.saleCloseTime, 10) * 1000).toISOString()}</div>
          </LotteryStatusTimeInfo>
        </RoundInfo>
        <ActionWrapper
          style={{
            background: type === 0 ? '#75b5eb' : type === 1 ? 'rgba(46, 242, 255, 1)' : 'rgba(205, 205, 205, 1)',
          }}
        >
          <NumbersWrapper>
            {numbers.map((x) => {
              return (
                <NumberCom
                  value={x.value}
                  width={isMobile ? 30 : 42}
                  height={isMobile ? 30 : 42}
                  fontSize={isMobile ? 14 : 20}
                  outline
                  extra={x.extra}
                />
              )
            })}
          </NumbersWrapper>
          <ActionText onClick={handleAction}>{action}</ActionText>
        </ActionWrapper>
      </LotteryMainWrapper>
      <BadgeIconWrapper>
        <BadgeIcon fill={type === 0 ? 'white' : 'rgba(10, 240, 255, 1)'} />
        <BadgeText type={type}>{type === 0 ? t('LotteryProcessing') : t('LotteryFinished')}</BadgeText>
      </BadgeIconWrapper>
    </LotteryCardWrapper>
  )
}
