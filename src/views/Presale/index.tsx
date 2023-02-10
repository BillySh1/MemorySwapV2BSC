import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Page from 'views/Page'
import CommonPresaleCard from './CommonPresaleCard'
import WLPresaleCard from './WLPresaleCard'
const PageWrapper = styled(Page)`
  justify-content: center;
`

const WrappedAppBody = styled.div`
  border-radius: 40px;
  background: rgba(0, 123, 228, 1);
  border: 17px solid rgba(255, 255, 255, 1);
  box-sizing: border-box;
  padding: 40px 45px;
  max-width: 530px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.xs} {
    max-width: 480px;
    width: 100%;
    border-width: 2px;
    padding: 10px 12px;
  }
`

const WrappedBtnGroup = styled.div`
  display: flex;
  margin-bottom: 16px;
`

const SwitchBtn = styled.div`
  border-radius: 99px;
  color: rgba(0, 123, 228, 1);
  font-size: 16px;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  margin: 0 16px;
  cursor: pointer;
  font-weight: 800;
  background: #fff;
`

export default function Presale() {
  const [type, setType] = useState(2)
  useEffect(() => {
    if (type > 2) {
      setType(0)
    } else {
      if (type < 0) {
        setType(2)
      }
    }
  },[type])
  return (
    <PageWrapper>
      <WrappedBtnGroup>
        <SwitchBtn onClick={() => setType(type - 1)}>{'<'}</SwitchBtn>
        <SwitchBtn onClick={() => setType(type + 1)}>{'>'}</SwitchBtn>
      </WrappedBtnGroup>
      <WrappedAppBody>{(type === 2 && <WLPresaleCard />) || <CommonPresaleCard type={type} />}</WrappedAppBody>
    </PageWrapper>
  )
}
