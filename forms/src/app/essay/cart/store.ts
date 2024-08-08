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
  drafts: Map<number, Draft>;
  counter: number;
  initializeDrafts: (drafts: DraftArray) => void;
  addDraft: (draft?: Draft) => void;
  getDraft: (id: number) => Draft | undefined;
  getDrafts: () => DraftArray;
  getDraftCount: () => number;
  updateDraft: (id: number, updatedDraft: Partial<Draft>) => Draft | undefined;
  deleteDraft: (id: number) => void;
};

export type DraftArray = Array<{ draft: Draft; id: number }>;

export const useDraftStore = create<DraftState>((set, get) => ({
  drafts: new Map<number, Draft>([[0, DEFAULT_DRAFT]]),
  counter: 1,
  initializeDrafts: (drafts?: DraftArray) => {
    if (!drafts) return;
    set(() => {
      const newDrafts = new Map(drafts.map((d) => [d.id, d.draft]));
      const newCounter =
        drafts.length > 0 ? Math.max(...drafts.map((d) => d.id)) + 1 : 1;
      return { drafts: newDrafts, counter: newCounter };
    });
  },
  addDraft: (draft?: Draft) => {
    set((state) => {
      const newId = state.counter;
      const newDraft = draft ?? DEFAULT_DRAFT;
      state.drafts.set(newId, newDraft);
      state.counter += 1;
      return {
        drafts: new Map(state.drafts),
        counter: state.counter,
      };
    });
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
