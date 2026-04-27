import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { AnimatedView } from "@/src/components/ui/AnimatedView";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import * as Haptics from "expo-haptics";
import { GrievanceTimeline } from "@/src/components/grievance/GrievanceTimeline";

// Mock timeline data for the featured grievance
const MOCK_TIMELINE = [
  {
    id: "1",
    title: "Grievance Submitted",
    description: "Your grievance was received and logged in the system.",
    date: "Apr 22, 2026 • 10:30 AM",
    status: "completed" as const,
  },
  {
    id: "2",
    title: "Assigned to HR Manager",
    description: "Case assigned to Priya Sharma from the HR department.",
    date: "Apr 22, 2026 • 02:15 PM",
    status: "completed" as const,
  },
  {
    id: "3",
    title: "Investigation In Progress",
    description: "The investigation team is reviewing the submitted evidence.",
    date: "Apr 23, 2026 • 09:00 AM",
    status: "active" as const,
  },
  {
    id: "4",
    title: "Resolution & Feedback",
    description: "Pending final resolution and your feedback.",
    date: "Estimated: Apr 30, 2026",
    status: "pending" as const,
  },
];

export default function ModalScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <AnimatedView entering={FadeInDown.delay(100).duration(500)} style={styles.header}>
          <View style={styles.ticketBadge}>
            <Text style={styles.ticketId}>#GRV-001</Text>
          </View>
          <View style={[styles.statusBadge]}>
            <View style={[styles.statusDot, { backgroundColor: "#6366f1" }]} />
            <Text style={[styles.statusText, { color: "#6366f1" }]}>In Review</Text>
          </View>
        </AnimatedView>

        <AnimatedView entering={FadeInDown.delay(200).duration(500)}>
          <Text style={styles.title}>
            Workplace harassment during team meeting on March 15
          </Text>
          <Text style={styles.subtitle}>Filed on Apr 22, 2026 • Harassment • High Severity</Text>
        </AnimatedView>

        {/* Info Cards */}
        <AnimatedView entering={FadeInDown.delay(300).duration(500)} style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Ionicons name="person-outline" size={18} color="#6366f1" />
            <Text style={styles.infoLabel}>Assigned To</Text>
            <Text style={styles.infoValue}>Priya Sharma</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="time-outline" size={18} color="#f59e0b" />
            <Text style={styles.infoLabel}>Expected By</Text>
            <Text style={styles.infoValue}>Apr 30, 2026</Text>
          </View>
        </AnimatedView>

        {/* Timeline Section */}
        <AnimatedView entering={FadeInDown.delay(400).duration(500)}>
          <Text style={styles.sectionTitle}>Case Timeline</Text>
          <GrievanceTimeline events={MOCK_TIMELINE} />
        </AnimatedView>

        {/* Comments Section */}
        <AnimatedView entering={FadeInDown.delay(500).duration(500)}>
          <Text style={styles.sectionTitle}>Comments</Text>

          <View style={styles.comment}>
            <View style={styles.commentAvatar}>
              <Text style={styles.commentAvatarText}>PS</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentName}>Priya Sharma</Text>
                <Text style={styles.commentTime}>Apr 23 • 9:15 AM</Text>
              </View>
              <Text style={styles.commentBody}>
                We have received your grievance and the investigation has begun. I'll keep you
                updated on the progress. Please provide any additional evidence if available.
              </Text>
            </View>
          </View>

          <View style={styles.comment}>
            <View style={[styles.commentAvatar, { backgroundColor: "#6366f1" }]}>
              <Text style={styles.commentAvatarText}>SK</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentName}>You</Text>
                <Text style={styles.commentTime}>Apr 23 • 11:00 AM</Text>
              </View>
              <Text style={styles.commentBody}>
                Thank you for the update. I have attached additional documentation from the meeting
                recording.
              </Text>
            </View>
          </View>
        </AnimatedView>

        {/* Add Comment */}
        <AnimatedView entering={FadeInDown.delay(600).duration(500)} style={styles.addComment}>
          <View style={styles.commentInput}>
            <Text style={styles.commentPlaceholder}>Write a comment...</Text>
          </View>
          <TouchableOpacity
            style={styles.sendBtn}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
          >
            <Ionicons name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </AnimatedView>

        {/* Back link */}
        <AnimatedView entering={FadeInDown.delay(700).duration(400)} style={{ marginTop: 20 }}>
          <Link href="/" dismissTo>
            <View style={styles.backLink}>
              <Ionicons name="arrow-back" size={18} color="#6366f1" />
              <Text style={styles.backText}>Back to Dashboard</Text>
            </View>
          </Link>
        </AnimatedView>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  ticketBadge: {
    backgroundColor: "rgba(99, 102, 241, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  ticketId: {
    color: "#818cf8",
    fontSize: 14,
    fontWeight: "700",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(99, 102, 241, 0.12)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
  },
  title: {
    color: "#f1f5f9",
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 30,
    marginBottom: 8,
  },
  subtitle: {
    color: "#64748b",
    fontSize: 13,
    marginBottom: 24,
  },
  infoGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "rgba(30, 41, 59, 0.8)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(51, 65, 85, 0.5)",
    gap: 8,
  },
  infoLabel: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "500",
  },
  infoValue: {
    color: "#e2e8f0",
    fontSize: 15,
    fontWeight: "700",
  },
  sectionTitle: {
    color: "#f1f5f9",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  comment: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#10b981",
    alignItems: "center",
    justifyContent: "center",
  },
  commentAvatarText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  commentName: {
    color: "#e2e8f0",
    fontSize: 14,
    fontWeight: "600",
  },
  commentTime: {
    color: "#475569",
    fontSize: 11,
  },
  commentBody: {
    color: "#94a3b8",
    fontSize: 13,
    lineHeight: 19,
  },
  addComment: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  commentInput: {
    flex: 1,
    backgroundColor: "rgba(30, 41, 59, 0.8)",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(51, 65, 85, 0.5)",
  },
  commentPlaceholder: {
    color: "#475569",
    fontSize: 14,
  },
  sendBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#6366f1",
    alignItems: "center",
    justifyContent: "center",
  },
  backLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backText: {
    color: "#6366f1",
    fontSize: 14,
    fontWeight: "600",
  },
});
