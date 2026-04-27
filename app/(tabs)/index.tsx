import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { FadeInDown, FadeInRight } from "react-native-reanimated";

import { AnimatedView } from "@/src/components/ui/AnimatedView";
import { StatCard } from "@/src/components/ui/Card";
import {
  GrievanceTicket,
  GrievanceStatus,
} from "@/src/components/grievance/GrievanceTicket";

const MOCK_STATS = {
  total: 12,
  pending: 3,
  resolved: 8,
  escalated: 1,
};

const MOCK_TICKETS: Array<{
  id: string;
  subject: string;
  category: string;
  status: GrievanceStatus;
  date: string;
  severity: "low" | "medium" | "high" | "critical";
}> = [
  {
    id: "GRV-001",
    subject: "Workplace harassment during team meeting on March 15",
    category: "Harassment",
    status: "in_review",
    date: "Apr 22, 2026",
    severity: "high",
  },
  {
    id: "GRV-002",
    subject: "Salary discrepancy for Q1 bonus allocation",
    category: "Compensation",
    status: "submitted",
    date: "Apr 20, 2026",
    severity: "medium",
  },
  {
    id: "GRV-003",
    subject: "Unsafe working conditions in Building B lab",
    category: "Safety",
    status: "resolved",
    date: "Apr 15, 2026",
    severity: "critical",
  },
  {
    id: "GRV-004",
    subject: "Unfair performance review by department manager",
    category: "Management",
    status: "escalated",
    date: "Apr 10, 2026",
    severity: "high",
  },
];

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.safeArea}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6366f1"
          />
        }
      >
        {/* Header */}
        <AnimatedView entering={FadeInDown.delay(100).duration(500)} style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good evening 👋</Text>
            <Text style={styles.name}>Srikiran</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={22} color="#e2e8f0" />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </AnimatedView>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <StatCard title="Total" value={MOCK_STATS.total} icon="📋" color="#6366f1" delay={200} />
          <StatCard title="Pending" value={MOCK_STATS.pending} icon="⏳" color="#f59e0b" delay={300} />
        </View>
        <View style={styles.statsRow}>
          <StatCard title="Resolved" value={MOCK_STATS.resolved} icon="✅" color="#10b981" delay={400} />
          <StatCard title="Escalated" value={MOCK_STATS.escalated} icon="🚨" color="#ef4444" delay={500} />
        </View>

        {/* Quick Action */}
        <AnimatedView entering={FadeInDown.delay(500).duration(500)} style={styles.quickActions}>
          <TouchableOpacity
            style={styles.primaryAction}
            onPress={() => {
              if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              router.push("/(tabs)/create");
            }}
            activeOpacity={0.85}
          >
            <View style={styles.actionIconWrap}>
              <Ionicons name="add" size={24} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.actionTitle}>Submit New Grievance</Text>
              <Text style={styles.actionSubtitle}>Report an issue confidentially</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#818cf8" />
          </TouchableOpacity>
        </AnimatedView>

        {/* Recent Tickets */}
        <AnimatedView entering={FadeInDown.delay(600).duration(500)} style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Grievances</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </AnimatedView>

        {MOCK_TICKETS.map((ticket, index) => (
          <GrievanceTicket key={ticket.id} {...ticket} delay={700 + index * 100} />
        ))}


        <View style={{ height: 32 }} />
      </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  greeting: { color: "#e2e8f0", fontSize: 14, fontWeight: "500", marginBottom: 4 },
  name: { color: "#ffffff", fontSize: 28, fontWeight: "800" },
  notifBtn: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.3)",
  },
  notifDot: {
    position: "absolute", top: 10, right: 12,
    width: 8, height: 8, borderRadius: 4, backgroundColor: "#ef4444",
  },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 12 },
  quickActions: { marginTop: 8, marginBottom: 24 },
  primaryAction: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 20, padding: 16,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3, gap: 14,
  },
  actionIconWrap: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: "#667eea", alignItems: "center", justifyContent: "center",
  },
  actionTitle: { color: "#1e293b", fontSize: 16, fontWeight: "700" },
  actionSubtitle: { color: "#64748b", fontSize: 12, marginTop: 2 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  sectionTitle: { color: "#ffffff", fontSize: 18, fontWeight: "700" },
  seeAll: { color: "#e2e8f0", fontSize: 14, fontWeight: "600" },
});
