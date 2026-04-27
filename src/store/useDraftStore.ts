import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { GrievanceFormData } from "../schemas/grievanceSchemas";

// MMKV Storage adapter
// In a real build environment, MMKV native module is available.
// For TS checking without native modules, we provide a fallback.
let mmkvStorage: StateStorage;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { MMKV } = require("react-native-mmkv");
  const storage = new MMKV({
    id: "grievance_draft_storage",
  });

  mmkvStorage = {
    setItem: (name: string, value: string) => {
      storage.set(name, value);
    },
    getItem: (name: string) => {
      return storage.getString(name) ?? null;
    },
    removeItem: (name: string) => {
      storage.delete(name);
    },
  };
} catch {
  // Fallback for environments where MMKV native module isn't linked yet
  const memoryStore: Record<string, string> = {};
  mmkvStorage = {
    setItem: (name: string, value: string) => {
      memoryStore[name] = value;
    },
    getItem: (name: string) => {
      return memoryStore[name] ?? null;
    },
    removeItem: (name: string) => {
      delete memoryStore[name];
    },
  };
}

interface DraftState {
  draft: Partial<GrievanceFormData>;
  updateDraft: (data: Partial<GrievanceFormData>) => void;
  clearDraft: () => void;
}

export const useDraftStore = create<DraftState>()(
  persist(
    (set) => ({
      draft: {},
      updateDraft: (data) =>
        set((state) => ({ draft: { ...state.draft, ...data } })),
      clearDraft: () => set({ draft: {} }),
    }),
    {
      name: "grievance-draft",
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
