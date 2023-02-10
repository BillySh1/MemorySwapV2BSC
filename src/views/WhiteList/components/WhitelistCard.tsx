import { CardBody, CardHeader, Card } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { WETH } from '@pancakeswap/sdk'
import { TokenImage } from 'components/TokenImage'
import styled from 'styled-components'
import TelegramOutlineIcon from '../Icons/telegram'
import TwitterOutline from '../Icons/twitter'
import TwinIcon from '../Icons/twin'
import CubeIcon from '../Icons/cube'

export const StyledCard = styled(Card)`
  min-width: 280px;
  margin: 0 0 24px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: baseline;
  position: relative;
  background: #fff;
  ${({ theme }) => theme.mediaQueries.xs} {
    max-width: 90%;
    margin: 0 12px 24px 12px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    zoom: 1;
    max-width: 327px;
  }
`

const HeadWrapper = styled(CardHeader)`
  background: #007be4;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 8px;
  border-radius: 0 0 0 20px;
`
const TitleText = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 500;
`

const StyledCardBody = styled(CardBody)`
  padding: 8px;
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
`

const IntroItem = styled.div`
  width: 100%;
  border-radius: 20px;
  background-color: rgba(245, 245, 245, 1);
  display: flex;
  flex-direction: column;
  padding: 12px 16px 0px 16px;
  font-size: 14px;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 12px;
`

const IntroRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CardFooter = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const TextUnderLine = styled.div`
  cursor: pointer;
  text-decoration: underline;
  color: #333333;
  font-size: 14px;
  font-weight: 500;
`

const WhitelistCard: React.FC<{ info: any }> = ({ info }) => {
  const { t } = useTranslation()

  return (
    <StyledCard>
      <HeadWrapper>
        <TokenImage token={WETH[321]} width={36} height={36} />
        <TitleText>BTC</TitleText>
        <TitleText>$ 41252.2</TitleText>
      </HeadWrapper>
      <StyledCardBody>
        <IntroItem>
          <IntroRow>
            <div>{t('TotalSupply')}</div>
            <div>＄12131</div>
          </IntroRow>
          <IntroRow>
            <div>{t('Liqudity')}</div>
            <div>＄1,123,111,222,131</div>
          </IntroRow>
          <IntroRow>
            <div>{t('TotalLiqudity')}</div>
            <div>123,156,461 BTC</div>
          </IntroRow>
        </IntroItem>
        <IntroItem>
          <IntroRow>
            <div>{t('ReleaseTime')}</div>
            <div>2008.02.02</div>
          </IntroRow>
        </IntroItem>
        <IntroItem>
          <IntroRow>
            <div>{t('AddressNum')}</div>
            <div>111,222,131</div>
          </IntroRow>
        </IntroItem>
        <IntroItem>
          <IntroRow>
            <div>{t('ReleasePrice')}</div>
            <div>＄0.001</div>
          </IntroRow>
        </IntroItem>
        <IntroItem>
          <IntroRow>
            <div>{t('BelongChain')}</div>
            <div>Bitchain</div>
          </IntroRow>
        </IntroItem>
        <IntroItem>
          <IntroRow>
            <div>{t('Scope')}</div>
            <div>Scope</div>
          </IntroRow>
        </IntroItem>
        <CardFooter>
          <TelegramOutlineIcon width={36} height={36} />
          <TwitterOutline width={36} height={36} />
          <TwinIcon width={24} height={24} />
          <TextUnderLine>{t('ViewOfficialSite')}</TextUnderLine>
          <CubeIcon width={24} height={24} />
          <TextUnderLine>{t('ViewOnChain')}</TextUnderLine>
        </CardFooter>
      </StyledCardBody>
    </StyledCard>
  )
}

export default WhitelistCard
