import { Flex } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
const Row = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TimeItem = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.125);
  border-radius: 8px;
  padding: 16px 12px;
  box-sizing: border-box;
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.textSubtle};
  margin: '12px 1rem';
`
const TimeText = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-weight: 400;
  margin-top: 12px;
  font-size: 16;
`

const StyledFlex = styled(Flex)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 1rem;
`
export default function TimeCards(props: any) {
  const { remainTime } = props
  const {t} = useTranslation()
  return (
    <Row>
      {remainTime.map((x, idx) => (
        <StyledFlex>
          <TimeItem>{x}</TimeItem>
          <TimeText>{[t('DAYS'), t('HOURS'), t('MINS')][idx]}</TimeText>
        </StyledFlex>
      ))}
    </Row>
  )
}
