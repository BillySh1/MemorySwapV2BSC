import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 48px;
  width: 100%;
  background: rgba(0, 123, 228, 1);
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  color: #fff;
  ${({ theme }) => theme.mediaQueries.xs} {
    padding: 12px 24px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 24px 48px;
  }
`
const TitleLeft = styled.div`
  display: flex;
  align-items: center;
`

const TitleRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  text-align: right;
  line-height: 1.2;
`

const RoundLogo = styled.div`
  height: 48px;
  width: 48px;
  background: #fff;
  color: rgba(0, 123, 228, 1);
  line-height: 48px;
  text-align: center;
  border-radius: 99px;
  ${({ theme }) => theme.mediaQueries.xs} {
    height: 36px;
    width: 36px;
    line-height: 36px;
    font-size: 14px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    height: 48px;
    width: 48px;
    line-height: 48px;
    font-size: 16px;
  }
`

export default function HeaderCom(props) {
  const { round, isMobile, six } = props
  const { t } = useTranslation()
  return (
    <HeaderContainer>
      <div>
        <TitleLeft>
          <h2 style={{ fontSize: isMobile ? 14 : 16, marginRight: isMobile ? 8 : 24 }}>{t('Round')}</h2>
          <div
            style={{
              padding: isMobile ? '4px 24px' : '4px 12px',
              border: '1px solid #FFFFFF',
              borderRadius: '30px',
              fontSize: isMobile ? 14 : 16,
            }}
          >
            {round}
          </div>
        </TitleLeft>
        {isMobile && (
          <div style={{ fontSize: 12, lineHeight: 1.5, marginTop: 6 }}>
            <div>{t('LotteryTips')}</div>
            <div> July 5, 2022, 8:00 PM</div>
          </div>
        )}
      </div>

      <TitleRight>
        {!isMobile && (
          <div>
            <div>{t('LotteryTips')}</div>
            <div> July 5, 2022, 8:00 PM</div>
          </div>
        )}

        <RoundLogo>{six ? '6+1' : '5+2'}</RoundLogo>
      </TitleRight>
    </HeaderContainer>
  )
}
