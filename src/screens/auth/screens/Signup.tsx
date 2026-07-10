import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
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
import SignupProfile from '../components/SignupProfile';
import { SIGNUP_SCREENS, SignupStep } from '../constants/signupConstants';

type SignupRouteProp = RouteProp<AuthStackParamList, 'signup'>;

const Signup = () => {
  const route = useRoute<SignupRouteProp>();
  const signupType = route.params?.signupType;
  const { palletteColors, scale } = useTheme()
  const [step, setStep] = useState<number>(0)
  const styles = signupStyles(palletteColors, scale)

  const flow = SIGNUP_SCREENS[signupType]
  const currentStep = flow[step]

  const methods = useForm<SignupForm>({
    defaultValues: {
      email: "",
      password: "",
      phone: "",
      otp: "",
    },
  });

  const { trigger } = methods

  const renderScreen = () => {
    switch (currentStep) {
      case SignupStep.Credential:
        return signupType === 'email' ? <SignupWithEmail /> : <SignupWithPhone />

      case SignupStep.Verification:
        return <VerifyOtp destination={signupType === 'email' ? 'dummy@gmail.com' : '9384389238'} />

      case SignupStep.UserInfo:
        return <SignupProfile />
    }
  }

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
          {renderScreen()}
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