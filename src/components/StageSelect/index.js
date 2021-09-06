import React from 'react'
import StageItem from '../StageItem'
import styled from 'styled-components'

import { main_5_10 } from '../../stages'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;

  & > div {
    margin: 2rem;
  }
`

const StageSelect = () => {
  return (
    <Wrapper>
      <StageItem stage={main_5_10} />
      <StageItem stage={main_5_10} />
      <StageItem stage={main_5_10} />
    </Wrapper>
  )
}

export default StageSelect
