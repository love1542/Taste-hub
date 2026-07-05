import { StyleSheet } from "react-native";

export const pagingIndicatorStyles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        gap: 7,
        width: '100%',
        height: 7
    },
    activeIndicator: {
        height: 7,
        backgroundColor: '#FF6B35',
        borderRadius: 4
    },
    inactiveIndicator:{
        height: 7,
        backgroundColor: 'white',
        borderRadius: 4
    },
    longActiveIndicator: {
        flex: 1,
        height: 7,
        backgroundColor: '#FF6B35',
        borderRadius: 4
    },
    longInactiveIndicator:{
        flex:1,
        height: 7,
        backgroundColor: 'white',
        borderRadius: 4
    }
})