import { useState } from "react";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import Button from "@mui/material/Button";
import CarDialogContent from "./CarDialogContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCar } from "../utils/api";

export default function UpdateCar({ currentCar }) {
  const [car, setCar] = useState(currentCar);
  const [open, setOpen] = useState(false);

  const url = currentCar._links.self.href;
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateCar,
    onSuccess: () => queryClient.invalidateQueries(["cars"]),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCar({
      brand: "",
      model: "",
      color: "",
      fuel: "",
      modelYear: "",
      price: "",
    });
  };

  const handleChange = (event) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    updateMutation.mutate({ url, car });
    handleClose();
  };

  return (
    <>
      <Button onClick={handleClickOpen}>Update car</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
