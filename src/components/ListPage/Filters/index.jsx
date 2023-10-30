import React, { useState } from 'react';
import { styled, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid'
import Divider from "@material-ui/core/Divider"
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Memberships from "../Memberships"
import Chips from "../Chips"
import FilterTable from "../../FilterTable"

import SubList from "./SubList"
import Search from "../../shared/Search"

import "../styles.css"

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Filters(props) {
  const {
    countryFilterData,
    currencyFilterData,
    setMembers,
    members,
    searchTextCountries,
    searchTextCurrencies,
    searchTextMemberships,
    countriesReference,
    currenciesReference,
    membershipTypesReference,
    handleSearch,
    isIchecked,
  } = props
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleToggle = () => setOpen(!open);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          padding: 5,
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader className="leftDrawer">
          <IconButton onClick={handleToggle}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div style={{padding: 5}}>
          <Search
            handleSearch={handleSearch}
            searchText={searchTextCountries}
            searchBy={"country"}
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
            searchText={searchTextCurrencies}
            searchBy={"currency"}
          />
          <SubList
            filterFacets={currencyFilterData}
            members={members}
            setMembers={setMembers}
            filterBy={"currency"}
            searchText={searchTextCurrencies}
            isIchecked={isIchecked}
          />
        </div>
        <Divider />
        <div style={{padding: 5}}>
          <Search
            handleSearch={handleSearch}
            searchText={searchTextMemberships}
            searchBy={"memberships"}
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
        <div style={{display: "inline-flex", flexDirection: "column"}}>
          <InputLabel>{open ? "Close" : "Open"} Filters</InputLabel>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleToggle}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Chips members={members} />
        </div>
        <FilterTable />
        <Grid
          item={true}
          container
          xs={12}
          justifyContent="center"
        >
          <Memberships
            countriesReference={countriesReference}
            currenciesReference={currenciesReference}
            membershipTypesReference={membershipTypesReference}
          />
        </Grid>
      </Main>
    </Box>
  );
}