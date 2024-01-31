import { useState } from "react"
import { Outlet } from "react-router-dom"
import ParticlesBg from "particles-bg"

import { StateProvider } from "./context/index"
import { generateData } from "./context/mockData"
import { capitalize } from "../../utils/string"
import FilterableList from "./FilterableList"
import { FilterType, Members } from "../../types/FilterTable"

// randomly generated data
// contains a list of objects in format: {code: string, description: string}
const [
  rows,
  countriesReference,
  membershipTypesReference,
  chipData
] = generateData()

const ListPage = (props: {
  classes: ClassesType
}) => {
  const [members, setMembers] = useState<Members>(rows)
  const [countryFilterData, setCountryFilterData] = useState(countriesReference)

  const [searchTextCountries, setSearchTextCountries] = useState("")
  const [searchTextMemberships, setSearchTextMemberships] = useState("")

  const isIchecked = (description: string) => {
    const index = chipData.map((chip) => chip.filterText).indexOf(description)
    return index !== -1
  }

  const handleSearch = (text: string, type: FilterType) => {
    switch (type) {
      case FilterType.country:
        setSearchTextCountries(text)
        setCountryFilterData(
          countriesReference.filter((country) =>
            country.description.includes(capitalize(text))
          )
        )
        break
      case FilterType.memberships:
        setSearchTextMemberships(text)
        break
      default:
        console.log("check the parameters of handleSearch")
    }
  }

  return (
    <StateProvider initialState={{ chips: chipData, members: rows }}>
      {
        <div className={props.classes.cardGrid}>
          <FilterableList
            countriesReference={countriesReference}
            membershipTypesReference={membershipTypesReference}
            handleSearch={handleSearch}
            isIchecked={isIchecked}
            searchTextCountries={searchTextCountries}
            countryFilterData={countryFilterData}
            searchTextMemberships={searchTextMemberships}
            setMembers={setMembers}
            members={members}
          />
          <ParticlesBg type="circle" bg={true} />
          <Outlet />
        </div>
      }
    </StateProvider>
  )
}

export default ListPage
