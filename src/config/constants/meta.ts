import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'MemorySwap',
  description:
    'MemorySwap---DEX 2.0',
  image: '/hero.jpg',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | MemorySwap`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | MemorySwap`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | MemorySwap`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | MemorySwap`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | MemorySwap`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | MemorySwap`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | MemorySwap`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | MemorySwap`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | MemorySwap`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | MemorySwap`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | MemorySwap`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | MemorySwap`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | MemorySwap`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | MemorySwap`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | MemorySwap`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | MemorySwap`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | MemorySwap`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | MemorySwap`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | MemorySwap Info & Analytics`,
        description: 'View statistics for MemorySwap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | MemorySwap Info & Analytics`,
        description: 'View statistics for MemorySwap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | MemorySwap Info & Analytics`,
        description: 'View statistics for MemorySwap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | MemorySwap`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | MemorySwap`,
      }
    case '/nfts/activity':
      return {
        title: `${t('Activity')} | MemorySwap`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Profile')} | MemorySwap`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | MemorySwap`,
      }
    default:
      return null
  }
}
