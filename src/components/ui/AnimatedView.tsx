import React from "react";
import { Platform, View, ViewStyle, StyleProp } from "react-native";
import Animated from "react-native-reanimated";

interface AnimatedViewProps {
  entering?: any;
  exiting?: any;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  [key: string]: any;
}

/**
 * Cross-platform Animated.View.
 * Reanimated Layout Animations (entering/exiting) are native-only.
 * On web we render a plain View so elements are visible immediately.
 */
export function AnimatedView({ entering, exiting, children, style, ...rest }: AnimatedViewProps) {
  if (Platform.OS === "web") {
    return (
      <View style={style as StyleProp<ViewStyle>} {...rest}>
        {children}
      </View>
    );
  }
  return (
    <Animated.View entering={entering} exiting={exiting} style={style} {...rest}>
      {children}
    </Animated.View>
  );
}
