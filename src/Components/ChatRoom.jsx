import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, Animated, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import ChatRoomHeader from './ChatRoomHeader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MessageList from './MessageList';
import Feather from 'react-native-vector-icons/Feather';
import { useAuth } from '../Auth/AuthContext';
import { getRoomId } from '../utilis/common';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { db, userRef } from '../../firebaseConfig';



const ChatRoom = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { item } = route.params;
  const [messages, setMessages] = useState([]);
  const textRef = useRef('');
  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    createRoomIfNotExists();

    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, 'rooms', roomId);
    const messagesRef = collection(docRef, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map(doc => {
        return doc.data();
      });
      setMessages([...allMessages])
    });

    const KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', updateScrollView)

    return () => {
      unsub();
      KeyboardDidShowListener.remove()
    }

  }, []);

  useEffect(() => {
    updateScrollView();
  }, [])

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true })
    }, 100)
  }


  const createRoomIfNotExists = async () => {
    let roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, 'rooms', roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date())
    })
  };

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, 'rooms', roomId);
      const messagesRef = collection(docRef, 'messages');
      textRef.current = '';
      if (inputRef) inputRef?.current?.clear();
      const newDoc = await addDoc(messagesRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date())
      });

      console.log('new message id: ', newDoc.id)
    } catch (error) {
      Alert.alert('Message', error.message)
    }
  };


  return (
    <View className='flex-1 bg-white'>
      <ChatRoomHeader user={item} />
      <View className='flex-1 justify-between overflow-visible'>
        <View className='flex-1'>
          <MessageList messages={messages} currentUser={user} scrollViewRef={scrollViewRef} />
        </View>
      </View>

      <View style={{ marginBottom: hp(1.7) }} className='pt-2'>
        <View className='flex-row justify-between items-center mx-3'>
          <View className='flex-row justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5'>
            <TextInput
              ref={inputRef}
              placeholder='Type Message...'
              placeholderTextColor={'gray'}
              onChangeText={value => textRef.current = value}
              style={{ fontSize: hp(2) }}
              className=' flex-1 mr-2 text-black'
            />
            <TouchableOpacity onPress={handleSendMessage} className='bg-neutral-200 p-2 mr-[1px] rounded-full'>
              <Feather name='send' size={30} color={'gray'} />
            </TouchableOpacity>
          </View>

        </View>
      </View>

    </View>
  )
}

export default ChatRoom

const styles = StyleSheet.create({})


