import { create, StateCreator } from "zustand";
import { IWardrobe } from "../interfaces/IWardrobe";
import WardrobeData from "../assets/data/wardrobe_data.json";

interface ICreateWardrobeSlice {
  wardrobeItems: IWardrobe[];
  wardrobePageConfig: {
    formatType: "list" | "grid";
  };
  createWardrobeItem: (wardrobe: IWardrobe) => void;
  setWardrobePageFormatType: (formatType: "list" | "grid") => void;
}

const createWardrobeSlice: StateCreator<ICreateWardrobeSlice> = (set) => ({
  wardrobeItems: WardrobeData as IWardrobe[],
  wardrobePageConfig: {
    formatType: "grid",
  },
  createWardrobeItem: (wardrobe: IWardrobe) =>
    set((state) => ({
      wardrobeItems: [...state.wardrobeItems, wardrobe],
    })),
  setWardrobePageFormatType: (formatType) =>
    set({
      wardrobePageConfig: {
        formatType: formatType,
      },
    }),
});

export const useBoundStore = create<ICreateWardrobeSlice>()((...args) => ({
  ...createWardrobeSlice(...args),
}));
