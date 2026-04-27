import { api } from "./api";
import { GrievanceFormData } from "../schemas/grievanceSchemas";

// ── Types ────────────────────────────────────────────────────────────
export interface Grievance {
  id: string;
  subject: string;
  category: string;
  status: "submitted" | "in_review" | "resolved" | "escalated";
  severity: "low" | "medium" | "high" | "critical";
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  description: string;
}

export interface GrievanceStats {
  total: number;
  pending: number;
  resolved: number;
  escalated: number;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  status: "completed" | "active" | "pending";
}

export interface Comment {
  id: string;
  author: string;
  body: string;
  createdAt: string;
}

// ── API Functions ────────────────────────────────────────────────────

export async function fetchGrievances(): Promise<Grievance[]> {
  const { data } = await api.get("/grievances");
  return data;
}

export async function fetchGrievanceById(id: string): Promise<Grievance> {
  const { data } = await api.get(`/grievances/${id}`);
  return data;
}

export async function submitGrievance(form: GrievanceFormData): Promise<Grievance> {
  const { data } = await api.post("/grievances", form);
  return data;
}

export async function fetchStats(): Promise<GrievanceStats> {
  const { data } = await api.get("/grievances/stats");
  return data;
}

export async function fetchTimeline(grievanceId: string): Promise<TimelineEvent[]> {
  const { data } = await api.get(`/grievances/${grievanceId}/timeline`);
  return data;
}

export async function fetchComments(grievanceId: string): Promise<Comment[]> {
  const { data } = await api.get(`/grievances/${grievanceId}/comments`);
  return data;
}

export async function addComment(grievanceId: string, body: string): Promise<Comment> {
  const { data } = await api.post(`/grievances/${grievanceId}/comments`, { body });
  return data;
}

// ── Auth API ─────────────────────────────────────────────────────────

export async function loginUser(email: string, password: string) {
  const { data } = await api.post("/auth/login", { email, password });
  return data; // { user, token }
}

export async function getCurrentUser() {
  const { data } = await api.get("/auth/me");
  return data;
}
