import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay'

const SuperLoading = ({loading}) => {
  return (
    <Spinner
      visible={loading}
      textContent="Đang tải.."
      textStyle={{
        fontSize: 16,
        color: '#fff',
      }}
    />
  )
}

export default SuperLoading
