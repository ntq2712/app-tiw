import React, {FC, useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Signin from '~/views/auth/signin'
import {useGlobalContext} from '~/provider/AppProvider'
import SplashScreen from 'react-native-splash-screen'
import TabNavigator from './tab-nagivator'
import WebScreen from '~/views/WebScreen'
import {wait} from '~/common'
import Signup from '~/views/auth/signup'
import ReviewOrderScreen from '~/views/class/ClassDetail'
import UserInformation from '~/views/user-tab/information'
import UserPassword from '~/views/user-tab/password'
import Orders from '~/views/order'
import DetailOrder from '~/views/order/DetailOrder'
import CreateOtherOrder from '~/views/other-order/create'
import OtherOrders from '~/views/order/Other'
import TransportationOrders from '~/views/transportation'
import DetailTrans from '~/views/transportation/DetailTrans'
import CreateTrans from '~/views/transportation/create'
import NotiScreen from '~/views/notificaions'
import RechargeScreen from '~/views/money/recharge'
import {View} from 'react-native'
import WelcomeScreen from '~/welcome'
import ClassDetail from '~/views/class/ClassDetail'
import Transcript from '~/views/class/ClassDetail/Transcript'
import LearningHistory from '~/views/LearningHistory'
import Feedback from '~/views/Feedback'
import CreateFeedback from '~/views/Feedback/CreateFeedback'
import FeedbackDetail from '~/views/Feedback/Feedback.Detail'
import PaymentHistories from '~/views/payments'
import PayDetail from '~/views/payments/PayDetail'

const Stack = createNativeStackNavigator<TRootNavigator>()

const RootNavigator = () => {
  const {mainLoading, user, isWelcome, remoteConfigs} = useGlobalContext()

  if (mainLoading) {
    return <View></View>
  }

  if (isWelcome) {
    return <WelcomeScreen />
  }

  if (!user?.token) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="RootTabs" component={TabNavigator} />
        <Stack.Screen name="Transcript" component={Transcript} />
        <Stack.Screen name="LearningHistory" component={LearningHistory} />
        <Stack.Screen name="Feedback" component={Feedback} />
        <Stack.Screen name="CreateFeedback" options={{animation: 'slide_from_right'}} component={CreateFeedback} />
        <Stack.Screen name="FeedbackDetail" component={FeedbackDetail} />

        <Stack.Screen name="PaymentHistories" component={PaymentHistories} />
        <Stack.Screen name="PayDetail" component={PayDetail} />

        <Stack.Screen name="Webview" component={WebScreen} />
        <Stack.Screen
          options={{animation: 'slide_from_right'}}
          name="ReviewOrderScreen"
          component={ReviewOrderScreen}
        />
        <Stack.Screen options={{animation: 'slide_from_right'}} name="NotiScreen" component={NotiScreen} />

        <Stack.Screen options={{animation: 'slide_from_right'}} name="ClassDetail" component={ClassDetail} />
        <Stack.Screen options={{animation: 'fade_from_bottom'}} name="UserPassword" component={UserPassword} />
        <Stack.Screen options={{animation: 'fade_from_bottom'}} name="UserInformation" component={UserInformation} />
        <Stack.Screen options={{animation: 'simple_push'}} name="Orders" component={Orders} />
        <Stack.Screen options={{animation: 'simple_push'}} name="OtherOrders" component={OtherOrders} />
        <Stack.Screen
          options={{animation: 'simple_push'}}
          name="TransportationOrders"
          component={TransportationOrders}
        />
        <Stack.Screen options={{animation: 'simple_push'}} name="CreateTrans" component={CreateTrans} />
        <Stack.Screen options={{animation: 'simple_push'}} name="DetailTrans" component={DetailTrans} />
        <Stack.Screen options={{animation: 'simple_push'}} name="DetailOrder" component={DetailOrder} />
        <Stack.Screen options={{animation: 'simple_push'}} name="CreateOtherOrder" component={CreateOtherOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
