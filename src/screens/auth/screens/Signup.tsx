import { View, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PagingIndicator from '../../../components/pagingIndicator/PagingIndicator';
import LeftIconWithTextButton from '../../../components/LeftIconWithTextButton';
import { ArrowLeft, Lock, Mail } from 'lucide-react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AuthStackParamList } from '../../../navigation/type';
import SignupWithEmail from '../components/SignupWithEmail';
import VerifyOtp from '../components/VerifyOtp';
import SignupWithPhone from '../components/SignupWithPhone';
import { FormProvider, useForm } from 'react-hook-form';
import { SignupForm } from '../types/auth.types';
import { signupStyles } from '../styles';
import { useTheme } from '../../../constants/theme';
import { zodResolver } from "@hookform/resolvers/zod";
import { emailStepSchema, phoneSchema, otpSchema } from '../../../utilites/validation/authSchema';

type SignupRouteProp = RouteProp<AuthStackParamList, 'signup'>;

const Signup = () => {
  const route = useRoute<SignupRouteProp>();
  const signupType = route.params?.signupType;
  const { palletteColors, scale } = useTheme()
  const [step, setStep] = useState<number>(0)
  const styles = signupStyles(palletteColors, scale)

  const methods = useForm<SignupForm>({
    defaultValues: {
      email: "",
      password: "",
      phone: "",
      otp: "",
    },
  });

  const { trigger } = methods

  

  const renderContent = () => {
    switch (signupType) {
      case 'email':
        return <SignupWithEmail />

      case 'phone':
        return <SignupWithPhone />

      default:
        return <></>
    }
  };

  const continuePress = async () => {
    let valid = false;

    if (step === 0) {
      valid =
        signupType === "email"
          ? await trigger(["email", "password"])
          : await trigger(["phone"]);
    }
    console.log(valid)

    if (step === 1) {
      valid = await trigger(["otp"]);
    }

    console.log(valid)

    if (!valid) return;

    setStep(step + 1);
  };

  const onBackPress = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <SafeAreaView style={styles.container}>
        <LeftIconWithTextButton
          leftIcon={<ArrowLeft size={20} color={palletteColors.black} />}
          onPress={onBackPress}
          style={styles.backButton}
          colors={[palletteColors.white, palletteColors.white]}
        />

        <PagingIndicator
          totalPages={3}
          currentPageIndex={step}
          long={true}
        />

        <FormProvider {...methods}>
          {(step === 0) && renderContent()}
          {(step === 1) && <VerifyOtp destination={signupType === 'email' ? "sdf@gmail.com"  : "9888722"}/>}
        </FormProvider>


        <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
          <LeftIconWithTextButton
            text='Continue'
            colors={['#FF6B35', '#FF6B35']}
            onPress={continuePress}
          />
        </View>

      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;