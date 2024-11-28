import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Loading = () => {
  return (
    <View style={{height: hp(5), width: wp(15), aspectRatio: 1}}>
      <LottieView
        source={require('../Assets/loading.json')}
        style={{flex: 1}}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
