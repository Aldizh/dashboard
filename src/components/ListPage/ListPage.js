import React, { useState } from "react"
import PropTypes from "prop-types"
import { Outlet } from "react-router-dom"
import ParticlesBg from "particles-bg"
import CssBaseline from "@material-ui/core/CssBaseline"
import NavBar from "../NavBar"
import Footer from "../shared/Footer"
import { StateProvider } from "./context/index"
import { generateData } from "./context/mockData"
import { capitalize } from "../../utils/string"
import Filters from "./Filters"

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

  const isIchecked = (description) => {
    const index = chipData.map((chip) => chip.filterText).indexOf(description)
    return index !== -1
  }

  const handleSearch = (text, type) => {
    switch (type) {
      case "country":
        setSearchTextCountries(text)
        setCountryFilterData(
          countriesReference.filter((country) =>
            country.description.includes(capitalize(text))
          )
        )
        break
      case "currency":
        setSearchTextCurrencies(text)
        setCurrencyFilterData(
          currenciesReference.filter((curr) => curr.description.includes(text))
        )
        break
      case "memberships":
        setSearchTextMemberships(text)
        break
      default:
        console.log("check the parameters of handleSearch")
    }
  }

  return (
    <StateProvider initialState={{ chips: chipData, members: rows }}>
      {
        <>
          <CssBaseline />
          <NavBar />
          <div className={props.classes.app}>
            <Filters
              countriesReference={countriesReference}
              membershipTypesReference={membershipTypesReference}
              currenciesReference={currenciesReference}
              handleSearch={handleSearch}
              isIchecked={isIchecked}
              searchTextCountries={searchTextCountries}
              countryFilterData={countryFilterData}
              currencyFilterData={currencyFilterData}
              searchTextCurrencies={searchTextCurrencies}
              searchTextMemberships={searchTextMemberships}
              setMembers={setMembers}
              members={members}
            />
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
