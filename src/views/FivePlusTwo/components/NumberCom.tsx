import styled from 'styled-components'

const CustomRed = 'rgba(228, 80, 80, 1)'
const CustomBlue = 'rgba(0, 123, 228, 1)'

interface NumberComProps {
  outline?: boolean
  selected?: boolean
  extra?: boolean
  width?: number
  height?: number
  value: number
  align?: string
  fontSize?: number
}

const CommonText = styled.div`
  color: white;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
  border-radius: 99px;
  box-sizing: border-box;
`

export default function NumberCom(props: NumberComProps) {
  const { value, width, height, extra, outline, selected, align, fontSize } = props
  return (
    <CommonText
      style={{
        border: outline ? `2px solid ${extra ? CustomBlue : CustomRed}` : '',
        lineHeight: `${height - 4}px`,
        width: `${width}px`,
        height: `${height}px`,
        textShadow: extra
          ? `1px 1px ${CustomBlue}, -1px -1px ${CustomBlue}, 1px -1px ${CustomBlue}, -1px 1px ${CustomBlue}`
          : `1px 1px ${CustomRed}, -1px -1px ${CustomRed}, 1px -1px ${CustomRed}, -1px 1px ${CustomRed}`,
        background: selected ? (extra ? CustomBlue : CustomRed) : '',
        boxShadow: outline ? `0px 0px 4px 0px rgba(0, 0, 0, 0.25)` : '',
        textAlign: align ? (align as any) : 'center',
        fontSize: fontSize ? fontSize + 'px' : '20px',
      }}
    >
      {value.toString().padStart(2, '0')}
    </CommonText>
  )
}
