import { View, Keyboard, TouchableWithoutFeedback, ScrollView, Text, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePickerSheet from '../../../../components/imagePicker/ImagePickerSheet';
import { ImagePickerType } from '../../../../components/imagePicker/useImagePicker';
import AppButton from '../../../../components/AppButton';
import PagingIndicator from '../../../../components/pagingIndicator/PagingIndicator';
import SignupProfile from './components/SignupProfile';
import VerifyOtp from './components/VerifyOtp';
import { useSignupFlow } from '../../hooks';
import { signupStyles } from '../../styles';
import { useTheme } from '../../../../constants/theme';
import SignupWithEmail from './components/SignupWithEmail';
import SignupWithPhone from './components/SignupWithPhone';
import SegmentControler from '../../../../components/segmentControler/SegmentControler';
import { SignupStep } from '../../constants/signupConstants';

const Signup = () => {
  const { palletteColors, scale } = useTheme();
  const styles = signupStyles(palletteColors, scale);

  const {
    step,
    tab,
    currentStep,
    pickedImage,
    otpMethod,
    isLoading,
    stepRef,
    setTab,
    handleContinue,
    handleLoginPress,
    openImagePickerSheet,
    handleDefaultImagePress,
    handleImagePick,
  } = useSignupFlow();

  const handleCameraPress = () => {
    openImagePickerSheet(
      <ImagePickerSheet
        onCameraPress={() => handleImagePick(ImagePickerType.Camera)}
        onGalleryPress={() => handleImagePick(ImagePickerType.Gallery)}
        defaultIconPress={handleDefaultImagePress}
      />
    );
  };

  const renderCredentialStep = () => (
    <View style={{ gap: scale.xl_18 }}>
      <SegmentControler segments={['Email', 'Phone']} onChange={setTab} selectedIndex={tab} />
      {tab === 0 ? <SignupWithEmail ref={stepRef} /> : <SignupWithPhone ref={stepRef} />}
    </View>
  );

  const renderScreen = () => {
    switch (currentStep) {
      case SignupStep.Credential:
        return renderCredentialStep();

      case SignupStep.Verification:
        return <VerifyOtp ref={stepRef} destination={otpMethod} resendPress={() => {}} />;

      case SignupStep.UserInfo:
        return <SignupProfile ref={stepRef} img={pickedImage} onCameraPress={handleCameraPress} />;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Image source={require('../../../../../assets/icons/burger.png')} style={styles.bgIcon} />
        
        <View style={{ width: '80%', alignSelf: 'flex-end' }}>
          <PagingIndicator totalPages={3} currentPageIndex={step} long={true} />
        </View>

        <View style={styles.contentWrapper}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {renderScreen()}
          </ScrollView>
        </View>

        <View style={styles.continueButtonWrapper}>
          {step === 0 && (
            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Already have an account</Text>
              <TouchableWithoutFeedback onPress={handleLoginPress}>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableWithoutFeedback>
            </View>
          )}
          <AppButton
            text={isLoading ? 'Loading...' : 'Continue'}
            colors={['#FF6B35', '#FF6B35']}
            onPress={handleContinue}
            disabled={isLoading}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;
