import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FadeInDown } from "react-native-reanimated";
import { AnimatedView } from "../ui/AnimatedView";

export type GrievanceStatus = "submitted" | "in_review" | "resolved" | "escalated";

interface GrievanceTicketProps {
  id: string;
  subject: string;
  category: string;
  status: GrievanceStatus;
  date: string;
  severity: "low" | "medium" | "high" | "critical";
  delay?: number;
}

const statusConfig: Record<GrievanceStatus, { label: string; color: string; bg: string }> = {
  submitted: { label: "Submitted", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)" },
  in_review: { label: "In Review", color: "#6366f1", bg: "rgba(99, 102, 241, 0.15)" },
  resolved: { label: "Resolved", color: "#10b981", bg: "rgba(16, 185, 129, 0.15)" },
  escalated: { label: "Escalated", color: "#ef4444", bg: "rgba(239, 68, 68, 0.15)" },
};

const severityColors: Record<string, string> = {
  low: "#10b981",
  medium: "#f59e0b",
  high: "#f97316",
  critical: "#ef4444",
};

export function GrievanceTicket({ id, subject, category, status, date, severity, delay = 0 }: GrievanceTicketProps) {
  const statusInfo = statusConfig[status];
  const sevColor = severityColors[severity] || "#64748b";

  return (
    <AnimatedView entering={FadeInDown.delay(delay).duration(400).springify()} style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.idBadge}>
          <Text style={styles.idText}>#{id}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
          <View style={[styles.statusDot, { backgroundColor: statusInfo.color }]} />
          <Text style={[styles.statusText, { color: statusInfo.color }]}>{statusInfo.label}</Text>
        </View>
      </View>

      <Text style={styles.subject} numberOfLines={2}>{subject}</Text>

      <View style={styles.bottomRow}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
        <View style={[styles.severityDot, { backgroundColor: sevColor }]} />
        <Text style={styles.date}>{date}</Text>
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 16, padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 12,
  },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  idBadge: { backgroundColor: "rgba(99, 102, 241, 0.10)", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  idText: { color: "#667eea", fontSize: 12, fontWeight: "700" },
  statusBadge: { flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, gap: 6 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 12, fontWeight: "600" },
  subject: { color: "#1e293b", fontSize: 16, fontWeight: "600", marginBottom: 12, lineHeight: 22 },
  bottomRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  categoryBadge: { backgroundColor: "#f1f5f9", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  categoryText: { color: "#64748b", fontSize: 12, fontWeight: "500" },
  severityDot: { width: 8, height: 8, borderRadius: 4 },
  date: { color: "#64748b", fontSize: 12, flex: 1, textAlign: "right" },
});
