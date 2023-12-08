import React from 'react'
import {ClassProvider} from '~/provider'
import ClassDetailScreen from './ClassDetail.Screen'

const ClassDetail = () => {
  return (
    <ClassProvider>
      <ClassDetailScreen />
    </ClassProvider>
  )
}

export default ClassDetail
