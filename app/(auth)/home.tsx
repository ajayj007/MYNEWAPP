// app/(auth)/home.tsx

import React from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import BitcoinChartScreen from '../(homescreen)/BitcoinChartScreen';

const HomeScreen = () => {
  const user = auth().currentUser;

  return (
    <View style={{ flex: 1 }}>
      <Text>Welcome Back {user?.email}</Text>
      <Button title="Sign Out" onPress={() => auth().signOut()} />
      <BitcoinChartScreen />
    </View>
  );
};

export default HomeScreen;
