function EditModeSwitcher({
  showChildren,
  children,
}: {
  showChildren: boolean;
  children: React.ReactNode;
}) {
  return showChildren ? <>{children}</> : null;
}

export default EditModeSwitcher;
