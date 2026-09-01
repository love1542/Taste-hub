import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { MapPin, Navigation, Plus, ChevronRight } from 'lucide-react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useTheme } from '../../../constants/theme';
import { useGetAddress } from '../../adresses/hooks/querryHooks';
import { useSetDefaultAddress } from '../../adresses/hooks/mutationHooks';
import AddressCell from '../../adresses/components/AddressCell';
import { DeliveryAddress } from '../../adresses/types/adress.type';
import { useLocation } from '../../../hooks/useLocation';
import AppButton from '../../../components/AppButton';
import { LayoutScaleType, palleteColorsType, TypographyType } from '../../../constants/theme';

type LocationPickerSheetProps = {
    onClose: () => void;
    onAddNew: () => void;
    onSelectAddress: (label: string, addressLine: string) => void;
    onSelectCurrentLocation: () => void;
};

const LocationPickerSheet = ({ onClose, onAddNew, onSelectAddress, onSelectCurrentLocation }: LocationPickerSheetProps) => {
    const { palletteColors, scale, typography } = useTheme();
    const styles = sheetStyles(palletteColors, scale, typography);

    const { data, isLoading } = useGetAddress();
    const { mutate: setDefault, isPending } = useSetDefaultAddress();
    const { currentLocation, refreshCurrentLocation, hasLocationPermission, requestPermission } = useLocation();
    const [isFetchingCurrent, setIsFetchingCurrent] = useState(false);

    const addresses: DeliveryAddress[] = data?.data ?? [];

    const handleSelectSaved = (address: DeliveryAddress) => {
        if (address.isDefault) {
            onSelectAddress(address.label, address.addressLine);
            onClose();
            return;
        }
        setDefault(address.id, {
            onSuccess: () => {
                onSelectAddress(address.label, address.addressLine);
                onClose();
            },
        });
    };

    const handleUseCurrentLocation = async () => {
        setIsFetchingCurrent(true);
        try {
            if (!hasLocationPermission) {
                const granted = await requestPermission();
                if (!granted) return;
            }
            await refreshCurrentLocation();
            onSelectCurrentLocation();
            onClose();
        } finally {
            setIsFetchingCurrent(false);
        }
    };

    const handleAddNew = () => {
        onClose();
        onAddNew();
    };

    return (
        <View style={styles.container}>
            {/* Sheet header */}
            <View style={styles.header}>
                <View style={styles.headerIconWrap}>
                    <Navigation size={18} color={palletteColors.appPrimary} strokeWidth={2} />
                </View>
                <View>
                    <Text style={[typography.mdTitle, { color: palletteColors.app262626 }]}>Delivery Location</Text>
                    <Text style={[typography.subtitle]}>Choose where you want your order delivered</Text>
                </View>
            </View>

            <BottomSheetScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

                {/* Use current location */}
                <AppButton
                    onPress={handleUseCurrentLocation}
                    disabled={isFetchingCurrent}
                    colors={[palletteColors.appFFE4D5, palletteColors.appFFE4D5]}
                    leftIcon={
                        isFetchingCurrent
                            ? <ActivityIndicator size={18} color={palletteColors.appPrimary} />
                            : <Navigation size={18} color={palletteColors.appPrimary} strokeWidth={2} />
                    }
                    rightIcon={
                        <ChevronRight size={18} color={palletteColors.appPrimary} strokeWidth={2.5} />
                    }
                    text={'Tap to use your current location'}
                    textStyle={[typography.subtitle, styles.currentBtnText]}
                    style={styles.currentBtn}
                />

                {/* Divider with label */}
                <View style={styles.dividerRow}>
                    <View style={styles.dividerLine} />
                    <Text style={[typography.subtitle, styles.dividerLabel, {fontSize: 12}]}>Saved addresses</Text>
                    <View style={styles.dividerLine} />
                </View>

                {/* Saved addresses */}
                {isLoading ? (
                    <View style={styles.loadingWrap}>
                        <ActivityIndicator color={palletteColors.appPrimary} />
                    </View>
                ) : addresses.length === 0 ? (
                    <View style={styles.emptyWrap}>
                        <MapPin size={28} color={palletteColors.appD4D4D4} strokeWidth={1.5} />
                        <Text style={[typography.subtitle]}>No saved addresses</Text>
                    </View>
                ) : (
                    addresses.map((address) => (
                        <AddressCell
                            key={address.id}
                            address={address}
                            onPress={() => handleSelectSaved(address)}
                        />
                    ))
                )}

                {/* Add new address */}
                <AppButton
                    onPress={handleAddNew}
                    colors={[palletteColors.appPrimary, palletteColors.appPrimary2]}
                    leftIcon={<Plus size={18} color={'white'} strokeWidth={2.5} />}
                    text="Add new address"
                    style={styles.addBtn}
                    textStyle={[typography.title, { color: palletteColors.white }]}
                />

            </BottomSheetScrollView>

            {/* Full-screen pending overlay */}
            {isPending && (
                <View style={StyleSheet.absoluteFill}>
                    <View style={styles.pendingOverlay}>
                        <ActivityIndicator color={palletteColors.appPrimary} />
                    </View>
                </View>
            )}
        </View>
    );
};

export default LocationPickerSheet;

const sheetStyles = (color: palleteColorsType, scale: LayoutScaleType, typography: TypographyType) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },

        scroll: {
            paddingBottom: scale.xl_32,
        },

        // Sheet header
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale.ms_12,
            marginBottom: scale.ml_20,
        },

        headerIconWrap: {
            width: scale.controlMD_44,
            height: scale.controlMD_44,
            borderRadius: scale.md_16,
            backgroundColor: color.appFFE4D5,
            justifyContent: 'center',
            alignItems: 'center',
        },

        // Current location button
        currentBtn: {
            justifyContent: 'flex-start',
            borderRadius: scale.md_16,
            marginBottom: scale.ml_20,
            paddingHorizontal: scale.ms_12,
        },

        currentBtnText: {
            flex: 1,
            textAlign: 'left',
        },

        // Divider
        dividerRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale.ms_12,
            marginBottom: scale.md_16,
        },

        dividerLine: {
            flex: 1,
            height: 1,
            backgroundColor: color.appD4D4D4,
        },

        dividerLabel: {
            letterSpacing: 0.4,
            textTransform: 'uppercase',
        },

        // States
        loadingWrap: {
            paddingVertical: scale.xl_32,
            alignItems: 'center',
        },

        emptyWrap: {
            paddingVertical: scale.lg_24,
            alignItems: 'center',
            gap: scale.sm_8,
        },

        // Add new button
        addBtn: {
            marginTop: scale.sm_8,
            borderRadius: scale.md_16,
        },

        // Pending overlay
        pendingOverlay: {
            flex: 1,
            backgroundColor: color.white,
            opacity: 0.6,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
