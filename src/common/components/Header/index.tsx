import React, {FC} from 'react'
import {headerConfigs} from './header.configs'
import HeaderWhite from './HeaderWhite'
import HeaderBackground from './HeaderBackground'

const GreenHeader: FC<TGreenHeader> = props => {
  if (headerConfigs.type == 'white') {
    return <HeaderWhite {...props} />
  }

  return <HeaderBackground {...props} />
}

export default GreenHeader
