import { View, Keyboard, TouchableWithoutFeedback, ScrollView, Text, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppBottomSheet } from '../../../../components/bottomSheet/hooks/useAppBottomSheet';
import ImagePickerSheet from '../../../../components/imagePicker/ImagePickerSheet';
import { PickedImage } from '../../../../components/imagePicker/types/imagePicker.types';
import { useImagePicker, ImagePickerType } from '../../../../components/imagePicker/useImagePicker';
import AppButton from '../../../../components/AppButton';
import PagingIndicator from '../../../../components/pagingIndicator/PagingIndicator';
import { useToast } from '../../../../components/toast';
import { AuthStackParamList } from '../../../../navigation/type';
import SignupProfile from './components/SignupProfile';
import VerifyOtp from './components/VerifyOtp';
import { useVerifyOtp, useRegiserUser, useCompleteRegistration } from '../../hooks';
import { signupStyles } from '../../styles';
import { StepHandle } from '../../types/auth.types';
import { useTheme } from '../../../../constants/theme';
import SignupWithEmail from './components/SignupWithEmail';
import SignupWithPhone from './components/SignupWithPhone';
import SegmentControler from '../../../../components/segmentControler/SegmentControler';
import { SIGNUP_SCREENS, SignupStep } from '../../constants/signupConstants';
import { authRoutes, } from '../../../../constants/appConstants';
import { CompleteRegistrationRequest, OtpVerifyRequest, RegisterRequest } from '../../../../api/dto/auth.dto';
import { TokenManager } from '../../../../services/tokenManager/tokenManager';
import { useGetDefaultImages } from '../../../../hooks';
import { getDeviceId } from '../../../../utilites/helper/deviceInfo';

type SignupRouteProp = RouteProp<AuthStackParamList, typeof authRoutes.signup>;

type SignupNavigationProp = NativeStackNavigationProp<AuthStackParamList, typeof authRoutes.signup>;

const Signup = () => {
  const navigation = useNavigation<SignupNavigationProp>()
  const route = useRoute<SignupRouteProp>();
  const signupType = route.params?.signupType;
  const { palletteColors, scale } = useTheme()
  const [step, setStep] = useState<number>(0)
  const [tab, setTab] = useState<number>(0)
  const [userId, setUserId] = useState<string>("")
  const styles = signupStyles(palletteColors, scale)
  const { open, close } = useAppBottomSheet()
  const { pickImage } = useImagePicker()
  const { showToast } = useToast()
  
  const [pickedImage, setPickedImage] = useState<PickedImage | undefined>(undefined)

  const [otpMethod, setOtpMethod] = useState<string>("")
  const stepRef = useRef<StepHandle<any>>(null)
  const flow = SIGNUP_SCREENS[signupType]
  const currentStep = flow[step]

  const {
    mutateAsync: registerMutation,
    isPending: isRegisterLoading,
  } = useRegiserUser();

  const {
    mutateAsync: verifyOtpMutation,
    isPending: isVerifyOtpLoading,
  } = useVerifyOtp();

  const {
    mutateAsync: completeRegistrationMutation,
    isPending: isCreateAccountLoading,
  } = useCompleteRegistration();

  const {data: defaultImages} = useGetDefaultImages()

  const isLoading = isRegisterLoading || isVerifyOtpLoading || isCreateAccountLoading

  const handleDefaultImagePress = (id:string) => {
      setPickedImage({ type: 'default', id: id })
    close()
  }


  const onCameraPress = () => {
    open({
      title: 'Select Image',
      content: <ImagePickerSheet
        onCameraPress={async () => {
          let image = await pickImage(ImagePickerType.Camera)
          setPickedImage({ type: 'uri', uri: image?.path })
          close()
        }}
        onGalleryPress={async () => {
          let image = await pickImage(ImagePickerType.Gallery)
          setPickedImage({ type: 'uri', uri: image?.path })
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

        let identifier = tab===0 ? result.email : result.phone

        setOtpMethod(identifier)

          const request: RegisterRequest = {
            type: tab===0 ? "email" : "phone",
            identifier: identifier,
            password: tab===0 ? result.password : undefined
          }
          response = await registerMutation(request);

          if (response.success) {
            setUserId(response.data.user_id ?? "")
            setStep(step + 1);
          }
          break

        case SignupStep.Verification:

          let verifyOtpRequest: OtpVerifyRequest = {
            otpCode: result.otp,
            purpose: tab === 0 ? "register_email" : "register_phone",
            userId: userId
          }
          response = await verifyOtpMutation(verifyOtpRequest)
          if (response.success) {
            TokenManager.saveAccessToken(response.data.access_token)
            setStep(step + 1);
          }
          break

        case SignupStep.UserInfo:

          const deviceId = await getDeviceId()

          if (!pickedImage || (pickedImage.type === "uri" && !pickedImage.uri)) {
            showToast({
              message: "Please select a profile image",
              type: "error"
            })
            return
          }

          let gender: CompleteRegistrationRequest['gender']

          switch (String(result.gender)) {
            case '1':
              gender = 'male'
              break
            case '2':
              gender = 'female'
              break
            case '3':
              gender = 'other'
              break
            default:
              showToast({
                message: "Please select a valid gender",
                type: "error"
              })
              return
          }

          const completeRequest: CompleteRegistrationRequest = {
            dateOfBirth: result.dateOfBirth,
            deviceId,
            fullName: result.fullName,
            gender,
            imageType: pickedImage.type === "default" ? "default" : "uploaded",
            ...(pickedImage.type === "default"
              ? { imageId: pickedImage.id }
              : { profileImage: pickedImage.uri })
          }

          response = await completeRegistrationMutation(completeRequest)
          break
      }

      if (response.success) {
        showToast({
          message: response.message,
          type: "success"
        })
      } else {
        showToast({
          message: response.message,
          type: "error"
        })
      }

    } catch (error) {
      console.log(error)
      showToast({
          message: "someting went wrong",
          type: "error"
        })
    }

  };

  const onLoginPress = () => {
    navigation.replace("login")
  }

  useEffect(()=>{
    if (!pickedImage && ((defaultImages?.data?.length ?? 0) > 0)){
      let randomImage = defaultImages?.data[Math.floor(Math.random() * defaultImages?.data.length)]
      setPickedImage( {id:randomImage?.id ?? "", type:"default" })
    }
  }, [defaultImages, pickedImage])

  const renderScreen = () => {
    switch (currentStep) {
      case SignupStep.Credential:
        return cerdentialStep()

      case SignupStep.Verification:
        return <VerifyOtp ref={stepRef} destination={otpMethod} resendPress={() => { }} />

      case SignupStep.UserInfo:
        return <SignupProfile ref={stepRef} img={pickedImage} onCameraPress={onCameraPress} />
    }
  }

  const cerdentialStep = () => (
    <View style={{ gap: scale.xl_18 }}>
      <SegmentControler segments={["Email", "Phone"]} onChange={setTab} selectedIndex={tab} />
      {
        tab === 0 ? <SignupWithEmail ref={stepRef} /> : <SignupWithPhone ref={stepRef} />
      }
    </View>
  )



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>

        <Image source={require("../../../../../assets/icons/burger.png")} style={styles.bgIcon} />
        <View style={{ width: '80%', alignSelf: 'flex-end' }}>
          <PagingIndicator
            totalPages={3}
            currentPageIndex={step}
            long={true}
          />
        </View>


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
          <AppButton
            text={isLoading ? 'Loading...' : "countinue"}
            colors={['#FF6B35', '#FF6B35']}
            onPress={continuePress}
            disabled={isLoading}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;