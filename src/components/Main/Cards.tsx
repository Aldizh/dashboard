import { ReactElement } from "react"
import { Grid } from "@mui/material"

const MainGrid = ({ children }: { children: ReactElement[] }) => {
  const [stocks, filterList, expandList] = children
 
  return (
   <Grid container>
    <Grid item xs={12} sm={6} md={4} lg={4} p={2}>
      {stocks}
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={4} p={2}>
      {filterList}
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={4} p={2}>
      {expandList}
    </Grid>
   </Grid>
  ) 
 }

 export default MainGrid