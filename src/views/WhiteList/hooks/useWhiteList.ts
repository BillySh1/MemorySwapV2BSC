import { useFactory } from 'hooks/useContract'
import { useSWRContract } from 'hooks/useSWRContract'

const useWhiteList = () => {
  const factory = useFactory()
  const { data } = useSWRContract([factory, 'getAllMarket'])
  return data ?? []
}

export default useWhiteList
