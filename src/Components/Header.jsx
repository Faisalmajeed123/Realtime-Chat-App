import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAuth} from '../Auth/AuthContext';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const {user, logout} = useAuth();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView
      className="flex-row bg-indigo-400 justify-between items-center px-5 pt-6 pb-6 "
      style={{elevation: 20}}>
      <View>
        <Text className="font-bold text-xl text-white">Chats</Text>
      </View>

      <View className="rounded-full">
        <Menu>
          <MenuTrigger>
            <Image
              source={{uri: user.profileUrl}}
              style={{
                height: hp(6),
                width: wp(10),
                borderRadius: 100,
                aspectRatio: 1,
                position: 'relative',
              }}
            />
          </MenuTrigger>

          <MenuOptions
            onSelect={() => action(value)}
            customStyles={{
              optionsContainer: {
                borderRadius: 20,
                elevation: 10,
                marginTop: 40,
                marginLeft: -5,
              },
            }}>
            <MenuOption
              value={null}
              style={{height: hp(7), justifyContent: 'center'}}>
              <View className=" flex-row justify-between px-2">
                <Text className="text-black">Profile</Text>
                <Ionicons name="person-outline" size={30} color={'gray'} />
              </View>
            </MenuOption>

            <View className="w-full bg-slate-200 h-0.5 "></View>

            <MenuOption
              value={null}
              onSelect={handleLogout}
              style={{height: hp(7), justifyContent: 'center'}}>
              <View className=" flex-row justify-between px-2">
                <Text className="text-black">Signout</Text>
                <AntDesign name="logout" size={30} color={'gray'} />
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({});
