import { useState } from "react";
import { styled, useTheme } from "@mui/system"
import { Theme } from "@mui/material"
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/CloseSharp";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Memberships from "../Memberships"
import Chips from "./Chips"
import FilterTable from "./FilterTable"
import SubList from "./SubList"
import Search from "../../shared/Search"
import { FilterType } from "../../../types/FilterTable"
import type { ReferenceData, Members } from "../../../types/FilterTable"

import "../styles.css"

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  justifyContent: "flex-end",
}));

export default function Filters (props: {
  countriesReference: ReferenceData[],
  members: Members,
  setMembers: (members: Members) => void,
  membershipTypesReference: ReferenceData[],
  countryFilterData: ReferenceData[],
  searchTextCountries: string,
  searchTextMemberships: string,
  handleSearch: (text: string, type: FilterType) => void,
  isIchecked: (description: string) => boolean,
}) {
  const {
    countryFilterData,
    setMembers,
    members,
    searchTextCountries,
    searchTextMemberships,
    countriesReference,
    membershipTypesReference,
    handleSearch,
    isIchecked,
  } = props

  const theme: Theme = useTheme()
  
  const [open, setOpen] = useState(true);

  const handleToggle = () => setOpen(!open);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <Drawer
        sx={{
          flexShrink: 0,
          boxSizing: "border-box",
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <Box
          sx={(theme) => ({
            width: 300,
            backgroundColor: theme.palette.grey[100],
          })}
          role="presentation"
        >
          <DrawerHeader className="drawerManageIcon">
            <IconButton onClick={handleToggle}>
              {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <div style={{padding: 5}}>
            <Search
              handleSearch={handleSearch}
              searchText={searchTextCountries}
              searchBy={FilterType.country}
            />
            <SubList
              filterFacets={countryFilterData}
              members={members}
              setMembers={setMembers}
              filterBy={"country"}
              searchText={searchTextCountries}
              isIchecked={isIchecked}
            />
          </div>
          <Divider />
          <div style={{padding: 5}}>
            <Search
              handleSearch={handleSearch}
              searchText={searchTextMemberships}
              searchBy={FilterType.memberships}
            />
            <SubList
              filterFacets={membershipTypesReference}
              members={members}
              setMembers={setMembers}
              filterBy={"membership_type"}
              searchText={searchTextMemberships}
              isIchecked={isIchecked}
            />
          </div>
          <Divider />
        </Box>
      </Drawer>
      <Box sx={{ padding: 2 }}>
        <div className="centerControl">
          <InputLabel
            className="burgerLabel"
            disableAnimation={true}
          >{open ? "Close" : "Open"} Filters</InputLabel>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleToggle}
            edge="start"
            style={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="close drawer"
            onClick={handleToggle}
            edge="start"
            style={{
              marginRight: 5,
              ...(!open && { display: "none" }),
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Chips members={members} />
        <FilterTable />
        <Memberships
          countriesReference={countriesReference}
          membershipTypesReference={membershipTypesReference}
        />
      </Box>
    </Box>
  );
}