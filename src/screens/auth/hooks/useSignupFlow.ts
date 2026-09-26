import { useState, useRef, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PickedImage } from '../../../components/imagePicker/types/imagePicker.types';
import { useImagePicker, ImagePickerType } from '../../../components/imagePicker/useImagePicker';
import { useAppBottomSheet } from '../../../components/bottomSheet/hooks/useAppBottomSheet';
import { useToast } from '../../../components/toast';
import { useVerifyOtp, useRegiserUser, useCompleteRegistration } from './index';
import { useGetDefaultImages } from '../../../hooks';
import { AuthStackParamList } from '../../../navigation/type';
import { StepHandle } from '../types/auth.types';
import { SIGNUP_SCREENS, SignupStep } from '../constants/signupConstants';
import { authRoutes } from '../../../constants/appConstants';
import { CompleteRegistrationRequest, OtpVerifyRequest, RegisterRequest} from '../../../api/dto/auth.dto';
import { TokenManager } from '../../../services/tokenManager/tokenManager';
import { getDeviceId } from '../../../utilites/helper/deviceInfo';

type SignupRouteProp = RouteProp<AuthStackParamList, typeof authRoutes.signup>;
type SignupNavigationProp = NativeStackNavigationProp<AuthStackParamList, typeof authRoutes.signup>;

export const useSignupFlow = () => {
  const navigation = useNavigation<SignupNavigationProp>();
  const route = useRoute<SignupRouteProp>();
  const signupType = route.params?.signupType;

  const [step, setStep] = useState<number>(0);
  const [tab, setTab] = useState<number>(0);
  const [userId, setUserId] = useState<string>('');
  const [pickedImage, setPickedImage] = useState<PickedImage | undefined>(undefined);
  const [otpMethod, setOtpMethod] = useState<string>('');

  const stepRef = useRef<StepHandle<any>>(null);
  const flow = SIGNUP_SCREENS[signupType];
  const currentStep = flow[step];

  const { open, close } = useAppBottomSheet();
  const { pickImage } = useImagePicker();
  const { showToast } = useToast();

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

  const { data: defaultImages } = useGetDefaultImages();

  const isLoading = isRegisterLoading || isVerifyOtpLoading || isCreateAccountLoading;

  // Initialize with random default image
  useEffect(() => {
    if (!pickedImage && ((defaultImages?.data?.length ?? 0) > 0)) {
      const randomImage = defaultImages?.data[Math.floor(Math.random() * defaultImages?.data.length)];
      setPickedImage({ id: randomImage?.id ?? '', type: 'default' });
    }
  }, [defaultImages, pickedImage]);

  const handleDefaultImagePress = (id: string) => {
    setPickedImage({ type: 'default', id: id });
    close();
  };

  const handleImagePick = async (type: ImagePickerType) => {
    const image = await pickImage(type);
    setPickedImage({ type: 'uri', uri: image?.path });
    close();
  };

  const openImagePickerSheet = (ImagePickerSheetComponent: React.ReactNode) => {
    open({
      title: 'Select Image',
      content: ImagePickerSheetComponent,
    });
  };

  const handleCredentialSubmit = async (result: any) => {
    const identifier = tab === 0 ? result.email : result.phone;
    setOtpMethod(identifier);

    const request: RegisterRequest = {
      type: tab === 0 ? 'email' : 'phone',
      identifier: identifier,
      password: tab === 0 ? result.password : undefined,
    };

    const response = await registerMutation(request);

    if (response.success) {
      setUserId(response.data.user_id ?? '');
      setStep(step + 2);
    }

    return response;
  };

  const handleOtpVerification = async (result: any) => {
    const verifyOtpRequest: OtpVerifyRequest = {
      otpCode: result.otp,
      purpose: tab === 0 ? 'register_email' : 'register_phone',
      userId: userId,
    };

    const response = await verifyOtpMutation(verifyOtpRequest);

    if (response.success) {
      TokenManager.saveAccessToken(response.data.access_token);
      setStep(step + 1);
    }

    return response;
  };

  const handleProfileCompletion = async (result: any) => {
    if (!pickedImage || (pickedImage.type === 'uri' && !pickedImage.uri)) {
      showToast({
        message: 'Please select a profile image',
        type: 'error',
      });
      throw new Error('No image selected');
    }

    const deviceId = await getDeviceId();

    const completeRequest: CompleteRegistrationRequest = {
      dateOfBirth: result.dateOfBirth,
      deviceId,
      fullName: result.fullName,
      gender: result.gender,
      imageType: pickedImage.type === 'default' ? 'default' : 'uploaded',
      ...(pickedImage.type === 'default'
        ? { imageId: pickedImage.id }
        : { profileImage: pickedImage.uri }),
    };

    const response = await completeRegistrationMutation(completeRequest);
    return response;
  };

  const handleContinue = async () => {
    const result = await stepRef.current?.validate();
    if (!result) return;

    try {
      let response;

      switch (currentStep) {
        case SignupStep.Credential:
          response = await handleCredentialSubmit(result);
          break;

        case SignupStep.Verification:
          response = await handleOtpVerification(result);
          break;

        case SignupStep.UserInfo:
          response = await handleProfileCompletion(result);
          break;
      }

      if (response?.success) {
        showToast({
          message: response.message,
          type: 'success',
        });
      } else if (response) {
        showToast({
          message: response.message,
          type: 'error',
        });
      }
    } catch (error) {
      console.log(error);
      showToast({
        message: 'Something went wrong',
        type: 'error',
      });
    }
  };

  const handleLoginPress = () => {
    navigation.replace('login');
  };

  return {
    // State
    step,
    tab,
    currentStep,
    pickedImage,
    otpMethod,
    isLoading,
    stepRef,
    defaultImages,

    // Handlers
    setTab,
    handleContinue,
    handleLoginPress,
    openImagePickerSheet,
    handleDefaultImagePress,
    handleImagePick,
  };
};
