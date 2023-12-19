import React from 'react'
import {theme} from '~/configs'
import Attackdance1 from './AttackdanceStyle1'
import Attackdance2 from './AttackdanceStyle2'

// DUMA cấm sửa, muốn gì kiếm Châu
const Attackdance = props => {
  if (theme.attackDance == 1) {
    return <Attackdance1 {...props} />
  }

  return <Attackdance2 {...props} />
}

export default Attackdance
