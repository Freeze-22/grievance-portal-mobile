import React, { useEffect } from "react";
import { View, ViewProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  interpolateColor,
} from "react-native-reanimated";

interface SkeletonProps extends ViewProps {
  width: number | string;
  height: number;
  borderRadius?: number;
}

export function Skeleton({ width, height, borderRadius = 12, style, ...props }: SkeletonProps) {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1200, easing: Easing.bezier(0.4, 0, 0.6, 1) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      shimmer.value,
      [0, 1],
      ["#1e293b", "#334155"]
    ),
  }));

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          overflow: "hidden",
        },
        animatedStyle,
        style,
      ]}
      {...props}
    />
  );
}

// Pre-built skeleton layouts for common components
export function TicketSkeleton() {
  return (
    <View
      style={{
        backgroundColor: "rgba(30, 41, 59, 0.8)",
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: "rgba(51, 65, 85, 0.5)",
        marginBottom: 12,
      }}
    >
      {/* Top row */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 14 }}>
        <Skeleton width={72} height={24} />
        <Skeleton width={88} height={24} />
      </View>
      {/* Title */}
      <Skeleton width="100%" height={18} borderRadius={8} />
      <View style={{ height: 8 }} />
      <Skeleton width="70%" height={18} borderRadius={8} />
      {/* Bottom */}
      <View style={{ flexDirection: "row", gap: 8, marginTop: 14 }}>
        <Skeleton width={80} height={22} />
        <Skeleton width={8} height={8} borderRadius={4} />
        <View style={{ flex: 1 }} />
        <Skeleton width={90} height={16} />
      </View>
    </View>
  );
}

export function StatSkeleton() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(30, 41, 59, 0.8)",
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: "rgba(51, 65, 85, 0.5)",
        minWidth: 140,
      }}
    >
      <Skeleton width={40} height={40} borderRadius={12} />
      <View style={{ height: 12 }} />
      <Skeleton width={48} height={28} />
      <View style={{ height: 6 }} />
      <Skeleton width={64} height={14} />
    </View>
  );
}
