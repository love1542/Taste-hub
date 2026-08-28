import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Home, MapPin, Phone, Briefcase, MoreVertical, Check } from 'lucide-react-native';
import { DeliveryAddress } from '../types/adress.type';
import { LayoutScaleType, palleteColorsType, useTheme } from '../../../constants/theme';
import IconButton from '../../../components/IconButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../../navigation/type';
import { appRoutes } from '../../../constants/appConstants';
import { useNavigation } from '@react-navigation/native';


type AddressCellProps = {
    address: DeliveryAddress;
    onPress?: () => void;
    onMorePress?: () => void;
}

const AddressCell = ({
    address,
    onPress,
    onMorePress,
}: AddressCellProps) => {
    const { palletteColors, scale, typography } = useTheme();
    const styles = cellStyle(scale, palletteColors)

    const getLabelIcon = () => {
        switch (address.label) {
            case 'home':
                return Home;
            case 'work':
                return Briefcase;
            default:
                return MapPin;
        }
    };

    const LabelIcon = getLabelIcon();

    return (
        <Pressable
            onPress={onPress}
            style={[typography.shadowCard, { borderColor: address.isDefault ? palletteColors.green : palletteColors.appFFE4D5 }]}>
            {/* Header */}
            <View style={styles.header}>

                <View style={typography.rowCenter}>
                    <IconButton
                        backgroundColor={palletteColors.appPrimary}
                        icon={LabelIcon}
                        iconSize={20}
                        size={36}
                        borderRadius={10}
                    />

                    <View style={{ gap: 2 }}>
                        <Text style={[typography.mdTitle, { color: palletteColors.black, textTransform: 'capitalize' }]}>
                            {address.label}
                        </Text>
                        <Text style={[typography.subtitle]}>
                            {address.receiverName} {address.receiverPhone}
                        </Text>
                    </View>
                </View>

                {
                    onMorePress &&
                    <Pressable
                        onPress={onMorePress}
                        hitSlop={10}
                    >
                        <MoreVertical
                            size={20}
                            color={palletteColors.black}
                        />
                    </Pressable>
                }

            </View>

            {/* Address */}
            <View style={styles.row}>
                <MapPin
                    size={16}
                    color={palletteColors.appPrimary}
                    strokeWidth={2}
                />

                <Text style={[styles.address, { color: palletteColors.black }]} numberOfLines={2} >
                    {address.addressLine}
                    {address.area ? `, ${address.area}` : ''}
                    {address.landmark ? `, ${address.landmark}` : ''}
                    {`, ${address.city}, ${address.state}`}
                    {address.postalCode ? ` - ${address.postalCode}` : ''}
                </Text>
            </View>

        </Pressable>
    );
};

export default AddressCell;

const cellStyle = (scale: LayoutScaleType, color: palleteColorsType) => {
    return StyleSheet.create({
        container: {
            borderWidth: 1,
            borderRadius: 16,
            padding: 16,
            marginBottom: 12,
        },

        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 14,
        },

        defaultBadge: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 20,
        },

        row: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginTop: 6,
        },

        address: {
            flex: 1,
            fontSize: 13,
            lineHeight: 19,
        }

    });
}

