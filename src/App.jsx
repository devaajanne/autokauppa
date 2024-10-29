import "./css/App.css";
import Container from "@mui/material/Container";
import CarList from "./components/CarList.jsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>Car shop</Typography>
          </Toolbar>
        </AppBar>
        <CarList />
      </Container>
    </QueryClientProvider>
  );
}
