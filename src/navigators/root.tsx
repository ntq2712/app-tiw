import {NavigationContainer, NavigationContainerRef} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React, {createRef} from 'react'
import {View} from 'react-native'
import ForgotPassword from '~/common/components/Auth/ForgotPassword'
import SelectStudent from '~/common/components/FilterStudent/SelectStudent'
import {useGlobalContext} from '~/provider/AppProvider'
import Feedback from '~/views/Feedback'
import CreateFeedback from '~/views/Feedback/CreateFeedback'
import FeedbackDetail from '~/views/Feedback/Feedback.Detail'
import LearningHistory from '~/views/LearningHistory'
import Signin from '~/views/auth/signin'
import Signup from '~/views/auth/signup'
import BDScreen from '~/views/bd'
import ChauDashboard from '~/views/chau'
import SWebview from '~/views/chau/Webview'
import ClassDetail from '~/views/class/ClassDetail'
import Transcript from '~/views/class/ClassDetail/Transcript'
import {LibraryFolders} from '~/views/library'
import LibraryFiles from '~/views/library/screens/Files'
import NotiScreen from '~/views/notificaions'
import PaymentHistories from '~/views/payments'
import PayDetail from '~/views/payments/PayDetail'
import Students from '~/views/students'
import UserAddress from '~/views/user-tab/address'
import UserInformation from '~/views/user-tab/information'
import UserLearn from '~/views/user-tab/learn'
import UserPassword from '~/views/user-tab/password'
import WelcomeScreen from '~/welcome'
import TabNavigator from './tab-nagivator'

export const rootNavigatorRef = createRef<NavigationContainerRef<any>>()

const Stack = createNativeStackNavigator<TRootNavigator>()

const RootNavigator = () => {
  const {mainLoading, user, isWelcome, remoteConfigs} = useGlobalContext()

  if (mainLoading) {
    return <View></View>
  }

  if (isWelcome) {
    return <WelcomeScreen />
  }

  return (
    <NavigationContainer ref={rootNavigatorRef}>
      <Stack.Navigator initialRouteName={!user?.token ? 'Signin' : 'RootTabs'} screenOptions={{headerShown: false}}>
        <Stack.Screen name="RootTabs" component={TabNavigator} />
        <Stack.Screen name="Transcript" component={Transcript} />
        <Stack.Screen name="LearningHistory" component={LearningHistory} />
        <Stack.Screen name="Feedback" component={Feedback} />
        <Stack.Screen name="CreateFeedback" options={{animation: 'slide_from_right'}} component={CreateFeedback} />
        <Stack.Screen name="FeedbackDetail" component={FeedbackDetail} />
        <Stack.Screen name="LibraryFiles" component={LibraryFiles} />
        <Stack.Screen name="Students" component={Students} />
        <Stack.Screen name="SelectStudent" component={SelectStudent} />
        <Stack.Screen name="UserAddress" component={UserAddress} />
        <Stack.Screen name="UserLearn" component={UserLearn} />
        <Stack.Screen name="PaymentHistories" component={PaymentHistories} />
        <Stack.Screen name="PayDetail" component={PayDetail} />
        <Stack.Screen name="LibraryFolders" component={LibraryFolders} />

        <Stack.Screen options={{animation: 'slide_from_right'}} name="NotiScreen" component={NotiScreen} />
        <Stack.Screen options={{animation: 'slide_from_right'}} name="ClassDetail" component={ClassDetail} />
        <Stack.Screen options={{animation: 'fade_from_bottom'}} name="UserPassword" component={UserPassword} />
        <Stack.Screen options={{animation: 'fade_from_bottom'}} name="UserInformation" component={UserInformation} />

        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="bd" component={BDScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Webview" component={SWebview} />
        <Stack.Screen name="ChauDashboard" component={ChauDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
