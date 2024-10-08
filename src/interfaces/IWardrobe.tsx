export interface IWardrobe {
  id: number;
  name: string;
  description: string;
  clothing_category: ClothingCategory;
  status: Status;
  date_added: string;
  last_washed: string;
  previous_session: string;
}

export type ClothingCategory = "Top" | "Bottom" | "Undergarments";
export type Status = "Available" | "In Laundry";
