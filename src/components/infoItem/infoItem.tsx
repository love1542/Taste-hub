import { View, Text, StyleSheet } from "react-native"

type InfoItemProps = {
  icon: React.ReactNode
  text: string
  textSize?: number
  textWeight?: "normal" | "400" | "500" | "600" | "700" | "800" | "light" | "medium" | "regular" | "semibold" | undefined
}

const InfoItem = ({ icon, text, textSize=14, textWeight = '400' }: InfoItemProps) => (
  <View style={styles.infoItem}>
    {icon}
    <Text style={{fontSize: textSize, fontWeight: textWeight}}>{text}</Text>
  </View>
)

export default InfoItem;

const styles = StyleSheet.create({
    infoItem:{
        flexDirection: 'row',
        gap: 3
    }
})