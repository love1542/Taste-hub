import React, { useEffect, useState } from 'react'
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Heart } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LayoutScaleType, palleteColorsType, useTheme } from '../../constants/theme'
import { AppStackParamList } from '../../navigation/type'
import { appRoutes } from '../../constants/appConstants'
import { Restaurant } from '../../data/types'
import RestaurantCell from '../home/components/RestaurantCell'
import { useGetFavourites } from './hooks/useFavouriteQueries'
import { useToggleFavourite } from './hooks/useFavouriteMutations'

type NavigationProps = NativeStackNavigationProp<AppStackParamList, typeof appRoutes.RestaurantDetail>

const Favourites = () => {
    const { palletteColors, scale, typography } = useTheme()
    const styles = pageStyles(palletteColors, scale)
    const navigation = useNavigation<NavigationProps>()

    const { data, isLoading } = useGetFavourites()
    const { mutateAsync } = useToggleFavourite()

    const [localFavourites, setLocalFavourites] = useState<Restaurant[] | null>(null)
    const restaurants: Restaurant[] = localFavourites ?? data?.data ?? []

    const handleToggle = async (id: string) => {
        setLocalFavourites(restaurants.filter(r => r.id !== id))
        try {
            await mutateAsync(id)
        } catch {
            setLocalFavourites(null)
        }
    }

    useEffect(() => {
        setLocalFavourites(null)
    }, [data])

    const renderEmpty = () => {
        if (isLoading) {
            return (
                <View style={styles.centerState}>
                    <ActivityIndicator size="large" color={palletteColors.appPrimary} />
                </View>
            )
        }
        return (
            <View style={styles.centerState}>
                <View style={styles.emptyIconWrap}>
                    <Heart size={36} color={palletteColors.appPrimary} strokeWidth={1.5} />
                </View>
                <Text style={[typography.mdTitle, { color: palletteColors.app262626, marginTop: scale.md_16 }]}>
                    No favourites yet
                </Text>
                <Text style={[typography.subtitle, { marginTop: scale.xs_4, textAlign: 'center' }]}>
                    Tap the heart on any restaurant{'\n'}to save it here
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={[typography.subHeading, { color: palletteColors.app262626 }]}>
                        Favourites
                    </Text>
                    {restaurants.length > 0 && (
                        <View style={styles.countBadge}>
                            <Text style={[typography.subtitle, { color: palletteColors.appPrimary }]}>
                                {restaurants.length}
                            </Text>
                        </View>
                    )}
                </View>

            </SafeAreaView>

            <FlatList
                data={isLoading ? [] : restaurants}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View>
                        <RestaurantCell
                            data={item}
                            favPress={handleToggle}
                            onCellPress={id =>
                                navigation.navigate(appRoutes.RestaurantDetail, { restaurantId: id })
                            }
                        />
                    </View>
                )}
                ListEmptyComponent={renderEmpty}
            />
        </View>
    )
}

export default Favourites

const pageStyles = (color: palleteColorsType, scale: LayoutScaleType) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.background,
        },

        safeArea: {
            backgroundColor: color.background,
        },

        header: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale.sm_8,
            paddingHorizontal: scale.md_16,
            paddingVertical: scale.ms_12,
        },

        countBadge: {
            backgroundColor: color.appFFE4D5,
            paddingHorizontal: scale.sm_8,
            paddingVertical: scale.nano_2,
            borderRadius: scale.iconSM_16,
        },

        list: {
            paddingTop: scale.sm_8,
            paddingBottom: scale.giant_80,
            gap: scale.md_16,
        },

        centerState: {
            flex: 1,
            marginTop: scale.massive_64,
            alignItems: 'center',
            paddingHorizontal: scale.xl_32,
        },

        emptyIconWrap: {
            width: scale.avatarMD_70,
            height: scale.avatarMD_70,
            borderRadius: scale.avatarMD_70 / 2,
            backgroundColor: color.appFFE4D5,
            justifyContent: 'center',
            alignItems: 'center',
        },
    })
