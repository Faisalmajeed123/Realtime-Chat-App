import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';


const ChatRoomHeader = ({ user }) => {


    const navigation = useNavigation()
    
    return (
        <View className='px-3 my-4 border-b-2 border-neutral-300 justify-between flex-row' style={{ height: hp(8), width: wp(100)}}>
            <View className='flex-row gap-2'>
                <Pressable onPress={() => navigation.navigate('home')}>
                    <Ionicons name='chevron-back-outline' size={40} color={'gray'} />
                </Pressable>

                    <Image
                    source={{uri: user.photoURL}}
                    className='rounded-full bg-' 
                    style={{height: hp(5.5), width: hp(6)}}/>

                    <Text className='text-black text-base'>{user.name}</Text>
            </View>

            <View className='flex-row gap-4'>
                <SimpleLineIcons name='phone' size={30} color='gray'/>
                <Feather name='video' size={30} color='gray'/>

            </View>

        </View>

    )
}

export default ChatRoomHeader

const styles = StyleSheet.create({})





// <Stack.Screen
// options={{
//   headerShadowVisible: false,
//   headerLeft: ()=>{
//     <View className= 'flex-row items-center gap-4'>
//       <View className='flex-row items-center gap-3'>
//         <Image
//         source={{uri: item.photoURL}}
//         style={{height: hp(4.5), aspectRatio: 1, borderRadius: 100}}/>
//       </View>
//     </View>
//   }    }}/>