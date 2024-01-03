import { Route, Routes } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline";

import Home from "./components/Main"
import StcokFetcher from "./components/StockFetcher"
import ListPage from "./components/ListPage"
import ExpandableTable from "./components/ExpandableTable"
import NavBar from "./components/NavBar"
import Footer from "./components/shared/Footer"
import { Container } from "semantic-ui-react";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    color: "#5b070a",
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    textAlign: "center",
    minHeight: "92vh",
    fontSize: "12px",
    padding: "10px",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardActions: {
    display: "flex",
    justifyContent: "center"
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    padding: theme.spacing(2),
    minHeight: "50px",
    backgroundColor: "#ffd8d8"
  }
}))

const App = () => {
  const classes = useStyles()

  return (
    <>
      <CssBaseline />
      <NavBar />
      <main>
        <Container maxWidth="md">
          <Routes>
            <Route path="/" element={<Home classes={classes}></Home>} />
            <Route path="stocks" element={<StcokFetcher classes={classes} />} />
            <Route path="expand_table" element={<ExpandableTable />} />
            <Route path="filter_table" element={<ListPage classes={classes} />} />
          </Routes>
        </Container>
      </main>
      <Footer classes={classes} stickyFooter={true} />
    </>
  )
}

export default App
