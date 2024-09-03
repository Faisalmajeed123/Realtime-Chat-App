import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Signin from './src/Screens/Signin';
import Signup from './src/Screens/Signup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, StackActions, useNavigation } from '@react-navigation/native';
import Loading from './src/Components/Loading';
import { AuthContext, Authcontextprovider, useAuth } from './src/Auth/AuthContext';
import Home from './src/Screens/Home';
import Header from './src/Components/Header';
import { MenuProvider } from 'react-native-popup-menu';



const Stack = createNativeStackNavigator()


const App = () => {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation();


  useEffect(() => {
    if (isAuthenticated) {
      navigation.dispatch(StackActions.replace('home'))
    } else {
      navigation.dispatch(StackActions.replace('signin'))
    }
  }, [isAuthenticated])



  return (
    <Stack.Navigator initialRouteName='signup'>
      <Stack.Screen name='signin' component={Signin} options={{ headerShown: false }} />
      <Stack.Screen name='signup' component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name='header' component={Header} options={{ headerShown: false }} />
      <Stack.Screen name='home' component={Home} options={{ header: () => <Header /> }} />
    </Stack.Navigator>
  )
}


const MainApp = () => {
  return (
    <MenuProvider>
      <Authcontextprovider>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </Authcontextprovider>
    </MenuProvider>
  )
}
export default MainApp

const styles = StyleSheet.create({})