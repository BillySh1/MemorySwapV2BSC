import { Box, Flex, Heading } from '@pancakeswap/uikit'
import Page from 'views/Page'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { useEffect, useState } from 'react'
import YourHistoryCard from 'views/Lottery/components/YourHistoryCard'
import AllHistoryCard from './components/AllHistoryCard'
import HistoryTabMenu from 'views/Lottery/components/HistoryTabMenu'
import useShowMoreUserHistory from 'views/Lottery/hooks/useShowMoreUserRounds'
import styled from 'styled-components'
import LotteryCard from './components/lotteryCard'
import { useFivePlusTwo } from 'hooks/useContract'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useAsync } from 'react-use'
import { useSWRContract } from 'hooks/useSWRContract'

const Container = styled.div`
  width: 100%;
  height: calc(100% - 164px);
`

const StyledPage = styled(Page)`
  justify-content: flex-start;
`
function useNowRound() {
  const fivePlusTwoContract = useFivePlusTwo()
  const { t } = useTranslation()
  const { data } = useSWRContract({ contract: fivePlusTwoContract, methodName: 'nowPeriod' })
  return data ? data.toNumber() : undefined
}
export default function LotteryHistory() {
  const [historyTabMenuIndex, setHistoryTabMenuIndex] = useState(0)
  const contract = useFivePlusTwo()
  const { account } = useActiveWeb3React()
  const periodId = useNowRound()

  const { value: holdList } = useAsync(async () => {
    return await contract.getHoldTickets(periodId, account)
  }, [contract, account, periodId])
  const { value: periodInfo } = useAsync(async () => {
    return await contract.getPeriod(periodId)
  }, [contract, account, periodId])

  const { t } = useTranslation()
  const { numUserRoundsRequested, handleShowMoreUserRounds } = useShowMoreUserHistory()
  return (
    <Container>
      {holdList && periodInfo && holdList.map((x) => <LotteryCard info={x} periodInfo={periodInfo} type={0} />)}
      <StyledPage>
        <Flex width="100%" flexDirection="column" alignItems="center" justifyContent="center">
          <Heading style={{ color: 'rgba(0, 123, 228, 1)' }} mb="24px" scale="xl">
            {t('Finished Rounds')}
          </Heading>
          <Box mb="24px">
            <HistoryTabMenu
              activeIndex={historyTabMenuIndex}
              setActiveIndex={(index) => setHistoryTabMenuIndex(index)}
            />
          </Box>
          {historyTabMenuIndex === 0 ? (
            <AllHistoryCard />
          ) : (
            <YourHistoryCard
              handleShowMoreClick={handleShowMoreUserRounds}
              numUserRoundsRequested={numUserRoundsRequested}
            />
          )}
        </Flex>
      </StyledPage>
    </Container>
  )
}
