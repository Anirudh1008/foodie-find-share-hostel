
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

interface ClaimConfirmationDialogProps {
  foodTitle: string;
  foodLocation: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const ClaimConfirmationDialog = ({
  foodTitle,
  foodLocation,
  isOpen,
  onOpenChange,
  onConfirm,
}: ClaimConfirmationDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Food Claim</AlertDialogTitle>
          <AlertDialogDescription>
            You're about to claim <span className="font-medium">{foodTitle}</span> from{" "}
            <span className="font-medium">{foodLocation}</span>. Are you sure?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-food-orange hover:bg-food-orange-light"
          >
            Confirm Claim
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClaimConfirmationDialog;
