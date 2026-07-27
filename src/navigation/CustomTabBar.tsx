import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { LayoutScaleType, palleteColorsType, useTheme } from '../constants/theme'

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const { scale, palletteColors, typography } = useTheme()
    const styles = customTabStyles(scale, palletteColors)
    return (
        <View style={styles.container}>
            {
                state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };
                    return (
                        <TouchableOpacity onPress={onPress} style={isFocused ? styles.activeTab : styles.unactiveTab}>
                            {
                                options.tabBarIcon?.({
                                    color: 'white',
                                    focused: isFocused,
                                    size: 20
                                })
                            }
                            {
                                isFocused &&
                                <Text style={[typography.subtitle, { color: 'white' }]}> {route.name} </Text>
                            }
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default CustomTabBar

const customTabStyles = (scale: LayoutScaleType, color: palleteColorsType) => {
    return StyleSheet.create({
        container: {
            backgroundColor: color.black,
            borderRadius: 30,
            width: '90%',
            position: 'absolute',
            bottom: scale.ml_20,
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingVertical: scale.sm_8
        },
        activeTab: {
            flexDirection: 'row',
            backgroundColor: color.appPrimary,
            borderRadius: 30,
            padding: scale.ms_12,
            alignItems: 'center'
        },
        unactiveTab: {
            backgroundColor: color.appPrimary2,
            borderRadius: 30,
            padding: scale.ms_12
        }
    })
}