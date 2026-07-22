import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../../constants/theme';
import { RESEND_TIME } from '../../../constants/appConstants';
import { formatTime } from '../../../utilites/helper/dateConverter';

type props = {
    resendpress: () => void
}
const ResendOtp = ({ resendpress }: props) => {
    const [seconds, setSeconds] = useState(0);

    const { palletteColors, typography, scale } = useTheme()

    useEffect(() => {
        if (seconds === 0) return;

        const interval = setInterval(() => {
            setSeconds(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);
    

    const onResendPress = () => {
        resendpress()
        setSeconds(RESEND_TIME);
    }

    return (
        <View style={{flexDirection: 'row',gap: scale.sm_8,justifyContent: 'center',paddingTop: scale.ms_12}}>
            <Text style={typography.subtitle}>
                Didn't receive the code?
            </Text>

            {seconds > 0 ? (
                <Text style={[typography.subtitle, { color: palletteColors.appPrimary }]}>
                    Resend in {formatTime(seconds)}
                </Text>
            ) : (
                <TouchableOpacity onPress={onResendPress}>
                    <Text style={[typography.subtitle, { color: palletteColors.appPrimary }]}>
                        Resend OTP
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default ResendOtp