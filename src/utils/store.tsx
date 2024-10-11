import { create, StateCreator } from "zustand";
import { IWardrobe } from "../interfaces/IWardrobe";
import WardrobeData from "../assets/data/wardrobe_data.json";
import LaundryData from "../assets/data/laundry_data.json";
import { ILaundry } from "../interfaces/ILaundry";

interface ICreateWardrobeSlice {
  wardrobeItems: IWardrobe[];
  wardrobePageConfig: {
    formatType: "list" | "grid";
  };
  createWardrobeItem: (wardrobe: IWardrobe) => void;
  setWardrobePageFormatType: (formatType: "list" | "grid") => void;
  updateWardrobeItemWithProperty: <T>(
    id: number,
    property: keyof IWardrobe,
    value: T
  ) => void;
}

interface ICreateLaundrySlice {
  laundryItems: ILaundry[];

  createLaundryItem: (laundry: ILaundry) => void;
  updateLaundryItemWithProperty: <T>(
    id: number,
    property: keyof ILaundry,
    value: T
  ) => void;
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
  updateWardrobeItemWithProperty: <T,>(
    id: number,
    property: keyof IWardrobe,
    value: T
  ) => {
    set((state) => ({
      wardrobeItems: state.wardrobeItems.map((item) =>
        item.id === id
          ? {
              ...item,
              [property]: value,
            }
          : item
      ),
    }));
  },
});

const createLaundrySlice: StateCreator<ICreateLaundrySlice> = (set) => ({
  laundryItems: LaundryData as ILaundry[],

  createLaundryItem: (laundry: ILaundry) =>
    set((state) => ({
      laundryItems: [...state.laundryItems, laundry],
    })),
  updateLaundryItemWithProperty: <T,>(
    id: number,
    property: keyof ILaundry,
    value: T
  ) => {
    set((state) => ({
      laundryItems: state.laundryItems.map((item) =>
        item.id === id ? { ...item, [property]: value } : item
      ),
    }));
  },
});

export const useBoundStore = create<
  ICreateWardrobeSlice & ICreateLaundrySlice
>()((...args) => ({
  ...createWardrobeSlice(...args),
  ...createLaundrySlice(...args),
}));
