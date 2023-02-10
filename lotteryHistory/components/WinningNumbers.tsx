import { Flex, FlexProps, useMatchBreakpoints } from '@pancakeswap/uikit'
import NumberCom from 'views/FivePlusTwo/components/NumberCom'
import styled from 'styled-components'

interface WinningNumbersProps extends FlexProps {
  numbers: number[]
  size?: string
  fontSize?: string
  rotateText?: boolean
}

const StyledFlex = styled(Flex)`
  justify-content: space-between;
`

const StyledNumberCom = styled.div`
  margin-right: 4px;
`

const WinningNumbers: React.FC<WinningNumbersProps> = ({
  numbers,
  size = '32px',
  fontSize = '16px',
  rotateText,
  ...containerProps
}) => {
  const { isMobile } = useMatchBreakpoints()
  return (
    <StyledFlex {...containerProps}>
      {numbers.map((num) => {
        return (
          <StyledNumberCom>
            <NumberCom outline extra={num > 5} value={num} width={isMobile ? 40 : 42} height={isMobile ? 40 : 42} />
          </StyledNumberCom>
        )
      })}
    </StyledFlex>
  )
}

export default WinningNumbers
