import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { ChevronRight, ChevronRightIcon, LucideIcon } from 'lucide-react-native'
import IconButton from '../../../components/IconButton';
import { useTheme } from '../../../constants/theme';

type CellProps = {
    icon: LucideIcon;
    title: string;
    value?: string;
    onpress?: () => void;
}

const AccountInfoCell = ({ icon, title, value, onpress }: CellProps) => {
    const { palletteColors, typography, scale } = useTheme()
    const Icon = icon

    const isAction = !!onpress;

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onpress}
            disabled={!isAction}
            style={[styles.container, {paddingVertical: scale.sm_8,gap: scale.ms_12,}]}>
            {/* Icon */}
            <IconButton
                icon={Icon}
                iconSize={20}
                iconColor={palletteColors.white}
                backgroundColor={palletteColors.appPrimary}
                size={40}
            />

            {/* Content */}
            <View style={[ styles.content, { gap: value ? scale.xs_4 : 0 } ]} >
                <Text style={typography.title} numberOfLines={1} >
                    {title}
                </Text>

                {value && (
                    <Text style={[typography.subtitle,]} numberOfLines={1}>
                        {value}
                    </Text>
                )}
            </View>

            {/* Action */}
            {isAction && (
                <ChevronRight
                    size={scale.ml_20}
                    strokeWidth={2}
                />
            )}
        </TouchableOpacity>
    );
};

export default AccountInfoCell;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    content: {
        flex: 1,
        justifyContent: 'center',
    },
});
