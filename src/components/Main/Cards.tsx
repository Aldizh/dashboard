import React, { ReactElement } from "react"
import { Grid } from "@material-ui/core"

const MainGrid = ({ children }: { children: ReactElement[] }) => {
  const [stocks, filterList, expandList] = children
 
  return (
   <Grid container spacing={4}>
     {stocks}
     {filterList}
     {expandList}
   </Grid>
  ) 
 }

 export default MainGrid