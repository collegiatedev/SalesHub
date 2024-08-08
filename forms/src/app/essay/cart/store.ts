import { create } from "zustand";
import { EssayType, WordCountType } from "./constants";

export type Draft = {
  title: string;
  type?: {
    essay: EssayType;
    wordCount?: WordCountType;
  };
  ready: boolean;
};
export const DEFAULT_DRAFT: Draft = { title: "", ready: false };

type DraftState = {
  drafts: Map<number, Draft>;
  counter: number;
  addDraft: (draft?: Draft) => void;
  getDraft: (id: number) => Draft | undefined;
  getDrafts: () => DraftArray;
  getDraftCount: () => number;
  updateDraft: (id: number, updatedDraft: Partial<Draft>) => void;
  deleteDraft: (id: number) => void;
};

type DraftArray = Array<{ draft: Draft; id: number }>;

export const useDraftStore = create<DraftState>((set, get) => ({
  drafts: new Map<number, Draft>([[0, DEFAULT_DRAFT]]),
  counter: 1,
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
  updateDraft: (id: number, updatedDraft: Partial<Draft>) => {
    set((state) => {
      const draft = state.drafts.get(id);
      if (draft) {
        const newDraft = { ...draft, ...updatedDraft };
        state.drafts.set(id, newDraft);
        return { drafts: new Map(state.drafts) };
      }
      return state;
    });
  },

  deleteDraft: (id: number) => {
    set((state) => {
      state.drafts.delete(id);
      return { drafts: new Map(state.drafts) };
    });
  },
}));
