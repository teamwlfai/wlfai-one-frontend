/**
 * Drawer props
 */
export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  onReset?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  resetLabel?: string;
  loading?: boolean;
  width?: string;
  hideActions?: boolean;
  showReset?: boolean;
}
