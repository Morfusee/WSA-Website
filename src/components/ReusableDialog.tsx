import {
  Dialog,
  colors,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function ReusableDialog({
  isDialogOpen,
  dialogAction,
  dialogTitle,
  dialogContentText,
  handleConfirm,
  handleCancel,
}: {
  isDialogOpen: boolean;
  dialogAction: any;
  dialogTitle: string;
  dialogContentText: string;
  handleConfirm: any;
  handleCancel: any;
}) {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={dialogAction}
      sx={{
        ".MuiDialog-paper": {
          borderRadius: "0.5rem",
          bgcolor: "primary.dark",
          color: colors.grey[800],
        },
      }}
    >
      <DialogTitle color={"whitesmoke"}>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText color={"whitesmoke"}>
          {dialogContentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          padding: "1rem",
        }}
      >
        <Button
          sx={{
            paddingX: "1rem",
            textTransform: "none",
            fontWeight: 600,
            color: colors.grey[400],
            "&:hover": {
              backgroundColor: colors.grey[300],
              color: colors.grey[800],
            },
          }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          sx={{
            textTransform: "none",
            fontWeight: 600,
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "background.default",
              color: "primary.main",
              boxShadow: "none",
            },
          }}
          variant="contained"
          onClick={handleConfirm}
          type="submit"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReusableDialog;
