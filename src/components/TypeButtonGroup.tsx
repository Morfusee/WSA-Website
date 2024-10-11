import { useLocation, useSearchParams } from "react-router-dom";
import { ClothingCategory } from "../interfaces/IWardrobe";

function TypeButtonGroup() {
  const clothing_category = [
    "Top",
    "Bottom",
    "Undergarments",
  ] as ClothingCategory[];

  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleTypeButtonClick = (category: ClothingCategory) => {
    setSearchParams((params) => {
      if (params.get("category") === category.toLowerCase()) {
        params.delete("category");
        return params;
      }
      params.set("category", category.toLowerCase());
      return params;
    });
  };

  const isCategoryActive = (category: ClothingCategory) => {
    return location.search.includes(category.toLowerCase());
  };

  return (
    <section className="flex gap-2 overflow-y-auto">
      {clothing_category.map((category, index) => (
        <TypeButton
          key={index}
          label={category}
          onClick={() => handleTypeButtonClick(category)}
          active={isCategoryActive(category)}
        />
      ))}
    </section>
  );
}

function TypeButton({
  label,
  className,
  onClick,
  active,
}: {
  label: string;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      className={
        "hover:bg-primary-main text-gray-100 rounded-md min-h-0 px-6 py-1.5 " +
        (active ? "bg-primary-main " : "bg-primary-dark ") +
        className
      }
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default TypeButtonGroup;
