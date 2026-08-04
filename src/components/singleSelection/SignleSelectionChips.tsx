import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LayoutScaleType, palleteColorsType, useTheme } from '../../constants/theme'
import { LucideIcon } from 'lucide-react-native'

export interface SelectionItem<T extends string = string> {
    id: T,
    label: string,
    icon?: LucideIcon,
    img?: string,
    onSelect?: () => void
}

interface SingleSelectionChipsProps<T extends string = string> {
    configs: readonly SelectionItem<T>[];
    defaultSelectedId?: T;
    title?: string;
    selectedValue?: T;
    onSelectionChange?: (value: T | undefined) => void;
    errorMessage?: string;
    scrolling?: boolean;
}

const SingleSelectionChips = <T extends string = string>({
    configs,
    defaultSelectedId,
    title,
    selectedValue,
    onSelectionChange,
    errorMessage,
    scrolling = true
}: SingleSelectionChipsProps<T>) => {
    const [internalSelected, setInternalSelected] = useState<T | undefined>(defaultSelectedId)

    const { typography, palletteColors, scale } = useTheme()
    const styles = signleSelectionChipsStyles(palletteColors, scale)
    const selected = selectedValue ?? internalSelected

    useEffect(() => {
        if (selectedValue !== undefined) {
            setInternalSelected(selectedValue)
        }
    }, [selectedValue])

    const onPressChip = (item: SelectionItem<T>) => {
        const nextValue = item.id === selected ? undefined : item.id

        if (selectedValue === undefined) {
            setInternalSelected(nextValue)
        }

        onSelectionChange?.(nextValue)

        if (item.onSelect) {
            item.onSelect()
        }
    }

    return (
        <View style={styles.contianer}>
            { title && <Text style={[typography.subtitle, styles.title]}>
                {title}
            </Text>}
            <FlatList
                data={configs}
                horizontal
                scrollEnabled={scrolling}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    const slectedChip: boolean = item.id === selected
                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.chip, slectedChip && styles.SelectedChip]}
                            onPress={() => onPressChip(item)}
                        >
                            <View style={styles.chipRow}>
                                {item.img && (
                                    <Image
                                        source={{ uri: item.img }}
                                        style={styles.chipImage}
                                        resizeMode="contain"
                                    />
                                )}
                                {item.icon && <item.icon size={20} color={slectedChip ? palletteColors.appPrimary : palletteColors.black}/>}
                                <Text style={[typography.subtitle, { fontWeight: '400' }]}>{item.label}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }} />

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        </View>
    )
}

export default SingleSelectionChips

const signleSelectionChipsStyles = (color: palleteColorsType, scale: LayoutScaleType) => {
    return StyleSheet.create({
        contianer: {
            width: '100%',
            gap: scale.ms_12
        },
        title: {
            fontWeight: '400',
            textTransform: 'capitalize',
            color: color.black
        },
        chip: {
            borderWidth: 1,
            borderColor: color.app737373,
            borderRadius: 50,
            paddingHorizontal: scale.ms_12,
            paddingVertical: scale.xs_4,
            marginHorizontal: scale.xs_4,
        },
        chipRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        chipImage: {
            width: 20,
            height: 20,
            marginRight: 8,
        },
        SelectedChip: {
            borderColor: color.appPrimary,
            backgroundColor: color.appFFE4D5
        },
        errorText: {
            paddingTop: scale.sm_8,
            color: color.appPrimary,
            fontWeight: '500'
        }
    })
}