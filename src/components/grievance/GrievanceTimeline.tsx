import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FadeInRight } from "react-native-reanimated";
import { AnimatedView } from "../ui/AnimatedView";

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  status: "completed" | "active" | "pending";
}

const statusColors = {
  completed: "#10b981",
  active: "#6366f1",
  pending: "#475569",
};

export function GrievanceTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <View style={styles.container}>
      {events.map((event, index) => (
        <AnimatedView
          key={event.id}
          entering={FadeInRight.delay(index * 150).duration(400).springify()}
          style={styles.eventRow}
        >
          <View style={styles.lineContainer}>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: statusColors[event.status],
                  borderColor: event.status === "active" ? statusColors.active + "40" : "transparent",
                  borderWidth: event.status === "active" ? 4 : 0,
                },
              ]}
            />
            {index < events.length - 1 && (
              <View
                style={[
                  styles.line,
                  { backgroundColor: event.status === "completed" ? statusColors.completed + "40" : "#334155" },
                ]}
              />
            )}
          </View>
          <View style={styles.content}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDesc}>{event.description}</Text>
            <Text style={styles.eventDate}>{event.date}</Text>
          </View>
        </AnimatedView>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingLeft: 8 },
  eventRow: { flexDirection: "row", minHeight: 80 },
  lineContainer: { alignItems: "center", width: 24, marginRight: 16 },
  dot: { width: 14, height: 14, borderRadius: 7, zIndex: 1 },
  line: { width: 2, flex: 1, marginTop: 4, marginBottom: 4 },
  content: { flex: 1, paddingBottom: 24 },
  eventTitle: { color: "#f1f5f9", fontSize: 15, fontWeight: "600", marginBottom: 4 },
  eventDesc: { color: "#94a3b8", fontSize: 13, lineHeight: 18, marginBottom: 4 },
  eventDate: { color: "#64748b", fontSize: 12 },
});
