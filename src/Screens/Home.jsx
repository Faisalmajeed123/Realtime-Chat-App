import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../Auth/AuthContext';

const Home = () => {
    const navigation =useNavigation();
    const {logout, user} = useAuth();

    const onlogout = async() => {
        await logout();
    };
    console.log( 'userdata', user)




  return (
    <View className='bg-white'>
      <Text className= 'text-black'>Home</Text>
      <Button title='logout' onPress={onlogout}/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})