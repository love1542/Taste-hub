import { View, Keyboard, TouchableWithoutFeedback, ImageSourcePropType, ScrollView, Text } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PagingIndicator from '../../../components/pagingIndicator/PagingIndicator';
import LeftIconWithTextButton from '../../../components/LeftIconWithTextButton';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AuthStackParamList } from '../../../navigation/type';
import SignupWithEmail from '../components/SignupWithEmail';
import VerifyOtp from '../components/VerifyOtp';
import SignupWithPhone from '../components/SignupWithPhone';
import { SignupForm, StepHandle } from '../types/auth.types';
import { signupStyles } from '../styles';
import { useTheme } from '../../../constants/theme';
import SignupProfile from '../components/SignupProfile';
import { useAppBottomSheet } from '../../../components/bottomSheet/hooks/useAppBottomSheet';
import ImagePickerSheet from '../../../components/imagePicker/ImagePickerSheet';
import { ImagePickerType, useImagePicker } from '../../../components/imagePicker/useImagePicker';
import { ImagePickerSheetItem } from '../../../components/imagePicker/types/imagePicker.types';
import { SIGNUP_SCREENS, SignupStep } from '../constants/signupConstants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCreateAccount, useSignupCredentials, useVerifyOtp } from '../hooks';
import { useToast } from '../../../components/toast';

type SignupRouteProp = RouteProp<AuthStackParamList, 'signup'>;
type SignupStackNavigationprops = NativeStackNavigationProp<AuthStackParamList, 'signup'>

const Signup = () => {
  const navigation = useNavigation<SignupStackNavigationprops>()
  const route = useRoute<SignupRouteProp>();
  const signupType = route.params?.signupType;
  const { palletteColors, scale } = useTheme()
  const [step, setStep] = useState<number>(2)
  const [image, setImage] = useState<string | ImageSourcePropType | undefined>(undefined)
  const styles = signupStyles(palletteColors, scale)
  const { open, close } = useAppBottomSheet()
  const { pickImage } = useImagePicker()
  const {showToast} = useToast()

  const [signupData, setSignupData] = useState<Partial<SignupForm>>({})
  const stepRef = useRef<StepHandle<any>>(null)
  const flow = SIGNUP_SCREENS[signupType]
  const currentStep = flow[step]

  const {
    mutateAsync: registerMutation,
    isPending: isRegisterLoading,
  } = useSignupCredentials();

  const {
    mutateAsync: verifyOtpMutation,
    isPending: isVerifyOtpLoading,
  } = useVerifyOtp();

  const {
    mutateAsync: createAccountMutation,
    isPending: isCreateAccountLoading,
    error: createAccountError,
  } = useCreateAccount();

  const isLoading = isRegisterLoading || isVerifyOtpLoading || isCreateAccountLoading

  const handleDefaultImagePress = (item: ImagePickerSheetItem) => {
    if (item.type === 'default') {
      setImage(item.image)
    }
    close()
  }

  const onCameraPress = () => {
    open({
      title: 'Select Image',
      content: <ImagePickerSheet
        onCameraPress={async () => {
          let image = await pickImage(ImagePickerType.Camera)
          setImage(image?.path)
          close()
        }}
        onGalleryPress={async () => {
          let image = await pickImage(ImagePickerType.Gallery)
          setImage(image?.path)
          close()
        }}
        defaultIconPress={handleDefaultImagePress}
      />
    })
  }

  const continuePress = async () => {
    const result = await stepRef.current?.validate()
    if (!result) return

    try {
      let response

      switch (currentStep) {
        case SignupStep.Credential:
          if (signupType === 'email') {
            response = await registerMutation(result);
            if (response.success) {
              const updated = {
                ...signupData,
                ...response.data
              }
              setSignupData(updated)
              setStep(step + 1);
            }
          } else {
            // phone mutation here when available
          }
          break

        case SignupStep.Verification:
          response = await verifyOtpMutation(result)
          if (response.success) {
            setStep(step + 1);
          }
          break

        case SignupStep.UserInfo:
          response = await createAccountMutation(result)
          if (response.success) {
            const updated = {
              ...signupData,
              ...response.data?.profileData
            }
            setSignupData(updated)
            navigation.replace('home')
          }
          break
      }

      if (response?.success){
        showToast({
          message: response.message,
          type:"success"
        })
      } else {
        showToast({
          message: response?.message,
          type:"error"
        })
      }

    } catch {
      console.log("signup error")
    }

  };

  const onLoginPress = () => {
    navigation.replace("login")
  }

  const renderScreen = () => {
    switch (currentStep) {
      case SignupStep.Credential:
        return signupType === 'email' ? <SignupWithEmail ref={stepRef} /> : <SignupWithPhone />

      case SignupStep.Verification:
        return <VerifyOtp ref={stepRef} destination={signupType === 'email' ? "sdf@gmail.com" : "9888722"} resendPress={() => { }} />

      case SignupStep.UserInfo:
        return <SignupProfile ref={stepRef} img={image} onCameraPress={onCameraPress} />
    }
  }



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>

        <PagingIndicator
          totalPages={3}
          currentPageIndex={step}
          long={true}
        />

        <View style={styles.contentWrapper}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}
          >
            {renderScreen()}
          </ScrollView>
        </View>

        <View style={styles.continueButtonWrapper}>
          {step === 0 && <View style={styles.loginRow}>
            <Text style={styles.loginText}>Aleardy have an account</Text>
            <TouchableWithoutFeedback onPress={onLoginPress}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableWithoutFeedback>
          </View>}
          <LeftIconWithTextButton
            text={isLoading ? 'Loading...' : "countinue"}
            colors={['#FF6B35', '#FF6B35']}
            onPress={continuePress}
            disabled= {isLoading}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;