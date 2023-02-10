import { isAddress } from '@ethersproject/address'
import { formatEther, parseEther } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'
import { NOT_ON_SALE_SELLER } from 'config/constants'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxError from 'hooks/useCatchTxError'
import { useSWRContract } from 'hooks/useSWRContract'
import { useState } from 'react'
import addresses from 'config/constants/contracts'
import bep20Abi from '../../config/abi/erc20.json'
import styled from 'styled-components'
import { FDAOIcon, MDAOIcon, PresaleLink } from '../../../packages/uikit/src/components/Svg'
import useToast from 'hooks/useToast'
import { getContract } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getDonateAddress, getDonateRMAddress } from 'utils/addressHelpers'
import { MaxUint256 } from '@ethersproject/constants'
import { isNumber } from 'lodash'
import { Button, Input, Flex } from '@pancakeswap/uikit'
import { BigNumber } from '@ethersproject/bignumber'
import { useDonateETHF, useDonateRM, useWLDonate } from 'hooks/useContract'

const Content = styled.div`
  background: #ffffff;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  color: #007be4;
`

const TokenName = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
`

const PresaleTitle = styled.div`
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;
  margin: 20px 0;
`

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 260px;
  margin: 10px 0;
`

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #2e2b54;
`
const InfoLeft = styled.div`
  text-align: right;
`

const DonateButton = styled(Button)`
  margin: 20px 8px;
`

export default function WLPresaleCard(props) {
  const { type = 0 } = props
  const tokenName = type == 0 ? 'RM' : 'ETHF'

  const donateContract = useWLDonate()
  const { account } = useWeb3React()
  const { library } = useActiveWeb3React()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError, loading: isLoading } = useCatchTxError()
  const [buyAmount, setBuyAmount] = useState(null)
  const [isApproved, setIsApproved] = useState(false)
  const { toastSuccess, toastError } = useToast()

  const { data: price } = useSWRContract([donateContract, 'priceETHF'])
  const { data: raised } = useSWRContract([donateContract, 'poolInfos', [3]])
  const { data: user } = useSWRContract([donateContract, 'getInfo', [account || NOT_ON_SALE_SELLER]])
  const { data: nowPhase } = useSWRContract([donateContract, 'nowPhase'])
  const { data: WL1Qulaity } = useSWRContract([donateContract, 'isInWhiteList', [account || NOT_ON_SALE_SELLER]])
  const { data: WL2Qulaity } = useSWRContract([donateContract, 'isInWhiteList2', [account || NOT_ON_SALE_SELLER]])
  const { data: total1 } = useSWRContract([donateContract, 'totalWL1Claimed'])
  const { data: total2 } = useSWRContract([donateContract, 'totalWL2Claimed'])

  const handleDonate1 = async () => {
    console.log(BigNumber.from(price).mul(80000).toString())
    const receipt = await fetchWithCatchTxError(() =>
      callWithGasPrice(donateContract, 'WLDonate', [1], {
        value: BigNumber.from(price).mul(80000),
      }),
    )
    if (receipt?.status) {
      alert(`success:${receipt.transactionHash}`)
    }
    setBuyAmount(0)
  }
  const handleDonate2 = async () => {
    const receipt = await fetchWithCatchTxError(() =>
      callWithGasPrice(donateContract, 'WLDonate', [2], {
        value: BigNumber.from(price).mul(30000),
      }),
    )
    if (receipt?.status) {
      alert(`success:${receipt.transactionHash}`)
    }
    setBuyAmount(0)
  }

  const refund = async () => {
    const receipt = await fetchWithCatchTxError(() => callWithGasPrice(donateContract, 'claimRefund'))
    if (receipt?.status) {
      alert(`refund success:${receipt.transactionHash}`)
    }
    setBuyAmount(0)
  }

  const claimFDAO = async () => {
    const receipt = await fetchWithCatchTxError(() => callWithGasPrice(donateContract, 'claimFdao'))
    if (receipt?.status) {
      alert(`claim success:${receipt.transactionHash}`)
    }
  }
  const percentage = () => {
    if (raised && price) {
      const m1 = Number(formatEther(raised.raisedETHF))
      const m2 = Number(formatEther(price))
      const m3 = Number(formatEther(raised.totalFdao))

      return Number(Number(m1 / (m2 * m3)).toFixed(1)) * 100
    }
    return '?'
  }
  return (
    <Content>
      {/* <MDAOIcon style={{ margin: '20px 0' }} width={80} height={80} /> */}
      <FDAOIcon style={{ margin: '20px 0' }} width={80} height={80} />
      <TokenName>FDAO</TokenName>
      <PresaleTitle>WhiteList Super Raising</PresaleTitle>
      <PresaleLink width={280} style={{ margin: '20px 0' }} />
      <InfoBox>
        <InfoItem>
          <div>Price(W1)</div>
          <InfoLeft>{price ? (80000 * Number(formatEther(price))).toFixed(6) : 0} ETHF</InfoLeft>
        </InfoItem>
        <InfoItem>
          <div>Price(W2)</div>
          <InfoLeft>{price ? (30000 * Number(formatEther(price))).toFixed(6) : 0} ETHF</InfoLeft>
        </InfoItem>
        <InfoItem>
          <div>Total</div>
          <InfoLeft>{7500000} FDAO</InfoLeft>
        </InfoItem>
        <InfoItem>
          <div>Rasied</div>
          <InfoLeft style={{ textAlign: 'right' }}>
            {raised ? Number(formatEther(raised.raisedETHF)).toFixed(2) : 0} ETHF
            <br />({100}%)
          </InfoLeft>
        </InfoItem>
        <InfoItem>
          <div>Donated</div>
          <InfoLeft>{user ? Number(formatEther(user.totalPayAmount)).toFixed(6) : 0} ETHF</InfoLeft>
        </InfoItem>
        <InfoItem>
          <div>Claimed(WL1)</div>
          <InfoLeft>{Number(total1)}/21 </InfoLeft>
        </InfoItem>
        <InfoItem>
          <div>Claimed(WL2)</div>
          <InfoLeft>{Number(total2)}/194 </InfoLeft>
        </InfoItem>

        {/* <Input
          style={{ margin: '10px 0' }}
          placeholder={'Paste buy WL number'}
          scale="md"
          autoComplete="off"
          value={buyAmount}
          onChange={(e) => setBuyAmount(e.target.value as any)}
        /> */}
      </InfoBox>

      <Flex>
        <DonateButton
          disabled={Number(buyAmount) < 0 || !WL1Qulaity}
          onClick={handleDonate1}
          isLoading={isLoading}
          scale="md"
        >
          WL1 Donate
        </DonateButton>
        <DonateButton
          disabled={Number(buyAmount) < 0 || !WL2Qulaity}
          onClick={handleDonate2}
          isLoading={isLoading}
          scale="md"
        >
          WL2 Donate
        </DonateButton>
        {nowPhase == 4 && user && !user.refunded && (
          <DonateButton onClick={refund} isLoading={isLoading} scale="md">
            {'Refund'}
          </DonateButton>
        )}

        {user && Number(formatEther(user.canClaimAmount)) > 0 && (
          <DonateButton onClick={claimFDAO} isLoading={isLoading} scale="md">
            {'Claim'}
          </DonateButton>
        )}
      </Flex>
    </Content>
  )
}
