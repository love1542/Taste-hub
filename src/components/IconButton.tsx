import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType, ViewStyle, StyleProp, Touchable, TouchableOpacity, Text } from 'react-native';

interface IconButtonProps {
  source?: ImageSourcePropType;
  icon?: LucideIcon;
  iconColor?: string,
  size?: number;
  iconSize?: number;
  iconFillColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  onpress?: () => void
  style?: StyleProp<ViewStyle>;

  badge?: string | number;
  badgeColor?: string;
  badgeTextColor?: string;
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
  style,
  badge,
  badgeColor = '#FF6B35',
  badgeTextColor = 'white',
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
      {badge !== undefined && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: badgeColor,
            },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              {
                color: badgeTextColor,
              },
            ]}
          >
            {badge}
          </Text>
        </View>
      )}


    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
   badge: {
    position: 'absolute',
    top: -7,
    right: -7,
    minWidth: 20,
    height: 20,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth:1,
    borderColor: 'white'
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  }
});