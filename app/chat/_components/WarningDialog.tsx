import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const WarningDialog = ({
  title,
  description,
  continueText = "Continue",
  alertOpen,
  setAlertOpen,
  nextFunction,
}: {
  title?: string;
  description?: string;
  continueText?: string;
  alertOpen: boolean;
  setAlertOpen: (arg: boolean) => void;
  nextFunction: Function;
}) => {
  return (
    <>
      <AlertDialog open={alertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {title ? title : "Are you absolutely sure?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {description ? description : "This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAlertOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <Button
              variant={"destructive"}
              onClick={() => {
                setAlertOpen(false);
                nextFunction();
              }}
            >
              {continueText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default WarningDialog;
