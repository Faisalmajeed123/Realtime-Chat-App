import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Loading from '../Components/Loading';
import {useAuth} from '../Auth/AuthContext';

const Signup = () => {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const {register} = useAuth();

  const NameRef = useRef('');
  const EmailRef = useRef('');
  const PasswordRef = useRef('');
  const ImageRef = useRef('');

  const onSubmit = async () => {
    if (
      !NameRef.current ||
      !EmailRef.current ||
      !PasswordRef.current ||
      !ImageRef.current
    ) {
      return Alert.alert('Fields are Empty');
    }

    setloading(true);
    let response = await register(
      EmailRef.current,
      PasswordRef.current,
      NameRef.current,
      ImageRef.current,
    );
    setloading(false);
    console.log('response: ', response);

    if (!response.success) {
      Alert.alert('Please try again');
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View className=" justify-center items-center gap-2 p-1 bg-white">
          <Image
            className=""
            style={{height: hp(30), width: wp(60)}}
            resizeMode="contain"
            source={require('../Assets/login.png')}
          />
          <Text className="font-bold text-5xl text-black">SignUp</Text>

          <View className="gap-4">
            <View
              className="border rounded-2xl"
              style={{
                height: hp(7),
                width: wp(90),
                backgroundColor: '#E7E7E7',
              }}>
              <View className="flex-row items-center px-2 gap-1">
                <Ionicons name="person-outline" size={30} color={'gray'} />
                <TextInput
                  className="text-black "
                  placeholder="Name"
                  placeholderTextColor={'gray'}
                  onChangeText={value => (NameRef.current = value)}
                />
              </View>
            </View>
            <View
              className="border rounded-2xl"
              style={{
                height: hp(7),
                width: wp(90),
                backgroundColor: '#E7E7E7',
              }}>
              <View className="flex-row items-center px-2 gap-1">
                <Ionicons name="mail-outline" size={28} color={'gray'} />
                <TextInput
                  className="text-black "
                  placeholder="Email Address"
                  placeholderTextColor={'gray'}
                  onChangeText={value => (EmailRef.current = value)}
                />
              </View>
            </View>
            <View
              className="border rounded-2xl"
              style={{
                height: hp(7),
                width: wp(90),
                backgroundColor: '#E7E7E7',
              }}>
              <View className="flex-row items-center px-2 gap-1">
                <Ionicons name="lock-closed-outline" size={28} color={'gray'} />
                <TextInput
                  className="text-black "
                  placeholder="Password"
                  placeholderTextColor={'gray'}
                  secureTextEntry
                  onChangeText={value => (PasswordRef.current = value)}
                />
              </View>
            </View>
            <View
              className="border rounded-2xl"
              style={{
                height: hp(7),
                width: wp(90),
                backgroundColor: '#E7E7E7',
              }}>
              <View className="flex-row items-center px-2 gap-1">
                <Ionicons name="image-outline" size={28} color={'gray'} />
                <TextInput
                  className="text-black "
                  placeholder="Image URl"
                  placeholderTextColor={'gray'}
                  onChangeText={value => (ImageRef.current = value)}
                />
              </View>
            </View>

            {loading ? (
              <View className="flex-row justify-center">
                <Loading />
              </View>
            ) : (
              <View
                className="border rounded-2xl items-center justify-center "
                style={{height: hp(7), width: wp(90), backgroundColor: 'blue'}}>
                <Pressable
                  className="items-center justify-center"
                  onPress={onSubmit}>
                  <Text className=" text-white text-3xl font-bold">
                    Sign Up
                  </Text>
                </Pressable>
              </View>
            )}

            <View className="flex-row items-center justify-center">
              <Text className="font-medium text-black">
                Already have an account?{' '}
              </Text>
              <Pressable
                className=""
                onPress={() => navigation.navigate('signin')}>
                <Text className="text-blue-600 font-medium">Sign In</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({});
