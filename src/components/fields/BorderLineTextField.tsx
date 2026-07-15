import { View, Text, StyleSheet, TextInput, Touchable, TouchableOpacity, StyleProp, TextStyle, KeyboardTypeOptions, TextInputKeyPressEvent, ViewStyle } from 'react-native'
import React, { forwardRef, useState } from 'react'
import { LayoutScaleType, palleteColorsType, useTheme } from '../../constants/theme'
import { Apple } from 'lucide-react-native'

export type BorderLineTextFieldsProps = {
    value: string,
    title: string,
    placeholder: string,
    onChangeText: (text: string) => void,
    leftIcon?: React.ReactNode,
    isSecureField?: boolean,
    onFocus?: () => void,
    onBlur?: () => void,
    errorMessage?: string,
    textStyles?: StyleProp<TextStyle>
    borderSyles?: StyleProp<ViewStyle>
    fixedLength?: number | undefined
    keyboardType?: KeyboardTypeOptions | undefined
    onKeyPress?: (e: TextInputKeyPressEvent) => void
}

const BorderLineTextField = forwardRef<TextInput, BorderLineTextFieldsProps>(({
    value,
    title,
    placeholder,
    onChangeText,
    leftIcon,
    isSecureField = false,
    onBlur,
    onFocus,
    errorMessage,
    textStyles,
    borderSyles,
    fixedLength = undefined,
    keyboardType = 'default',
    onKeyPress
}, ref) => {
    const { palletteColors, typography, scale } = useTheme()
    const [secure, setSecure] = useState<boolean>(isSecureField)
    const [isFocused, setIsFocused] = useState<boolean>()
    const styles = BorderLineTextFieldStyles(palletteColors, scale)

    const onSecureTap = () => {
        setSecure(!secure)
    }

    return (
        <View style={styles.container}>
            <Text style={[typography.subtitle, styles.title]}>
                {title}
            </Text>
            <View style={styles.textFieldContiner}>

                {leftIcon && (
                    <>
                        {leftIcon}
                    </>
                )}
                <TextInput
                    ref={ref}
                    value={value}
                    placeholder={placeholder}
                    style={[styles.textField, textStyles]}
                    secureTextEntry={secure}
                    onChangeText={onChangeText}
                    onFocus={() => {
                        setIsFocused(true);
                        if (onFocus) onFocus();
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                        if (onBlur) onBlur();
                    }}
                    maxLength={fixedLength}
                    onKeyPress={onKeyPress}
                    keyboardType={keyboardType}
                />

                {isSecureField && (
                    <TouchableOpacity onPress={onSecureTap}>
                        <Text style={styles.rightText}>
                            {secure ? 'SHOW' : 'HIDE'}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={[isFocused ? typography.focusFiledBorder : typography.borderLine, borderSyles]} />

            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
    )
})

export default BorderLineTextField

const BorderLineTextFieldStyles = (color: palleteColorsType, scale: LayoutScaleType) => {
    return StyleSheet.create({
        container: {
            width: '100%'
        },
        title: {
            fontWeight: '400',
            textTransform: 'capitalize',
            color: color.appPrimary
        },
        textFieldContiner: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        textField: {
            flex: 1,
            paddingHorizontal: scale.ms_12,
            paddingVertical: scale.xl_18,
            fontSize: scale.md_16,
            fontWeight: '400'
        },
        error: {
            paddingTop: scale.sm_8,
            color: color.appPrimary,
            fontWeight: '500'
        },
        rightText: {
            color: color.appPrimary,
            fontWeight: '500'
        }
    })
}