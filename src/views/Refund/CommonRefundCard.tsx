import { isAddress } from '@ethersproject/address'
import { formatEther } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'
import { NOT_ON_SALE_SELLER } from 'config/constants'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxError from 'hooks/useCatchTxError'
import { useDonate, useDonate2 } from 'hooks/useContract'
import { useSWRContract } from 'hooks/useSWRContract'
import { useState } from 'react'
import addresses from 'config/constants/contracts'
import bep20Abi from '../../config/abi/erc20.json'
import styled from 'styled-components'
import { FDAOIcon, PresaleLink } from '../../../packages/uikit/src/components/Svg'
import useToast from 'hooks/useToast'
import { getContract } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getDonateAddress } from 'utils/addressHelpers'
import { MaxUint256 } from '@ethersproject/constants'
import { Button, Input, Flex } from '@pancakeswap/uikit'
import { BigNumber } from '@ethersproject/bignumber'

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

const DonateButton = styled(Button)`
  margin: 20px 8px;
`

export default function CommonPresaleCard(props) {
  const { type = 0 } = props
  const tokenName = type == 0 ? 'RM' : 'ETHF'

  const donateContract = type == 0 ? useDonate(type) : useDonate2(type)
  const { account } = useWeb3React()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError, loading: isLoading } = useCatchTxError()
  const [buyAmount, setBuyAmount] = useState(null)
  const { data: price } = useSWRContract([donateContract, type == 0 ? 'priceRM' : 'priceETHF'])
  const { data: raised } = useSWRContract([donateContract, 'poolInfos', [type == 0 ? 1 : 2]])
  const { data: user } = useSWRContract([donateContract, 'getInfo', [account || NOT_ON_SALE_SELLER]])
  const { data: nowPhase } = useSWRContract([donateContract, 'nowPhase'])

  const refund = async () => {
    const receipt = await fetchWithCatchTxError(() => callWithGasPrice(donateContract, 'claimRefund'))
    if (receipt?.status) {
      alert(`refund success:${receipt.transactionHash}`)
    }
    setBuyAmount(0)
  }

  const percentage = () => {
    if (raised && price) {
      const m1 = Number(formatEther(type == 0 ? raised.raisedRM : raised.raisedETHF))
      const m2 = Number(formatEther(price))
      const m3 = Number(formatEther(raised.totalFdao))

      return Number(Number(m1 / (m2 * m3)).toFixed(1)) * 100
    }
    return '?'
  }

  const needPrice = Number(buyAmount) > 0 && price ? (Number(formatEther(price)) * Number(buyAmount)).toFixed(6) : '0'

  return (
    <Content>
      <FDAOIcon style={{ margin: '20px 0' }} width={80} height={80} />
      <TokenName>FDAO</TokenName>
      <PresaleTitle>{tokenName} Raising Refund</PresaleTitle>
      <PresaleLink width={280} style={{ margin: '20px 0' }} />
      <InfoBox>
        <InfoItem>
          <div>Price</div>
          <div>
            {price ? Number(formatEther(price)).toFixed(6) : 0} {tokenName}/FDAO
          </div>
        </InfoItem>
        <InfoItem>
          <div>Total</div>
          <div>{raised ? Number(formatEther(raised.totalFdao)).toFixed(1) : 0} FDAO</div>
        </InfoItem>
        <InfoItem>
          <div>Rasied</div>
          <div style={{ textAlign: 'right' }}>
            {raised ? Number(formatEther(type == 0 ? raised.raisedRM : raised.raisedETHF)).toFixed(2) : 0} {tokenName}{' '}
            <br />({percentage()}%)
          </div>
        </InfoItem>
        <InfoItem>
          <div>Donated</div>
          <div>
            {user ? Number(formatEther(user.totalPayAmount)).toFixed(6) : 0} {tokenName}
          </div>
        </InfoItem>

        <InfoItem>
          <div>Need {type == 0}</div>
          <div>
            {needPrice} {tokenName}
          </div>
        </InfoItem>
      </InfoBox>

      <Flex>
        <DonateButton
          disabled={!(nowPhase == 4 && user && !user.refunded)}
          onClick={refund}
          isLoading={isLoading}
          scale="md"
        >
          {'Refund'}
        </DonateButton>
        {/* {user && Number(formatEther(user.canClaimAmount)) > 0 && (
          <DonateButton onClick={claimFDAO} isLoading={isLoading} scale="md">
            {'Claim'}
          </DonateButton>
        )} */}
      </Flex>
    </Content>
  )
}
