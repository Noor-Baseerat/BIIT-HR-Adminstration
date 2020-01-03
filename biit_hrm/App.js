import * as React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Splash_Screen from './Screens/Splash_Screen';
import loginScreen from './Screens/loginScreen';
import mainScreen from './Screens/mainScreen';
import applyleaveScreen from './Screens/applyleaveScreen';
import attendanceScreen from './Screens/attendanceScreen';
import mainScreenAdmin from './Screens/mainScreenAdmin';
import leaveRequestByDate from './Screens/leaveRequestByDate';
import EmployeeScreen from './Screens/EmployeeScreen'
import addEmployeeScreen from './Screens/addEmployeeScreen'
import leaveRequestList from './Screens/leaveRequestList'
import testDate from './Screens/testDate'
import testpic from './Screens/testpic'
import approvalScreen from './Screens/approvalScreen'
import employeeAttendanceHistory from './Screens/employeeAttendanceHistory'
import testConditionalRendering from './Screens/testConditionalRendering'
import testTimepicker from './Screens/testTimepicker'
import testSearchingflatlist from './Screens/testSearchingflatlist'
import modifyEmployee from './Screens/modifyEmployee'




//10.0.2.2
global.IP='10.0.2.2'
const RootStack = createStackNavigator(
  {
    Splash_Screen: {
      screen: Splash_Screen,
      
    },
    loginScreen: {
      screen: loginScreen,
      
    },
    mainScreen: {
      screen: mainScreen,
      
    },
    applyleaveScreen:{
      screen: applyleaveScreen,
    },
    attendanceScreen:{
      screen: attendanceScreen,
    },
    mainScreenAdmin:{
      screen:mainScreenAdmin
    },
    leaveRequestByDate:{
      screen:leaveRequestByDate
    },
    EmployeeScreen:{
      screen:EmployeeScreen
    },
    addEmployeeScreen:{
      screen:addEmployeeScreen
    },
    leaveRequestList:{
      screen:leaveRequestList
    },
    testDate:{
      screen:testDate
    },
    testpic:{
      screen:testpic
    },
    approvalScreen:{
      screen:approvalScreen
    },
    employeeAttendanceHistory:{
      screen:employeeAttendanceHistory
    },
    testConditionalRendering:{
      screen:testConditionalRendering
    },
    
    testTimepicker:{
      screen:testTimepicker
    },
    testSearchingflatlist:{
      screen:testSearchingflatlist
    },
    modifyEmployee:{
      screen:modifyEmployee
    },
    
},
  {
    initialRouteName: 'EmployeeScreen',
    headerMode:'none',
    navigationOptions:{
    headerVisible:'false'
    }
  }

)
const AppContainer = createAppContainer(RootStack);

export default function App() {
  return (
    <AppContainer />
    
  );
}
