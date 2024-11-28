import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../Auth/AuthContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Chatlist from '../Components/Chatlist';
import Loading from '../Components/Loading';
import {doc, getDocs, query, where} from 'firebase/firestore';
import {userRef} from '../../firebaseConfig';

const Home = () => {
  const navigation = useNavigation();
  const {logout, user} = useAuth();
  const [users, setUser] = useState([]);

  useEffect(() => {
    if (user?.uid) getUsers();
  }, []);

  const getUsers = async () => {
    const q = query(userRef, where('userId', '!=', user?.uid));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc => {
      data.push({...doc.data()});
    });

    setUser(data);
    console.log('gotUsers', data);
  };

  console.log('userdata', user);

  return (
    <View className="bg-white flex-1">
      {users.length > 0 ? (
        <Chatlist currentUser={user} users={users} />
      ) : (
        <View className="flex items-center" style={{top: hp(30)}}>
          <Loading />
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
