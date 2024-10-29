import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCar from "./AddCar";
import UpdateCar from "./UpdateCar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCars, addCar, deleteCar } from "../utils/api";

function CarList() {
  const queryClient = useQueryClient();

  const { data: cars } = useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
  });

  const addMutation = useMutation({
    mutationFn: addCar,
    onSuccess: () => queryClient.invalidateQueries(["cars"]),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => queryClient.invalidateQueries(["cars"]),
  });

  const [columnDefs, setColumnDefs] = useState([
    { field: "brand", sort: "asc" },
    { field: "model" },
    { field: "color" },
    { field: "fuel" },
    { field: "modelYear", headerName: "Year" },
    { field: "price" },
    {
      field: "_links.self.href",
      sortable: false,
      filter: false,
      headerName: "",
      cellRenderer: (params) => <UpdateCar currentCar={params.data} />,
    },
    {
      field: "_links.self.href",
      sortable: false,
      filter: false,
      headerName: "",
      cellRenderer: (params) => (
        <Button
          onClick={() => deleteMutation.mutate(params.data._links.self.href)}>
          Delete
        </Button>
      ),
    },
  ]);

  const defaultColDef = {
    sortable: true,
    filter: true,
  };

  const autoSizeStrategy = {
    type: "fitCellContents",
  };

  useEffect(() => fetchCars, []);

  return (
    <div className='CarList'>
      <AddCar addCar={(car) => addMutation.mutate(car)} />
      <div className='ag-theme-material' style={{ width: 1500, height: 700 }}>
        <AgGridReact
          autoSizeStrategy={autoSizeStrategy}
          rowData={cars}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          accentedSort={true}
        />
      </div>
    </div>
  );
}

export default CarList;
