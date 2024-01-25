import { useState } from "react";
import { Theme, styled, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import Memberships from "../Memberships"
import Chips from "./Chips"
import FilterTable from "./FilterTable"
import SubList from "./SubList"
import Search from "../../shared/Search"
import { FilterType } from "../../../types/FilterTable"
import type { ReferenceData, Members } from "../../../types/FilterTable"

import "../styles.css"

const drawerWidth = 260;

type MainProps = {
  theme: Theme,
  open: boolean
}

const Main = styled("main")(
  ({ theme, open }: MainProps) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    })
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
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

  const theme = useTheme()
  
  const [open, setOpen] = useState(true);

  const handleToggle = () => setOpen(!open);

  return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          style={{
            padding: 5,
            flexShrink: 0,
            width: drawerWidth,
            boxSizing: "border-box",
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader className="leftDrawer">
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
        </Drawer>
        <Main open={open}>
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
          </div>
          <Chips members={members} />
          <FilterTable />
          <Memberships
            countriesReference={countriesReference}
            membershipTypesReference={membershipTypesReference}
          />
        </Main>
      </Box>
  );
}