import { Button, ButtonMenu, ButtonMenuItem, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { LockItem } from './components/LockItem'
import { Input } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useTimeLocker } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { useAsync } from 'react-use'

const ListWrapper = styled.div`
  position: relative;
  width: 100%;
`

const ListContainer = styled.div`
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  ${({ theme }) => theme.mediaQueries.xs} {
    justify-content: center;
    gap: 8px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: flex-start;
    gap: 24px;
  }
`

const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
`

const StyledInput = styled(Input)`
  width: 100%;
`
const FlexContainer = styled.div`
  display: flex;
  gap: 1rem;
`

const OwnButton = styled(Button)`
  width: 40%;
`

export default function AllLock() {
  const [search, setSearch] = useState('')
  const locker = useTimeLocker()
  const { account } = useWeb3React()
  const [activeIndex, setActiveIndex] = useState(0)
  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()

  const { value: list } = useAsync(async () => {
    if (!search) return []
    return await locker.allLockInfo(search, account)
  }, [search])
  return (
    <ListWrapper>
      {(isMobile && (
        <>
          <StyledInput
            placeholder="enter address"
            scale="sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FilterWrapper>
            <ButtonMenu activeIndex={activeIndex} onItemClick={setActiveIndex} scale="sm" variant="primary">
              <ButtonMenuItem>{t('lock progress')}</ButtonMenuItem>
              <ButtonMenuItem>{t('lock received')}</ButtonMenuItem>
            </ButtonMenu>
            <OwnButton scale="sm" variant="primary">
              {t('Own')}
            </OwnButton>
          </FilterWrapper>
        </>
      )) || (
        <>
          <FilterWrapper>
            <FlexContainer>
              <ButtonMenu activeIndex={activeIndex} onItemClick={setActiveIndex} scale="sm" variant="primary">
                <ButtonMenuItem>{t('lock progress')}</ButtonMenuItem>
                <ButtonMenuItem>{t('lock received')}</ButtonMenuItem>
              </ButtonMenu>
              <OwnButton scale="sm" variant="primary">
                {t('Own')}
              </OwnButton>
            </FlexContainer>
            <StyledInput
              style={{ width: 'auto' }}
              placeholder="enter address"
              scale="sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </FilterWrapper>
        </>
      )}

      {list && list.length > 0 && (
        <ListContainer>
          {list.map((x) => {
            return <LockItem info={x} />
          })}
        </ListContainer>
      )}
    </ListWrapper>
  )
}
