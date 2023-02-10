import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ButtonMenu, ButtonMenuItem } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

const StyledNav = styled.div`
  margin-bottom: 40px;
`

function Tab({ activeIndex = 0 }: { activeIndex?: number }) {
  const {t} = useTranslation()
  const [active,setActive] = useState(0)
  return (
    <StyledNav>
      <ButtonMenu activeIndex={active} scale="sm" variant="subtle">
        <ButtonMenuItem id="all">{t('ALL')}</ButtonMenuItem>
        <ButtonMenuItem id="new">{t('NEW')}</ButtonMenuItem>
      </ButtonMenu>
    </StyledNav>
  )
}

export { Tab }
