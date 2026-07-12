import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { LayoutScaleType, palleteColorsType, useTheme } from '../../constants/theme'
import { set } from 'zod'
import { LucideIcon, Mars, Venus, VenusAndMars } from 'lucide-react-native'

export interface SelectionItem {
    id: string,
    label: string,
    icon?: LucideIcon,
    onSelect?: () => void
}

interface SingleSelectionChipsProps {
    configs: SelectionItem[];
    defaultSelectedId?: string;
}

const SingleSelectionChips = ({
    configs,
    defaultSelectedId
}: SingleSelectionChipsProps) => {
    const [selected, setSelected] = useState<string | undefined>(defaultSelectedId)

    const { typography, palletteColors, scale } = useTheme()
    const styles = signleSelectionChipsStyles(palletteColors, scale)

    const onPressChip = (item: SelectionItem) => {
        console.log('run')
        if (item.id == selected) {
            setSelected(undefined)
        } else {
            setSelected(item.id)
            if (item.onSelect) {
                item.onSelect()
            }
        }
    }


    return (
        <View style={styles.contianer}>
            <Text style={[typography.subtitle, styles.title]}>
                Date Of Birth
            </Text>
            <FlatList
                data={configs}
                horizontal
                scrollEnabled={false}
                renderItem={({ item, index }) => {
                    const slectedChip: boolean = item.id === selected
                    return (
                        <TouchableOpacity key={index}
                            style={[styles.chip, slectedChip && styles.SelectedChip]}
                            onPress={() => onPressChip(item)}
                        >
                            <View style={{ flexDirection: 'row', gap: 8 }}>
                                {item.icon && <item.icon size={20} color={slectedChip ? palletteColors.appPrimary : palletteColors.black}/>}
                                <Text style={[typography.textField, { fontWeight: '400' }]}>{item.label}</Text>
                            </View>

                        </TouchableOpacity>
                    )
                }} />

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
            textTransform: 'uppercase',
            color: color.appPrimary,
        },
        chip: {
            borderWidth: 1,
            borderColor: color.app737373,
            borderRadius: 50,
            paddingHorizontal: scale.ms_12,
            paddingVertical: scale.xs_4,
            marginHorizontal: scale.xs_4,
        },
        SelectedChip: {
            borderColor: color.appPrimary,
            backgroundColor: color.appFFF4ED
        }
    })
}