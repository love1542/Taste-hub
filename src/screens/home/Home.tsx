import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { STORAGE_KEYS, storageService } from '../../services/storageService';
import { loginUserStorage, SignupForm } from '../auth/types/auth.types';

const Home = () => {
  const [info, setInfo] = useState<loginUserStorage | null>(null);
  const [allusers, setAllUsers] = useState<SignupForm[]>()

  useEffect(() => {
    const loadUser = async () => {
      const user =
        await storageService.get<loginUserStorage>(STORAGE_KEYS.loginUser);

      setInfo(user);
    };
    const loadAllusers = async () => {
    const users =
    (await storageService.get<SignupForm[]>(STORAGE_KEYS.allUsers)) ?? [];
    setAllUsers(users)
    }
    
    loadAllusers()
    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text>{info?.userId}</Text>
      <Text>{info?.token}</Text>
      <TouchableOpacity onPress={()=> {console.log(allusers)}}>
        <Text>All users</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default Home;
