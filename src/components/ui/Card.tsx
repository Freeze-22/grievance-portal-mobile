import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FadeInDown } from "react-native-reanimated";
import { AnimatedView } from "./AnimatedView";

interface CardProps {
  children: React.ReactNode;
  delay?: number;
  style?: object;
}

export function Card({ children, delay = 0, style }: CardProps) {
  return (
    <AnimatedView
      entering={FadeInDown.delay(delay).duration(500).springify()}
      style={[styles.card, style]}
    >
      {children}
    </AnimatedView>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  delay?: number;
}

export function StatCard({ title, value, icon, color, delay = 0 }: StatCardProps) {
  return (
    <AnimatedView
      entering={FadeInDown.delay(delay).duration(500).springify()}
      style={styles.statCard}
    >
      <View style={[styles.statIcon, { backgroundColor: color + "20" }]}>
        <Text style={{ fontSize: 18 }}>{icon}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    minWidth: 140,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  statIcon: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: "center", justifyContent: "center",
    marginBottom: 12,
  },
  statValue: { color: "#1e293b", fontSize: 28, fontWeight: "800", marginBottom: 4 },
  statTitle: { color: "#64748b", fontSize: 13, fontWeight: "500" },
});
