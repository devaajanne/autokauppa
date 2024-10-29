import { useState } from "react";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import Button from "@mui/material/Button";
import CarDialogContent from "./CarDialogContent";

export default function AddCar({ addCar }) {
  const [car, setCar] = useState({
    brand: "",
    model: "",
    color: "",
    fuel: "",
    modelYear: "",
    price: "",
  });

  const [open, setOpen] = useState(false);

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
    addCar(car);
    handleClose();
  };

  return (
    <>
      <Button onClick={handleClickOpen}>Add car</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
