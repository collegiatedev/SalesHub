import { create } from "zustand";
import { EssayType, WordCountType } from "./constants";
import { deepMerge } from "~/lib/utils";

export type Draft = {
  title: string;
  type: Partial<{
    essay: EssayType;
    wordCount: WordCountType;
    university: string;
  }>;
  questions: Partial<{
    prompt: string;
    submission: string;
    notes: string;
  }>;
  ready: boolean;
};

export const DEFAULT_DRAFT: Draft = {
  title: "",
  type: {},
  questions: { prompt: "", submission: "" },
  ready: false,
};
type DraftState = {
  drafts: DraftMap;
  counter: number;
  initializeDrafts: (drafts: DraftMap) => void;
  addDraft: (draft?: Draft) => { draft: Draft; id: number };
  getDraft: (id: number) => Draft | undefined;
  getDrafts: () => DraftArray;
  getDraftCount: () => number;
  updateDraft: (id: number, updatedDraft: Partial<Draft>) => Draft | undefined;
  deleteDraft: (id: number) => void;
};

// for ease of access
export type DraftMap = Map<number, Draft>;
export type DraftArray = Array<{ draft: Draft; id: number }>;

export const useDraftStore = create<DraftState>((set, get) => ({
  drafts: new Map<number, Draft>([[0, DEFAULT_DRAFT]]),
  counter: 1,
  initializeDrafts: (drafts?: DraftMap) => {
    if (!drafts) return;
    set(() => {
      const newDrafts = new Map(drafts); // Directly use the DraftMap
      const newCounter =
        drafts.size > 0 ? Math.max(...Array.from(drafts.keys())) + 1 : 1; // Use keys to find max id
      return { drafts: newDrafts, counter: newCounter };
    });
  },
  addDraft: (draft?: Draft) => {
    const newDraft = draft ?? DEFAULT_DRAFT;
    const newId = get().counter;
    set((state) => {
      state.drafts.set(newId, newDraft);
      state.counter += 1;
      return {
        drafts: new Map(state.drafts),
        counter: state.counter,
      };
    });
    return { draft: newDraft, id: newId };
  },
  getDraft: (id: number) => {
    return get().drafts.get(id);
  },
  getDrafts: () => {
    const d = Array.from(get().drafts.entries());
    return d.map(([id, draft]) => ({ draft, id }));
  },
  getDraftCount: () => get().drafts.size,
  updateDraft: (
    id: number,
    updatedDraft: Partial<Draft>
  ): Draft | undefined => {
    const state = get();
    const draft = state.drafts.get(id);
    if (draft) {
      const newDraft = deepMerge({ ...draft }, updatedDraft);
      set((state) => {
        state.drafts.set(id, newDraft);
        return { drafts: new Map(state.drafts) };
      });
      return newDraft;
    }
    return undefined;
  },
  deleteDraft: (id: number) => {
    set((state) => {
      state.drafts.delete(id);
      return { drafts: new Map(state.drafts) };
    });
  },
}));
