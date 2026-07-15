import { View, Keyboard, TouchableWithoutFeedback, ImageSourcePropType, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PagingIndicator from '../../../components/pagingIndicator/PagingIndicator';
import LeftIconWithTextButton from '../../../components/LeftIconWithTextButton';
import { ArrowLeft } from 'lucide-react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
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

type SignupRouteProp = RouteProp<AuthStackParamList, 'signup'>;

const Signup = () => {
  const route = useRoute<SignupRouteProp>();
  const signupType = route.params?.signupType;
  const { palletteColors, scale } = useTheme()
  const [step, setStep] = useState<number>(0)
  const [image, setImage] = useState<string | ImageSourcePropType | undefined>(undefined)
  const styles = signupStyles(palletteColors, scale)
  const { open, close } = useAppBottomSheet()
  const { pickImage } = useImagePicker()

  const [signupData, setSignupData] = useState<Partial<SignupForm>>({})
  const stepRef = useRef<StepHandle<any>>(null)

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


    setStep(step + 1);
  };

  const onBackPress = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const flow = SIGNUP_SCREENS[signupType]
  const currentStep = flow[step]


  const renderScreen = () => {
    switch (currentStep) {
      case SignupStep.Credential:
        return signupType === 'email' ? <SignupWithEmail ref={stepRef}/> : <SignupWithPhone />

      case SignupStep.Verification:
        return <VerifyOtp destination={signupType === 'email' ? "sdf@gmail.com" : "9888722"} resendPress={() => { }} />

      case SignupStep.UserInfo:
        return <SignupProfile img={image} onCameraPress={onCameraPress} />
    }
  }

  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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