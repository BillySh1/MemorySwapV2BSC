import styled from 'styled-components'
import { Flex } from '@pancakeswap/uikit'
import NumberCom from './NumberCom'
import { useTranslation } from 'contexts/Localization'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.125);
  padding: 16px 48px;
  box-sizing: border-box;
  width: 100%;
  color: black;
  ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 24px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px 48px;
  }
`

const LeftTitle = styled.div`
  font-weight: 800;
  font-size: 18px;
  ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
    text-align: center;
    font-size: 16px;
    margin-bottom: 1rem;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: auto;
    text-align: left;
    font-size: 18px;
    margin-bottom: 0;
  }
`

const NumbersContainer = styled(Flex)`
  flex-wrap: wrap;
  ${({ theme }) => theme.mediaQueries.xs} {
    justify-content: center;
    width: 100%;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: flex-start;
    width: auto;
  }
`

const StyledNumberCom = styled.div`
  margin-right: 4px;
`

export default function LastWinNumber(props) {
  const { t } = useTranslation()
  const { isMobile } = props
  const lastWinNumbers = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6, extra: true },
    { value: 7, extra: true },
  ]
  return (
    <Container>
      <LeftTitle>{t('Winning number')}</LeftTitle>
      <NumbersContainer>
        {lastWinNumbers.map((x) => {
          return (
            <StyledNumberCom>
              <NumberCom
                align={isMobile ? 'left' : undefined}
                extra={x.extra}
                value={x.value}
                width={isMobile ? 32 : 46}
                height={isMobile ? 32 : 46}
              />
            </StyledNumberCom>
          )
        })}
      </NumbersContainer>
    </Container>
  )
}
