function TypeButton({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      className={
        "bg-primary-dark hover:bg-primary-main text-gray-100 rounded-md min-h-0 px-6 py-1.5 " +
        className
      }
    >
      {label}
    </button>
  );
}

export default TypeButton;
