import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchGrievances,
  fetchGrievanceById,
  submitGrievance,
  fetchStats,
  fetchTimeline,
  fetchComments,
  addComment,
} from "../services/grievanceService";
import { GrievanceFormData } from "../schemas/grievanceSchemas";

// ── Query Keys ───────────────────────────────────────────────────────
export const grievanceKeys = {
  all: ["grievances"] as const,
  lists: () => [...grievanceKeys.all, "list"] as const,
  detail: (id: string) => [...grievanceKeys.all, "detail", id] as const,
  stats: () => [...grievanceKeys.all, "stats"] as const,
  timeline: (id: string) => [...grievanceKeys.all, "timeline", id] as const,
  comments: (id: string) => [...grievanceKeys.all, "comments", id] as const,
};

// ── Queries ──────────────────────────────────────────────────────────

export function useGrievances() {
  return useQuery({
    queryKey: grievanceKeys.lists(),
    queryFn: fetchGrievances,
  });
}

export function useGrievance(id: string) {
  return useQuery({
    queryKey: grievanceKeys.detail(id),
    queryFn: () => fetchGrievanceById(id),
    enabled: !!id,
  });
}

export function useGrievanceStats() {
  return useQuery({
    queryKey: grievanceKeys.stats(),
    queryFn: fetchStats,
  });
}

export function useGrievanceTimeline(id: string) {
  return useQuery({
    queryKey: grievanceKeys.timeline(id),
    queryFn: () => fetchTimeline(id),
    enabled: !!id,
  });
}

export function useGrievanceComments(id: string) {
  return useQuery({
    queryKey: grievanceKeys.comments(id),
    queryFn: () => fetchComments(id),
    enabled: !!id,
  });
}

// ── Mutations ────────────────────────────────────────────────────────

export function useSubmitGrievance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: GrievanceFormData) => submitGrievance(form),
    onSuccess: () => {
      // Invalidate grievances list and stats after successful submission
      queryClient.invalidateQueries({ queryKey: grievanceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: grievanceKeys.stats() });
    },
  });
}

export function useAddComment(grievanceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: string) => addComment(grievanceId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: grievanceKeys.comments(grievanceId) });
    },
  });
}
