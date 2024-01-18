import React from 'react'
import Tab from './tab'
import {useGlobalContext} from '~/provider/AppProvider'

const Tabs = ({route, focused}: {route: any; focused: boolean}) => {
  let iconName

  const {published} = useGlobalContext()

  if (route.name == 'Home') {
    return (iconName = focused ? (
      <Tab actived={true} title="Trang chủ" icon={require('~/assets/icons/acivated/home.png')} />
    ) : (
      <Tab actived={false} title="Trang chủ" icon={require('~/assets/icons/primary/home.png')} />
    ))
  }

  if (route.name == 'ScheduleTab') {
    return (iconName = focused ? (
      <Tab
        actived={true}
        title={published ? 'Lịch học' : 'Lịch'}
        icon={require('~/assets/icons/acivated/search.png')}
      />
    ) : (
      <Tab
        actived={false}
        title={published ? 'Lịch học' : 'Lịch'}
        icon={require('~/assets/icons/primary/search.png')}
      />
    ))
  }

  if (route.name == 'ClassTab') {
    return (iconName = focused ? (
      <Tab actived={true} title="DS Lớp" icon={require('~/assets/icons/acivated/cart.png')} />
    ) : (
      <Tab actived={false} title="DS Lớp" icon={require('~/assets/icons/primary/cart.png')} />
    ))
  }

  if (route.name == 'User') {
    return (iconName = focused ? (
      <Tab actived={true} title="Tài khoản" icon={require('~/assets/icons/acivated/user.png')} />
    ) : (
      <Tab actived={false} title="Tài khoản" icon={require('~/assets/icons/primary/user.png')} />
    ))
  }

  return <></>
}

export default Tabs
