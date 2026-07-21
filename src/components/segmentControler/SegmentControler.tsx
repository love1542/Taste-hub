import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../../constants/theme'

export type SegmentControlerProps = {
    segments: string[]
    selectedIndex: number
    onChange: (index: number) => void
}

const SegmentControler = ({segments,selectedIndex, onChange}:SegmentControlerProps) => {
    const {typography} = useTheme()

    return (
    <View style={styles.segmentsWrapper}>
        {
            segments.map((value, index)=>{
                let isActive = index === selectedIndex
                return (
                    <TouchableOpacity 
                    key={index}
                    onPress={()=> onChange(index)}
                    style={styles.segment}>
                        <Text style={typography.title}>{value}</Text>
                        <View style={isActive ? typography.focusFiledBorder : typography.borderLine}/> 
                    </TouchableOpacity>
                )
            })
        }
    </View>
  )
}

export default SegmentControler

const styles = StyleSheet.create({
    segmentsWrapper:{
        flexDirection: 'row',
    },
    segment:{
        flex:1,
        alignItems:'center',
        gap:10
    },
    title:{

    }
})