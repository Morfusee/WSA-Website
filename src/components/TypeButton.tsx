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
  console.log(label, active);
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

export default TypeButton;
