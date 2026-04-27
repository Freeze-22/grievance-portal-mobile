import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export function StepProgressBar({ currentStep, totalSteps, stepLabels }: ProgressBarProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(currentStep / totalSteps, {
      duration: 600,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [currentStep]);

  const animatedBarStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      {/* Step indicators */}
      <View style={styles.stepsRow}>
        {stepLabels.map((label, index) => {
          const isActive = index < currentStep;
          const isCurrent = index === currentStep;
          return (
            <View key={index} style={styles.stepItem}>
              <View
                style={[
                  styles.stepDot,
                  isActive && styles.stepDotCompleted,
                  isCurrent && styles.stepDotCurrent,
                ]}
              >
                {isActive ? (
                  <Text style={styles.checkmark}>✓</Text>
                ) : (
                  <Text
                    style={[
                      styles.stepNumber,
                      isCurrent && styles.stepNumberCurrent,
                    ]}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  (isActive || isCurrent) && styles.stepLabelActive,
                ]}
                numberOfLines={1}
              >
                {label}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Progress bar */}
      <View style={styles.barBg}>
        <Animated.View style={[styles.barFill, animatedBarStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    marginBottom: 24,
  },
  stepsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  stepItem: {
    alignItems: "center",
    flex: 1,
  },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  stepDotCompleted: {
    backgroundColor: "#10b981",
  },
  stepDotCurrent: {
    backgroundColor: "#ffffff",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  stepNumber: {
    color: "#475569",
    fontSize: 13,
    fontWeight: "700",
  },
  stepNumberCurrent: {
    color: "#667eea",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  stepLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
  },
  stepLabelActive: {
    color: "#ffffff",
  },
  barBg: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2,
    overflow: "hidden",
  },
  barFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ffffff",
  },
});
