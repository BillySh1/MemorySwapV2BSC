import { Currency, BNB, Token } from '@pancakeswap/sdk'
import { BinanceIcon, KuCoinIcon } from '@pancakeswap/uikit'
import { useMemo } from 'react'
import styled from 'styled-components'
import { WrappedTokenInfo } from 'state/types'
import useHttpLocations from '../../hooks/useHttpLocations'
import getTokenLogoURL from '../../utils/getTokenLogoURL'
import Logo from './Logo'

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === BNB) return []
    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }
      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency === BNB) {
    return (
      <img
        style={{ ...style, borderRadius: 99 }}
        width={size}
        src={'https://www.gate.io/images/coin_icon/64/ethf.png'}
      ></img>
    ) ////9ZnZ3Q4+Pn8fG41dWJubmgx8dOlpZxq6vz+PiVwMCszs5lpKTc6up9srLy+PhDj4/E3NwCGnUnAAAAFnRSTlMAX++/MCDe38+Pf28QXq/fQN1QT69uAwHoFgAAA2xJREFUWMOtmOe6mzAMhllJyGh62tPKA2xDyLr/Kyw4dsSwGaHvv/ghH59kSRiCMZJwf97toGaXxvswCT7idIwj6BGdw81Snd8xeIjDJXYOEYywna11RJ1VWl8pzGA7na89zOQwrrNBQ+tsJREsYOuvrxAW8mO1EEqNCa2XSuAjkuGu7eAjosEO7uBD0p7QAT5m340NVvC1MjYkdRfAk2gyKgEoJwZcq8wPKuHN0WUptxdmF4CMIHpNwMOIC8pRKTo5LJkLL5SQquoKCUru0tyJU0ZKx1xAS8Je+CRcqyJcXklm481zUsuiqYGl9oWVsBq4Ri9GVQd5QVPfgcYOf5sYbSejRdfSo1lD1QYFlrhfS/SFbG4vaQdZttbkyzuDN6devjOmEbWfkrIOZe3npswP+jKf9QrhjL8VadA5KiQjLXSOuF17ykIvQTe8CBBzJavtC0UQvSZEVYma2pAS2hISdecSVvDtpk204ZA3lII+mL7VnUKLpD8qX//WcdAmBIQKYpKT125LRQS0CfsPOPtvQTOqRKfp3or32u1dZrI/W2LoULIXABmHDKGZ7aOiTjhjN+jyJwhSGKDLpg6BVkopk42bCVsrKhiwdY4m3g7o2lnL9RpzKsGAHG/fUOqgbc9cX4IwwKGEXUM0RWvm3cxd7vOUyqtJ+pVocOZlDxv4HCWshPLdPFgBNnAYMMg4JgVbjxntC7X3mLt3Jiz8p8pxC2o4DEnbo8A1E7B5TAV4dg5iz3HQhoXNUzfv44rpHrD3HHbeYZXGhRJC2LRRcHD0nXZsWC93V+CYNuE9/USADGeC0i5yzgtTBNxpKcJHi6dlCvmsE2O0meSOdOP0PYIT9q6EZvcLSnNdDXzklHgCxFEJSpRUnwMka6qBgpNN4A1P91rBOc8kcP0sFYrzUoInOM1vGCc35wA6cQTG3XP7wirIwMd28pBZdWeAmjyVn3ymcqGxDcfGLY0UAqhcczPNw72WkHSqErDhhvzqvGiCm6edCWMZ38x51aQFPgk4HXn5nI6vNerEaGzIxr1/ktuZwGe/wyYwOhOoJ7bkf70phoGLcLUQSq0VQpKfsIAoCfxsFkilm2CUw8JXzdW20q9gBuGkVoTvhqu0osMpmE/o/7r2HSxkE56jgZv475id8a+QcbrTjbo9T32F/AfW5WlzDKnnCgAAAABJRU5ErkJggg=='} alt="" />
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
