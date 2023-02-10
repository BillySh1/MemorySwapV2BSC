import { BigNumber } from '@ethersproject/bignumber'
import Trans from 'components/Trans'
import { VaultKey } from 'state/types'
import { CHAIN_ID } from './networks'
import tokens, { serializeTokens } from './tokens'
import { SerializedPoolConfig, PoolCategory } from './types'

const serializedTokens = serializeTokens()

export const MAX_LOCK_DURATION = 31536000
export const UNLOCK_FREE_DURATION = 604800
export const BOOST_WEIGHT = BigNumber.from('20000000000000')
export const DURATION_FACTOR = BigNumber.from('31536000')

export const vaultPoolConfig = {
  // [VaultKey.CakeVaultV1]: {
  //   name: <Trans>Auto CAKE</Trans>,
  //   description: <Trans>Automatic restaking</Trans>,
  //   autoCompoundFrequency: 5000,
  //   gasLimit: 380000,
  //   tokenImage: {
  //     primarySrc: `/images/tokens/${tokens.cake.address}.svg`,
  //     secondarySrc: '/images/tokens/autorenew.svg',
  //   },
  // },
  // [VaultKey.CakeVault]: {
  //   name: <Trans>Stake CAKE</Trans>,
  //   description: <Trans>Stake, Earn – And more!</Trans>,
  //   autoCompoundFrequency: 5000,
  //   gasLimit: 500000,
  //   tokenImage: {
  //     primarySrc: `/images/tokens/${tokens.cake.address}.svg`,
  //     secondarySrc: '/images/tokens/autorenew.svg',
  //   },
  // },
  // [VaultKey.IfoPool]: {
  //   name: 'IFO CAKE',
  //   description: <Trans>Stake CAKE to participate in IFOs</Trans>,
  //   autoCompoundFrequency: 1,
  //   gasLimit: 500000,
  //   tokenImage: {
  //     primarySrc: `/images/tokens/${tokens.cake.address}.svg`,
  //     secondarySrc: `/images/tokens/ifo-pool-icon.svg`,
  //   },
  // },
} as const

const pools: SerializedPoolConfig[] = [
  // {
  //   sousId: 0,
  //   stakingToken: serializedTokens.cake,
  //   earningToken: serializedTokens.cake,
  //   contractAddress: {
  //     97: '',
  //     56: '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   tokenPerBlock: '10',
  //   sortOrder: 1,
  //   isFinished: false,
  // },
  // {
  //   sousId: 279,
  //   stakingToken: serializedTokens.cake,
  //   earningToken: serializedTokens.gal,
  //   contractAddress: {
  //     97: '',
  //     56: '0xa5D57C5dca083a7051797920c78fb2b19564176B',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   sortOrder: 999,
  //   tokenPerBlock: '0.09645',
  //   version: 3,
  // },
  
].filter((p) => !!p.contractAddress[CHAIN_ID])

export default pools
