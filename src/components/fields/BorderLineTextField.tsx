import { View, Text, StyleSheet, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { LayoutScaleType, palleteColorsType, useTheme } from '../../constants/theme'
import { Apple } from 'lucide-react-native'

export type BorderLineTextFieldsProps = {
    value: string,
    title: string,
    onChangeText: (text: string) => void,
    leftIcon?: React.ReactNode,
    isSecureField?: boolean,
    onFocus?: () => void,
    onBlur?: () => void,
    errorMessage?: string
}

const BorderLineTextField = ({
    value,
    title,
    onChangeText,
    leftIcon,
    isSecureField = false,
    onBlur,
    onFocus,
    errorMessage
}: BorderLineTextFieldsProps) => {
    const { palletteColors, typography, scale } = useTheme()
    const [secure, setSecure] = useState<boolean>(isSecureField)
    const [isFocused, setIsFocused] = useState<boolean>()
    const styles = BorderLineTextFieldStyles(palletteColors, scale)

    const onSecureTap = () => {
        setSecure(!secure)
    }

    return (
        <View style={styles.container}>
            <Text style={[typography.subtitle, styles.title, isFocused ? { color: palletteColors.appPrimary } : { color: palletteColors.app737373 }]}>
                {title}
            </Text>
            <View style={styles.textFieldContiner}>

                {leftIcon && (
                    <>
                        {leftIcon}
                    </>
                )}
                <TextInput
                    value={value}
                    style={[styles.textField, typography.textField]}
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
                />

                {isSecureField && (
                    <TouchableOpacity onPress={onSecureTap}>
                        <Text style={styles.rightText}>
                            {secure ? 'SHOW' : 'HIDE'}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={isFocused ? typography.focusFiledBorder : typography.borderLine} />

            {errorMessage && <Text style={styles.error}>Error</Text>}
        </View>
    )
}

export default BorderLineTextField

const BorderLineTextFieldStyles = (color: palleteColorsType, scale: LayoutScaleType) => {
    return StyleSheet.create({
        container: {
            width: '100%'
        },
        title: {
            fontWeight: '400',
            textTransform: 'uppercase'
        },
        textFieldContiner: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        textField: {
            flex: 1,
            paddingHorizontal: scale.ms_12,
            paddingVertical: scale.sm_8
        },
        error: {
            paddingTop: scale.sm_8,
            color: color.appPrimary,
            fontWeight: '500'
        },
        rightText: {
            color: color.appPrimary,
            fontWeight: '600'
        }
    })
}