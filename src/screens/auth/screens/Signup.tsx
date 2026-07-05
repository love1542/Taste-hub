import { View, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PagingIndicator from '../../../components/pagingIndicator/PagingIndicator';
import LeftIconWithTextButton from '../../../components/LeftIconWithTextButton';
import { ArrowLeft, Lock, Mail } from 'lucide-react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AuthStackParamList } from '../../../navigation/type';
import BorderLineTextField from '../../../components/fields/BorderLineTextField';

type SignupRouteProp = RouteProp<AuthStackParamList, 'signup'>;

const Signup = () => {
  const route = useRoute<SignupRouteProp>();
  const signupType = route.params?.signupType;
  const [email, setEmail] = useState('')
  const [password, serPassword] = useState('')
  const [phone, setPhone] = useState('')


  const renderContent = () => {
    switch (signupType) {
      case 'email':
        return (
          <View style={{ width: '100%', gap: 20 }}>
            <Text>
              Sign up with email
            </Text>

            <Text>Enter your details. New users are created automatically.</Text>
          <View style={{gap:25}}>
     <BorderLineTextField
              title='email'
              value={email}
              onChangeText={(text) => setEmail(text)}
              leftIcon={<Mail />}
            />
            <BorderLineTextField
              title='password'
              value={password}
              onChangeText={(text) => serPassword(text)}
              leftIcon={<Lock />}
              isSecureField={true}
            />
          </View>
           
            <View>
              <TouchableOpacity>
                <Text>ForgetPassword</Text>
              </TouchableOpacity>
            </View>
          </View>)

      case 'phone':
        return (
          <View style={{ width: '100%', gap: 6 }}>
            <Text>
              Sign up with Phone
            </Text>

            <Text>Enter your details. New users are created automatically.</Text>
            <BorderLineTextField
              title='phone'
              value={phone}
              onChangeText={(text) => setPhone(text)} />
          </View>
        )

      default:
        return <Text style={{ color: 'white', fontSize: 18 }}>signupType: {signupType}</Text>;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <SafeAreaView style={{ flex: 1, alignItems: 'flex-start', padding: 24, gap: 15 }}>
        <LeftIconWithTextButton leftIcon={<ArrowLeft size={20} />} />

        <PagingIndicator
          totalPages={3}
          currentPageIndex={0}
          long={true}
        />

        {renderContent()}
    <View style={{flex:1, justifyContent:'flex-end', width:'100%'}}>
      <LeftIconWithTextButton 
        text='Continue'
        colors={['#FF6B35', '#FF6B35']}/>
    </View>
        
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;