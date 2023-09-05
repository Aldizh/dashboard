import React, { useState } from "react"
import PropTypes from "prop-types"
import { Outlet } from "react-router-dom"
import ParticlesBg from "particles-bg"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import Memberships from "./Memberships"
import FilterTable from "../FilterTable"
import NavBar from "../NavBar"
import Footer from "../shared/Footer"
import Search from "../shared/Search"
import Toolbar from "./Chips"
import SubList from "./SubList"
import { StateProvider } from "./context/index"
import { ReactComponent as LeftArrow } from "./images/left_big.svg"
import { ReactComponent as RightArrow } from "./images/right_big.svg"
import { generateData } from "./context/mockData"
import { capitalize } from "../../utils/string"

// randomly generated data
// contains a list of objects in format: {code: String, description: String}
const [
  rows,
  countriesReference,
  currenciesReference,
  membershipTypesReference,
  chipData
] = generateData()

const ListPage = (props) => {
  const [members, setMembers] = useState(rows)
  const [countryFilterData, setCountryFilterData] = useState(countriesReference)
  const [currencyFilterData, setCurrencyFilterData] =
    useState(currenciesReference)

  const [searchTextCountries, setSearchTextCountries] = useState("")
  const [searchTextCurrencies, setSearchTextCurrencies] = useState("")
  const [searchTextMemberships, setSearchTextMemberships] = useState("")
  const [open, setOpen] = useState(false)
  const [sideWidth, setSideWidth] = useState("16.66%")
  const [mainWidth, setMinWidth] = useState("83.33%")
  const [rightIconVisibility, setIconVisibility] = useState("hidden")
  const [mainDisplay, setMainDisplay] = useState("inherit")

  const handleToggle = () => {
    setOpen(!open)
    setSideWidth(sideWidth === "16.66%" ? "3%" : "16.66%")
    setMinWidth(mainWidth === "83.33%" ? "97%" : "83.33%")
    setMainDisplay(mainDisplay === "none" ? "inherit" : "none")
    setIconVisibility(rightIconVisibility === "hidden" ? "visible" : "hidden")
  }

  const isIchecked = (description) => {
    const index = chipData.map((chip) => chip.filterText).indexOf(description)
    return index !== -1
  }

  const handleSearchCountries = (text) => {
    setSearchTextCountries(text)
    setCountryFilterData(
      countriesReference.filter((country) =>
        country.description.includes(capitalize(text))
      )
    )
  }

  const handleSearchCurrencies = (text) => {
    setSearchTextCurrencies(text)
    setCurrencyFilterData(
      currenciesReference.filter((curr) => curr.description.includes(text))
    )
  }

  const handleSearchMemberships = (text) => {
    setSearchTextMemberships(text)
  }

  return (
    <StateProvider initialState={{ chips: chipData, members: rows }}>
      {
         <>
         <CssBaseline />
         <NavBar />
         <div className={props.classes.app}>
          <Grid container>
            <Grid item xs={2}
              style={{
                width: sideWidth,
                overflowY: "scroll",
                maxHeight: "800px",
                padding: "10px"
              }}
            >
              <div style={Object.assign({}, { display: mainDisplay })}>
                <div className="sidebarHeader">
                  <div
                    style={{
                      float: "left",
                      padding: 5,
                      width: "50%",
                      textAlign: "left"
                    }}
                  >
                    Filters
                  </div>
                  <div
                    style={{
                      float: "right",
                      padding: 5,
                      width: "50%",
                      textAlign: "right"
                    }}
                  >
                    <LeftArrow onClick={handleToggle} alt="left" />
                  </div>
                </div>
                <Divider />
                <div>
                  <Search
                    handleSearch={handleSearchCountries}
                    searchText={searchTextCountries}
                    searchBy={"Country"}
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
                <div>
                  <Search
                    handleSearch={handleSearchCurrencies}
                    searchText={searchTextCurrencies}
                    searchBy={"Currency"}
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
                <div>
                  <Search
                    handleSearch={handleSearchMemberships}
                    searchText={searchTextMemberships}
                    searchBy={"Membership Type"}
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
              </div>
              <div
                style={Object.assign({}, { visibility: rightIconVisibility })}
              >
                <RightArrow
                  style={Object.assign({}, { float: "right" })}
                  onClick={handleToggle}
                  alt="right"
                />
              </div>
            </Grid>
            <Grid item xs={10}
              style={{
                width: mainWidth,
                overflowY: "scroll",
                maxHeight: "800px",
                padding: "10px"
              }}
            >
              <Toolbar members={members} />
              <FilterTable />
              <Grid container xs={12} justifyContent="center">
                <Memberships
                  countriesReference={countriesReference}
                  currenciesReference={currenciesReference}
                  membershipTypesReference={membershipTypesReference}
                />
              </Grid>
            </Grid>
          </Grid>
           <ParticlesBg type="circle" bg={true} />
           <Outlet />
         </div>
         <Footer classes={props.classes} />
       </>
      }
    </StateProvider>
  )
}

ListPage.propTypes = {
  classes: PropTypes.object
}

export default ListPage
