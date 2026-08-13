import { View, Text, StyleSheet } from 'react-native'
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
}

const HomeHeader = ({ query, onOpenSearch }: HomeHeaderProps) => {
    const { palletteColors, scale, typography } = useTheme()
    const styles = headerStyle(scale, palletteColors)
    const {currentLocation} = useLocation()
    const {userId} = useAuth()
    const { data: profile } = useGetProfile(userId)     
    return (
        <View style={styles.container}>
            <SafeAreaView style={{gap:scale.xl_18}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={styles.leftWrapper}>
                        <IconButton icon={Navigation} size={40} iconSize={20} borderRadius={50} />
                        <View style={{width: scale.bannerLG_200}}>
                            <Text style={{ color: 'white' }}>Location</Text>
                            <Text 
                            style={{ color: 'white' }}
                            numberOfLines={1}
                            >{currentLocation?.address ?? "Select Location"}</Text>
                        </View>
                    </View>
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