import React from "react";
import { Text, Pressable, PressableProps, StyleSheet, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps extends PressableProps {
  label: string;
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
  style?: ViewStyle;
}

export function Button({ label, variant = "primary", isLoading, onPress, style: customStyle, ...props }: ButtonProps) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 10, stiffness: 400 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 400 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case "primary":
        return { backgroundColor: "#667eea", borderColor: "#667eea" };
      case "secondary":
        return { backgroundColor: "#f1f5f9", borderColor: "#f1f5f9" };
      case "outline":
        return { backgroundColor: "transparent", borderColor: "#667eea", borderWidth: 2 };
      default:
        return { backgroundColor: "#667eea" };
    }
  };

  const getTextColor = () => {
    if (variant === "outline") return "#667eea";
    if (variant === "secondary") return "#1e293b";
    return "#ffffff";
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={(e) => {
        if (!isLoading && onPress) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          onPress(e);
        }
      }}
      disabled={isLoading || props.disabled}
      style={[animatedStyle, styles.base, getVariantStyle(), customStyle]}
      {...props}
    >
      <Text style={[styles.label, { color: getTextColor() }]}>
        {isLoading ? "Loading..." : label}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
  },
});
