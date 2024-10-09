import { create, StateCreator } from "zustand";
import { IWardrobe } from "../interfaces/IWardrobe";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const createWardrobeSlice: StateCreator<IWardrobe> = (set) => ({
  id: new Date().getTime(),
  name: "",
  description: "",
  clothing_category: "Top",
  status: "Available",
  last_washed: new Date().toLocaleDateString(undefined, options),
  previous_session: "",
  date_added: new Date().toLocaleDateString(undefined, options),

  createWardrobeItem: (wardrobe: IWardrobe) => set(wardrobe),
});

export const useBoundStore = create<IWardrobe>()((...args) => ({
  ...createWardrobeSlice(...args),
}));
