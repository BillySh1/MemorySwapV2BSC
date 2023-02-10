import { useRef, useState, useEffect, RefObject } from 'react'
import { Button, CardBody, CardFooter, Flex, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { TimeLockIcon, Input } from '@pancakeswap/uikit'
import { AppHeader, AppBody } from '../../components/App'
import { DatePicker } from 'views/Voting/components/DatePicker'
import TimeCards from './components/TImeCards'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import bep20Abi from '../../config/abi/erc20.json'
import { getContract, isAddress } from 'utils'
import useToast from 'hooks/useToast'
import { parseUnits } from '@ethersproject/units'
import { getTimeLockerAddress } from 'utils/addressHelpers'
import useCatchTxError from 'hooks/useCatchTxError'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTimeLocker } from 'hooks/useContract'
import { useTranslation } from 'contexts/Localization'

const Body = styled(CardBody)`
  background-color: ${({ theme }) => theme.colors.backgroundAlt2};
`

const Intro = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 12px 0;
`

const StyledDatePicker = styled(DatePicker)`
  margin-bottom: 1rem;
`

export default function NewLock() {
  const [contractAddress, setContractAddress] = useState<string>('')
  const [remainTime, setRemainTime] = useState(['00', '00', '00'])
  const [lockNum, setLockNum] = useState<string>('0')
  const { t } = useTranslation()
  const [lockTime, setLockTime] = useState<Date>(new Date())
  const [isApproved, setIsApproved] = useState(false)
  const { account } = useActiveWeb3React()
  const lockerContract = useTimeLocker()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError, loading: isApproving } = useCatchTxError()
  const { toastSuccess, toastError } = useToast()
  const { library } = useActiveWeb3React()
  const handleSelectDate = (v) => {
    setLockTime(v)
    const diff = (new Date(v).getTime() - new Date().getTime()) / 1000
    const days = Math.floor(diff / 3600 / 24)
    const hours = Math.floor((diff - days * 24 * 3600) / 3600)
    const mins = Math.floor((diff - days * 24 * 3600 - hours * 3600) / 60)
    setRemainTime([
      days.toString().padStart(2, '0'),
      hours.toString().padStart(2, '0'),
      mins.toString().padStart(2, '0'),
    ])
  }

  const approve = async () => {
    const isValidAddress = isAddress(contractAddress) !== false
    if (!isValidAddress) {
      toastError('not valid address')
      return
    }
    const contract = getContract(contractAddress, bep20Abi, library.getSigner())
    const receipt = await fetchWithCatchTxError(() => {
      return callWithGasPrice(contract, 'approve', [getTimeLockerAddress(), parseUnits(lockNum, 18)])
    })
    if (receipt?.status) {
      toastSuccess('Approved')
      setIsApproved(true)
    }
  }
  const handleLock = async () => {
    const time = Math.ceil(new Date(lockTime).getTime() / 1000)
    console.log(parseUnits(lockNum, 18).toString(), time, 'param')
    const receipt = await fetchWithCatchTxError(() =>
      callWithGasPrice(lockerContract, 'lock', [contractAddress, parseUnits(lockNum, 18).toString(), time]),
    )
    if (receipt?.status) {
      toastSuccess('Success')
      setIsApproved(false)
    }
  }
  return (
    <AppBody>
      <AppHeader noConfig title={t('TimeLock')} subtitle={t('LockYourToken')}>
        <TimeLockIcon width={48} height={48} />
      </AppHeader>
      <Body>
        <Flex width="100%" alignItems="center" flexDirection="column">
          <Intro>{t('please_enter_contract')}</Intro>
          <Input
            placeholder={'Please paste address'}
            scale="md"
            autoComplete="off"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            // onKeyDown={handleEnter}
          />
          {account && contractAddress && (
            <Text
              color="textSubtle"
              fontSize="14px"
              style={{ display: 'inline', cursor: 'pointer', width: '100%', textAlign: 'right' }}
            >
              {t('Balance: %balance%', { balance: '6.3827' })}
            </Text>
          )}
          <Intro>{t('please_enter_number')}</Intro>
          <Input
            placeholder={t('Search')}
            scale="md"
            autoComplete="off"
            value={lockNum}
            onChange={(e) => setLockNum(e.target.value)}
            // onKeyDown={handleEnter}
          />
          <Intro>{t('please_enter_date')}</Intro>
          <StyledDatePicker
            onChange={handleSelectDate}
            name="lockTime"
            selected={lockTime}
            placeholderText="YYYY/MM/DD"
          />
          <TimeCards remainTime={remainTime} />
        </Flex>
      </Body>
      <CardFooter style={{ textAlign: 'center' }}>
        <Button
          isLoading={isApproving}
          width="100%"
          onClick={async () => {
            if (isApproved) {
              await handleLock()
            } else {
              await approve()
            }
          }}
        >
          {isApproved ? t('Confirm') : t('Approve')}
        </Button>
      </CardFooter>
    </AppBody>
  )
}
