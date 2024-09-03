import { StyleSheet, Text, View, Image, TextInput, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Loading from '../Components/Loading';
import { useAuth } from '../Auth/AuthContext';


const Signin = () => {

  const navigation = useNavigation()
  const [loading, setloading] = useState(false)
  const {login} = useAuth();

  const EmailRef = useRef('')
  const PasswordRef = useRef('')


  const onSubmit = async() => {
    if (!EmailRef.current || !PasswordRef.current) {
      return (Alert.alert('Fields are Empty'))}

    setloading(true)
    const respone = await login(EmailRef.current, PasswordRef.current);
    setloading(false)
    if(!respone.success)
      Alert.alert('Signin', respone.msg)
    
  };

  return (
    <View className=' justify-center items-center gap-4'>
      <Image className='' style={{ height: hp(40), width: wp(80) }} source={require('../Assets/login.png')} />
      <Text className='font-bold text-5xl text-black' >SignIn</Text>

      <View className='gap-4'>
        <View className='border rounded-2xl' style={{ height: hp(7), width: wp(90), backgroundColor: '#E7E7E7' }}>
          <View className='flex-row items-center px-2 gap-1'>
            <Ionicons name='mail-outline' size={30} color={'gray'} />
            <TextInput className='text-black ' placeholder='Email Address' placeholderTextColor={'gray'} onChangeText={value => EmailRef.current = value}/>
          </View>
        </View>
        <View className='border rounded-2xl' style={{ height: hp(7), width: wp(90), backgroundColor: '#E7E7E7' }}>
          <View className='flex-row items-center px-2 gap-1'>
            <Ionicons name='lock-closed-outline' size={28} color={'gray'} />
            <TextInput className='text-black ' placeholder='Password' placeholderTextColor={'gray'} onChangeText={value => PasswordRef.current = value} secureTextEntry />
          </View>
        </View>


        <Text className='text-black text-right'>Forgot Password?</Text>


        {
          loading ? (
            <View className='flex-row justify-center'>
              <Loading />
            </View>
          ) : (
            <View className='border rounded-2xl items-center justify-center' style={{ height: hp(7), width: wp(90), backgroundColor: 'blue' }}>
              <Pressable className='items-center justify-center' onPress={onSubmit}>
                <Text className=' text-white text-3xl font-bold'>Sign In</Text>
              </Pressable>
            </View>
          )


        }


        <View className='flex-row items-center justify-center'>
          <Text className='font-medium text-black'>Don't have an account?  </Text>
          <Pressable onPress={() => navigation.navigate('signup')}>
            <Text className='text-blue-600 font-medium'>
              Sign up
            </Text>
          </Pressable>
        </View>


      </View>




    </View>
  )
}

export default Signin

const styles = StyleSheet.create({
})

