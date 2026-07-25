import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType, ViewStyle, StyleProp } from 'react-native';

interface AppIconProps {
  source?: ImageSourcePropType;
  size?: number;
  iconSize?: number;
  backgroundColor?: string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

const AppIcon: React.FC<AppIconProps> = ({
  source = require('../../assets/icons/appIcon.png'),
  size = 80,
  iconSize = 45,
  backgroundColor = '#FF6B35',
  borderRadius = 20,
  style,
}) => {
  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, backgroundColor, borderRadius },
        style,
      ]}
    >
      <Image
        source={source}
        style={{ width: iconSize, height: iconSize }}
        resizeMode="contain"
      />
    </View>
  );
};

export default AppIcon;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});