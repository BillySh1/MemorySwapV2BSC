import { Input, useMatchBreakpoints } from '@pancakeswap/uikit'
import styled from 'styled-components'
import Page from 'views/Page'
import useWhiteList from './hooks/useWhiteList'
import WhitelistCard from './components/WhitelistCard'
import { useState } from 'react'
import VerifyIcon from './Icons/verify'
import { useTranslation } from 'contexts/Localization'

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const StyledInput = styled(Input)`
  width: auto;
  border-radius: 99px;
  background: #1f8eec;
  color: #fff;
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`

const CardLayout = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.xs} {
    justify-content: center;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: flex-start;
  }
`

const HeaderFlex = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  ${({ theme }) => theme.mediaQueries.xs} {
    justify-content: space-around;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: flex-end;
  }
`

export default function WhiteList() {
  const [value, setValue] = useState('')
  const { isMobile } = useMatchBreakpoints()
  const list = useWhiteList()
  const {t} = useTranslation()
  return (
    <Container>
      <Page style={{ justifyContent: 'flex-start' }}>
        <HeaderFlex>
          {isMobile && <VerifyIcon style={{ width: '60px', height: '60px' }} />}
          <StyledInput
            scale="sm"
            placeholder={t('Search')}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </HeaderFlex>
        <CardLayout>
          {list.map((item) => (
            <WhitelistCard key={item} info={item} />
          ))}
        </CardLayout>
      </Page>
    </Container>
  )
}
