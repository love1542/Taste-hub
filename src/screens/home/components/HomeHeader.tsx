import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { LayoutScaleType, palleteColorsType, useTheme } from '../../../constants/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconButton from '../../../components/IconButton'
import { Bell, Navigation } from 'lucide-react-native'
import SearchField from '../../../components/searchField/SearchField'
import { useLocation } from '../../../hooks/useLocation'
import { useGetProfile } from '../../profile/hooks/useQueries'
import { useAuth } from '../../../hooks'

type HomeHeaderProps = {
  query: string
  onOpenSearch: () => void
  onLocationPress: () => void
  selectedAddress?: { label: string; addressLine: string } | null
}

const HomeHeader = ({ query, onOpenSearch, onLocationPress, selectedAddress }: HomeHeaderProps) => {
    const { palletteColors, scale, typography } = useTheme()
    const styles = headerStyle(scale, palletteColors)
    const { currentLocation } = useLocation()
    const { userId } = useAuth()
    const { data: profile } = useGetProfile(userId)

    const locationLabel = selectedAddress?.label ?? 'Location'
    const locationText = selectedAddress?.addressLine ?? currentLocation?.address ?? 'Select Location'
    return (
        <View style={styles.container}>
            <SafeAreaView style={{gap:scale.xl_18}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Pressable
                        style={({ pressed }) => [styles.leftWrapper, pressed && { opacity: 0.7 }]}
                        onPress={onLocationPress}
                        hitSlop={8}
                    >
                        <IconButton icon={Navigation} size={40} iconSize={20} borderRadius={50} />
                        <View style={{width: scale.bannerLG_200}}>
                            <Text style={{ color: 'white' }}>{locationLabel}</Text>
                            <Text 
                            style={{ color: 'white' }}
                            numberOfLines={1}
                            >{locationText}</Text>
                        </View>
                    </Pressable>
                    <View>
                        <IconButton icon={Bell} size={40} iconSize={20} borderRadius={50} />
                    </View>
                </View>
                <Text style={[typography.largeheading, {color: palletteColors.white}]}>
                    Good Morning, {profile?.data?.fullName ?? ''}
                </Text>

                <SearchField 
                    value={query}
                    placeholder='Search Best Restraunt & Food'
                    onChange={() => {}}
                    onClear={()=>{}}
                    editable={false}
                    onPress={onOpenSearch}

                />
            </SafeAreaView>

        </View>
    )
}

export default HomeHeader

const headerStyle = (scale: LayoutScaleType, color: palleteColorsType) => {
    return StyleSheet.create({
        container: {
            backgroundColor: color.black,
            borderEndEndRadius: scale.lg_24,
            borderBottomLeftRadius: scale.lg_24,
            paddingHorizontal: scale.xl_18,
        },
        leftWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale.sm_8
        },
        
    })
}