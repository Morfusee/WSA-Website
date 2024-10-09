import { create, StateCreator } from "zustand";
import { IWardrobe } from "../interfaces/IWardrobe";
import WardrobeData from "../assets/data/wardrobe_data.json";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

interface ICreateWardrobeSlice {
  wardrobeItems: IWardrobe[];
  wardrobePageConfig: {
    formatType: "list" | "grid";
  };
  //   setWardrobeItems: (wardrobeItems: IWardrobe[]) => void;
  createWardrobeItem: (wardrobe: IWardrobe) => void;
}

const createWardrobeSlice: StateCreator<ICreateWardrobeSlice> = (set) => ({
  wardrobeItems: WardrobeData as IWardrobe[],
  wardrobePageConfig: {
    formatType: "grid",
  },

  //   setWardrobeItems: (wardrobeItems: IWardrobe[]) => set({ wardrobeItems }),
  createWardrobeItem: (wardrobe: IWardrobe) =>
    set((state) => ({
      wardrobeItems: [...state.wardrobeItems, wardrobe],
    })),
});

export const useBoundStore = create<ICreateWardrobeSlice>()((...args) => ({
  ...createWardrobeSlice(...args),
}));
