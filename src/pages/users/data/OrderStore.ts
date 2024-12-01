import { create } from "zustand";

type DC_STATE_SYMBOL = "O" | "Z" | "A" | "P" | "G" | "W" | "D" | "X";
type DC_TYPE = "S" | "V" | "R";

interface State {
  // const DC_STATE_BUTTONS = ["O", "Z", "A", "P", "G", "W", "D", "X"];
  // const DC_TYPE_BUTTONS = ["S", "V", "R"];
  dcStateSymbols: DC_STATE_SYMBOL[];
  toggleDcStateSymbol: (value: DC_STATE_SYMBOL) => void;
  dcTypes: DC_TYPE[];
  toggleDcType: (value: DC_TYPE) => void;
  year: number | undefined;
  setYear: (v: number | undefined) => void;
}

export const useOrderFilterStore = create<State>((set, get) => ({
  dcStateSymbols: ["O", "Z", "A", "P", "G", "W", "D", "X"],
  dcTypes: ["S", "R","V"],
  toggleDcStateSymbol: (value) => {
    const currentState = get().dcStateSymbols;
    if (currentState.includes(value)) {
      set({ dcStateSymbols: currentState.filter((item) => item !== value) });
    } else {
      set({ dcStateSymbols: [...currentState, value] });
    }
  },

  toggleDcType: (value) => {
    const currentState = get().dcTypes;
    if (currentState.includes(value)) {
      set({ dcTypes: currentState.filter((item) => item !== value) });
    } else {
      set({ dcTypes: [...currentState, value] });
    }
  },

  year: undefined,
  setYear: (v) => {
    set({ year: v });
  },
}));
