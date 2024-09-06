import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native'
import { formatDate, getRoomId } from '../utilis/common';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ChatItem = ({ item, noBorder, currentUser }) => {
  const navigation = useNavigation();

  const [lastMessage, setLastMessage] = useState(undefined)

  console.warn = () => {};


  const openChatRoom=()=>{
    navigation.navigate('chatroom', { item });
  };

  useEffect(()=>{
    let roomId = getRoomId(currentUser?.userId, item?.userId);
    const docRef= doc(db, 'rooms', roomId);
    const messagesRef = collection(docRef, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages= snapshot.docs.map(doc=>{
        return doc.data();
      });
      setLastMessage(allMessages[0]? allMessages[0]: null);
    })

    return unsub;
  }, []);



  const renderTime= ()=>{
    if(lastMessage){
      let date = lastMessage?.createdAt;
      return formatDate(new Date(date?.seconds * 1000));
    }
  };

  const renderLastMessage=()=>{
    if (typeof lastMessage== 'undefined') return 'Loading...';

    if(lastMessage){
      if(currentUser?.userId  == lastMessage?.userId) return 'You: ' + lastMessage?.text;
      return lastMessage?.text;

    }else{
      return 'Say Hi👋'
    }
  }


  return (
    <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-3 items-center gap-3 mb-4 pb-2 p-2 ${noBorder ? '' : 'border-b border-b-neutral-200'}`}>
        <Image source={{uri: item.photoURL}}
          className='rounded-full bg-' 
          style={{height: hp(6), width: hp(6)}}/>
  

      <View className='flex-1 gap-1'>
        <View className='flex-row justify-between'>
          <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-neutral-800'>{item.name}</Text>
          <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-neutral-500'>{renderTime()}</Text>
        </View>
        <Text style={{ fontSize: hp(1.6), width: wp(65) }} className='font-medium text-neutral-500'>{renderLastMessage()}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ChatItem

const styles = StyleSheet.create({})