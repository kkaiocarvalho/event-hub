import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  Text,
} from "@gluestack-ui/themed";

type CustomAlertDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
} & React.PropsWithChildren;

export function CustomAlertDialog({
  isOpen,
  onClose,
  title,
  children,
}: CustomAlertDialogProps) {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Text fontSize={25} color="$error600" fontWeight="$bold">
            {title}
          </Text>
          <AlertDialogCloseButton onPress={onClose} />
        </AlertDialogHeader>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
}
