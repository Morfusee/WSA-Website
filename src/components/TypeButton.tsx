function TypeButton({
  label,
  className,
  onClick,
}: {
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={
        "bg-primary-dark hover:bg-primary-main text-gray-100 rounded-md min-h-0 px-6 py-1.5 " +
        className
      }
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default TypeButton;
