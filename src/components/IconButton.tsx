import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType, ViewStyle, StyleProp, Touchable, TouchableOpacity } from 'react-native';

interface IconButtonProps {
  source?: ImageSourcePropType;
  icon?:  LucideIcon;
  iconColor?: string,
  size?: number;
  iconSize?: number;
  iconFillColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  onpress?: ()=> void
  style?: StyleProp<ViewStyle>;
}

const IconButton: React.FC<IconButtonProps> = ({
  source,
  icon,
  iconColor = 'white',
  size = 80,
  iconSize = 45,
  iconFillColor = 'none',
  backgroundColor = '#FF6B35',
  borderRadius = 20,
  onpress,
  style
}) => {
  const Icon = icon
  return (
    <TouchableOpacity
      disabled={!onpress}
      onPress={() => onpress?.()}
      style={[
        styles.container,
        { width: size, height: size, backgroundColor, borderRadius },
        style,
      ]}
    >
      {
        source && <Image
        source={source}
        style={{ width: iconSize, height: iconSize }}
        resizeMode="contain"
      />
      }
      {
        Icon && <Icon size={iconSize} color={iconColor} fill={iconFillColor} />
      }
      
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});