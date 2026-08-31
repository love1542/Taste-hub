import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
    Home,
    MapPin,
    Briefcase,
    MoreVertical,
    BadgeCheck,
} from 'lucide-react-native';
import { DeliveryAddress } from '../types/adress.type';
import { LayoutScaleType, palleteColorsType, useTheme } from '../../../constants/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../../navigation/type';
import { appRoutes } from '../../../constants/appConstants';
import { useNavigation } from '@react-navigation/native';

type AddressCellProps = {
    address: DeliveryAddress;
    onPress?: () => void;
    onMorePress?: () => void;
};

const AddressCell = ({ address, onPress, onMorePress }: AddressCellProps) => {
    const { palletteColors, scale, typography } = useTheme();
    const styles = cellStyle(scale, palletteColors);

    const getLabelConfig = (): { icon: typeof Home; color: string; bg: string } => {
        switch (address.label) {
            case 'home':
                return {
                    icon: Home,
                    color: palletteColors.appPrimary,
                    bg: palletteColors.appFFE4D5,
                };
            case 'work':
                return {
                    icon: Briefcase,
                    color: '#6366F1',
                    bg: '#EEF2FF',
                };
            default:
                return {
                    icon: MapPin,
                    color: palletteColors.app737373,
                    bg: '#F5F5F5',
                };
        }
    };

    const { icon: LabelIcon, color: iconColor, bg: iconBg } = getLabelConfig();

    const fullAddress = [
        address.addressLine,
        address.area,
        address.landmark,
        `${address.city}, ${address.state}`,
        address.postalCode ? `- ${address.postalCode}` : undefined,
    ]
        .filter(Boolean)
        .join(', ');

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.card,
                address.isDefault && styles.cardDefault,
                pressed && styles.cardPressed,
            ]}
        >
            {/* Header row */}
            <View style={styles.header}>
                {/* Icon + label */}
                <View style={styles.labelGroup}>
                    <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
                        <LabelIcon size={18} color={iconColor} strokeWidth={2} />
                    </View>
                    <View style={styles.labelText}>
                        <View style={styles.titleRow}>
                            <Text style={styles.labelTitle} numberOfLines={1}>
                                {address.label.charAt(0).toUpperCase() + address.label.slice(1)}
                            </Text>
                            {address.isDefault && (
                                <BadgeCheck size={16} color={palletteColors.green} strokeWidth={2} />
                            )}
                        </View>
                        <Text style={styles.receiverInfo} numberOfLines={1}>
                            {address.receiverName} · {address.receiverPhone}
                        </Text>
                    </View>
                </View>

                {/* More button */}
                {onMorePress && (
                    <Pressable
                        onPress={onMorePress}
                        hitSlop={12}
                        style={({ pressed }) => [
                            styles.moreBtn,
                            pressed && styles.moreBtnPressed,
                        ]}
                    >
                        <MoreVertical size={18} color={palletteColors.app737373} strokeWidth={2} />
                    </Pressable>
                )}
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Address row */}
            <View style={styles.addressRow}>
                <View style={styles.pinWrap}>
                    <MapPin size={14} color={palletteColors.appPrimary} strokeWidth={2.5} />
                </View>
                <Text style={styles.addressText} numberOfLines={2}>
                    {fullAddress}
                </Text>
            </View>
        </Pressable>
    );
};

export default AddressCell;

const cellStyle = (scale: LayoutScaleType, color: palleteColorsType) =>
    StyleSheet.create({
        card: {
            backgroundColor: color.white,
            borderRadius: 20,
            borderWidth: 1.5,
            borderColor: '#F0F0F0',
            padding: 16,
            marginBottom: 12,

            // iOS
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 10,
            // Android
            elevation: 3,
        },

        cardDefault: {
            borderColor: color.green,
            shadowColor: color.green,
            shadowOpacity: 0.12,
        },

        cardPressed: {
            opacity: 0.92,
            transform: [{ scale: 0.99 }],
        },

        defaultBadge: {
            // removed — badge is now inline with the title
        },

        defaultBadgeText: {
            // removed — badge is now inline with the title
        },

        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },

        labelGroup: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            flex: 1,
        },

        iconWrap: {
            width: 42,
            height: 42,
            borderRadius: 13,
            justifyContent: 'center',
            alignItems: 'center',
        },

        labelText: {
            flex: 1,
            gap: 2,
        },

        titleRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
        },

        labelTitle: {
            fontSize: 15,
            fontFamily: 'Inter-Bold',
            color: color.app262626,
            letterSpacing: 0.1,
        },

        receiverInfo: {
            fontSize: 12,
            fontFamily: 'Inter-Regular',
            color: color.app737373,
        },

        moreBtn: {
            width: 32,
            height: 32,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 8,
        },

        moreBtnPressed: {
            backgroundColor: '#F5F5F5',
        },

        divider: {
            height: 1,
            backgroundColor: '#F5F5F5',
            marginVertical: 14,
        },

        addressRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 8,
        },

        pinWrap: {
            marginTop: 1,
        },

        addressText: {
            flex: 1,
            fontSize: 13,
            fontFamily: 'Inter-Regular',
            color: color.app525252,
            lineHeight: 20,
        },
    });
