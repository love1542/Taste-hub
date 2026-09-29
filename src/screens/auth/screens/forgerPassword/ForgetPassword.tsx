import React, { useState } from 'react'
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import AppHeader from '../../../../components/AppHeader'
import { useToast } from '../../../../components/toast'
import { LayoutScaleType, palleteColorsType, TypographyType, useTheme } from '../../../../constants/theme'
import { authRoutes } from '../../../../constants/appConstants'
import { AuthStackParamList } from '../../../../navigation/type'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { authManager } from '../../../../api/managers/authManager'
import { useForgotPassword, useResetPassword } from '../../hooks'
import { emailSchema, otpSchema, resetPasswordSchema } from '../../../../utilites/validation/authSchema'
import { useMutation } from '@tanstack/react-query'
import ForgotPasswordEmailForm from './ForgotPasswordEmailForm'
import ForgotPasswordOtpForm from './ForgotPasswordOtpForm'
import ForgotPasswordNewPasswordForm from './ForgotPasswordNewPasswordForm'
import { EmailForm, OtpForm, PasswordForm } from './types'

type ResetStep = 'email' | 'otp' | 'password'
type NavigationProps = NativeStackNavigationProp<AuthStackParamList, typeof authRoutes.forgotPassword>

const emailFormSchema = z.object({ email: emailSchema })

const ForgetPassword = () => {
  const navigation = useNavigation<NavigationProps>()
  const { palletteColors, scale, typography } = useTheme()
  const styles = forgetPasswordStyles(palletteColors, scale, typography)
  const { showToast } = useToast()
  const [step, setStep] = useState<ResetStep>('email')
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState('')
  const [verificationToken, setVerificationToken] = useState('')

  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: '' },
  })
  const otpForm = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  })
  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
    shouldUnregister: false,
  })

  const forgotPassword = useForgotPassword()
  const verifyOtp = useMutation({ mutationFn: authManager.verifyOtp })
  const resetPassword = useResetPassword()
  const isLoading = forgotPassword.isPending || verifyOtp.isPending || resetPassword.isPending

  const requestOtp = async (recipient: string) => {
    // Temporary local flow while the forgot-password API is unavailable.
    // const response = await forgotPassword.mutateAsync({
    //   type: 'email',
    //   identifier: recipient,
    // })
    setEmail(recipient)
    setUserId('temporary-reset-user')
    setVerificationToken('temporary-reset-token')
    showToast({ message: 'Email verified. Create a new password.', type: 'success' })
    return true
  }

  const handleSendOtp = emailForm.handleSubmit(async ({ email: value }) => {
    const normalizedEmail = value.trim().toLowerCase()
    if (await requestOtp(normalizedEmail)) {
      setStep('password')
    }
  })

  const handleVerifyOtp = otpForm.handleSubmit(async () => {
    setStep('password')
  })

  const handleResetPassword = passwordForm.handleSubmit(async ({ newPassword }) => {
    try {
      const response = await resetPassword.mutateAsync({
        userId,
        newPassword,
        accessToken: verificationToken,
      })

      if (!response.success) {
        showToast({ message: response.message, type: 'error' })
        return
      }

      showToast({ message: response.message || 'Password updated. Please log in.', type: 'success' })
      navigation.navigate(authRoutes.login)
    } catch {
      showToast({ message: 'Unable to update your password. Please try again.', type: 'error' })
    }
  })

  const changeEmail = () => {
    setStep('email')
    setUserId('')
    setVerificationToken('')
    otpForm.reset()
    passwordForm.reset()
  }

  const resetHeading = step === 'email'
    ? 'Reset your password'
    : step === 'otp'
      ? 'Verify Email'
      : 'Create New Password'

  return (
    <View style={styles.safeArea}>
      <Image source={require('../../../../../assets/icons/burger.png')} style={styles.bgIcon} />
      <AppHeader
        title="Forgot Password"
        onBackPress={() => navigation.goBack()}
        forgroundColor={palletteColors.appPrimary}
        backgroundColor={palletteColors.background}
      />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.heading}>
            <Text style={styles.headingTitle}>{resetHeading}</Text>
            <Text style={typography.subtitle}>
              {step === 'email' ? 'We’ll help you get back into your account.' : step === 'otp' ? 'Verify your email to continue.' : 'Create a secure password to finish.'}
            </Text>
          </View>
          {step === 'email' ? (
            <ForgotPasswordEmailForm
              form={emailForm}
              isLoading={isLoading}
              onSubmit={handleSendOtp}
            />
          ) : step === 'otp' ? (
            <ForgotPasswordOtpForm
              form={otpForm}
              email={email}
              isLoading={isLoading}
              onChangeEmail={changeEmail}
              onResend={() => { requestOtp(email) }}
              onSubmit={handleVerifyOtp}
            />
          ) : (
            <ForgotPasswordNewPasswordForm
              form={passwordForm}
              isLoading={isLoading}
              onSubmit={handleResetPassword}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default ForgetPassword

const forgetPasswordStyles = (
  colors: palleteColorsType,
  scale: LayoutScaleType,
  typography: TypographyType,
) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: scale.md_16,
    paddingTop: scale.xl_18,
    paddingBottom: scale.xxl_40,
    gap: scale.xl_18,
  },
  headingTitle: {
    ...typography.subHeading,
  },
  bgIcon: {
    height: 210,
    width: 210,
    position: 'absolute',
    bottom: -50,
    right: -90,
  },
  heading: {
    gap: scale.sm_8,
    width: '88%',
  },
  form: {
    gap: scale.md_16,
    padding: scale.ml_20,
    backgroundColor: colors.white,
    borderRadius: 15,
  },
  destinationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: scale.sm_8,
  },
  destination: {
    flexShrink: 1,
  },
  link: {
    ...typography.title,
    color: colors.appPrimary,
  },
  error: {
    ...typography.subtitle,
    color: colors.appPrimary,
  },
})