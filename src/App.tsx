import { Route, Routes } from "react-router-dom"
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box"
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Home from "./components/Main"
import StcokFetcher from "./components/StockFetcher"
import ListPage from "./components/ListPage"
import ExpandableTable from "./components/ExpandableTable"
import NavBar from "./components/NavBar"
import Footer from "./components/shared/Footer"

const App = () => {

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#00FFFF"
      },
      background: {
        paper: "#ffd8d8"
      },
      info: {
        main: "#000000"
      }
    }
  })

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Box sx={{
          textAlign: "center"
        }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="stocks" element={<StcokFetcher />} />
            <Route path="expand_table" element={<ExpandableTable />} />
            <Route path="filter_table" element={<ListPage />} />
          </Routes>
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App
