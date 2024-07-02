import React from "react";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogBody,
  Button,
  Text,
} from "@gluestack-ui/themed";

type CustomAlertMessageProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
};

export const CustomAlertMessage = ({
  isOpen,
  onClose,
  title,
  message,
}: CustomAlertMessageProps) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Text fontSize={30}>{title}</Text>
          <AlertDialogCloseButton onPress={onClose} />
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text fontSize={20}>{message}</Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button onPress={onClose} bgColor="$primary400">
            <Text color="$textColor">OK</Text>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
