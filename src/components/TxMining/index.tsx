import { TxMiningIcon, IconButton } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RoundBox = styled.div<{ isMobile }>`
  font-size: 14px;
  width: fit-content;
  border-radius: 35px;
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
  border-radius: 35px;
  font-weight: 800;
  border: 2px solid transparent;
  background-image: ${({ theme }) =>
      theme.isDark ? 'linear-gradient(#3E3D5B,#3E3D5B)' : 'linear-gradient(#B3D2F5,#B3D2F5)'},
    linear-gradient(90deg, #ffffff 1.47%, #007be4 100%);
  background-origin: border-box;

  background-clip: padding-box, border-box;

  padding: 6px 16px;
  box-sizing: border-box;
  margin: 16px 0;
  width: ${({ isMobile }) => (isMobile ? '328px' : '400px')};
`

const Intro = styled.div`
  text-align: left;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.textSubtle};
  white-space: normal;
  max-width: 70%;
`

export const TxMining = ({ isMobile }: { isMobile?: boolean }) => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <RoundBox isMobile={isMobile} style={{ borderRadius: !isMobile ? '35px' : '15px' }}>
        <Intro>
          {t('Trade Mining Reward')} 0.0000 MDAO
        </Intro>
        <IconButton style={{ width: 'unset', borderRadius: 35, padding: '12px 16px', fontSize: 14, height: 'unset' }}>
          <span>{t('Claim')}</span>
          {/* <TxMiningIcon color="invertedContrast" /> */}
        </IconButton>
      </RoundBox>
      {/* {!isMobile && <Intro>{'Try Smart Router for a better Slippage ->'}</Intro>} */}
    </Wrapper>
  )
}
