import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'

const Chatlist = ({ users, currentUser }) => {

  console.warn = () => {};

  return (
    <View className='flex-1'>
      <FlatList
        data={users}
        contentContainerStyle={{flex: 1, paddingVertical: 25}}
        keyExtractor={item => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <ChatItem noBorder= {index+1 == users.length} item={item} index={index} currentUser={currentUser} />}
      />
    </View>
  )
}

export default Chatlist

const styles = StyleSheet.create({})