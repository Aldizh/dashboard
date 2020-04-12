import React, { useState, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import Memberships from "./Memberships";
import MuiTable from "./MuiTable"
import Search from "./Search";
import Toolbar from "./toolbar";
import Style from "./styles";
import { getMatchingData } from "./utils/helpers";
import SubList from "./SubList";
import { StateProvider } from "./context";
import leftSvg from './images/left_big.svg'
import rightSvg from './images/right_big.svg'
import {
  countries as initialCountries,
  currencies as initialCurrencies,
  membershipTypes as initialMembershipTypes,
  chipData as initialChipData,
  initialMembers
} from "./mockData";


const ListPage = props => {
  const [members, setMembers] = useState(initialMembers);
  const [countries, setCountries] = useState(
    initialCountries || props.countries
  );
  const [currencies, setCurrencies] = useState(
    initialCurrencies || props.currencies
  );
  const [membershipTypes, setMembershipTypes] = useState(
    initialMembershipTypes || props.membershipTypes
  );
  const [chipData, setChipData] = useState(initialChipData || props.chipData);

  const [searchTextCountries, setSearchTextCountries] = useState("");
  const [searchTextCurrencies, setSearchTextCurrencies] = useState("");
  const [searchTextMemberships, setSearchTextMemberships] = useState("");
  const [open, setOpen] = useState(false);
  const [sideWidth, setSideWidth] = useState("16.66%");
  const [mainWidth, setMinWidth] = useState("83.33%");
  const [rightIconVisibility, setIconVisibility] = useState("hidden");
  const [mainDisplay, setMainDisplay] = useState("inherit");

  const handleToggle = () => {
    console.log("side width: ", sideWidth);
    setOpen(!open);
    setSideWidth(sideWidth === "16.66%" ? "3%" : "16.66%");
    setMinWidth(mainWidth === "83.33%" ? "97%" : "83.33%");
    setMainDisplay(mainDisplay === "none" ? "inherit" : "none");
    setIconVisibility(rightIconVisibility === "hidden" ? "visible" : "hidden");
  };

  const isIchecked = description => {
    const index = chipData.map(chip => chip.filterText).indexOf(description);
    return index === -1 ? false : true;
  };

  const handleSearchCountries = text => {
    const matchedCountries = text
      ? getMatchingData(text, countries)
      : initialCountries;
    setSearchTextCountries(text);
    setCountries(matchedCountries);
  };

  const handleSearchCurrencies = text => {
    const matchedCurrencies = text
      ? getMatchingData(text, currencies)
      : initialCurrencies;
    setSearchTextCurrencies(text);
    setCurrencies(matchedCurrencies);
  };

  const handleSearchMemberships = text => {
    const matchedMembershipTypes = text
      ? getMatchingData(text, membershipTypes)
      : initialMembershipTypes;
    setSearchTextMemberships(text);
    setMembershipTypes(matchedMembershipTypes);
  };

  return (
    <StateProvider initialState={{chips: initialChipData, members: initialMembers}}>
      <div className="col-1-1" style={{ display: "flex", background: '#fff' }}>
        <div
          className="col-2-12"
          style={{ width: sideWidth, overflowY: "scroll", maxHeight: "850px", padding: "10px" }}
        >
          <div style={Object.assign({}, { display: mainDisplay })}>
            <div style={{ position: "relative", top: 8 }}>
              <h3
                style={Object.assign(
                  {},
                  { display: "inline-block", marginLeft: 12 }
                )}
              >
                Filters
              </h3>
              <img
                style={Object.assign({}, { marginTop: 12, float: "right" })}
                src={leftSvg}
                alt="left"
                onClick={handleToggle}
              />
              <Divider />
            </div>
            <div style={Object.assign({}, { minHeight: "30%" })}>
              <h3 style={Style.sideHeader}>Country Filter</h3>
              <Search
                handleSearch={handleSearchCountries}
                searchText={searchTextCountries}
              />
              <SubList
                data={countries}
                filterBy={"countries"}
                searchText={searchTextCountries}
                isIchecked={isIchecked}
              />
            </div>
            <Divider />
            <div style={Object.assign({}, { minHeight: "25%" })}>
              <h3 style={Style.sideHeader}>Currency Filter</h3>
              <Search
                handleSearch={handleSearchCurrencies}
                searchText={searchTextCurrencies}
              />
              <SubList
                data={currencies}
                filterBy={"currency"}
                searchText={searchTextCurrencies}
                isIchecked={isIchecked}
              />
            </div>
            <Divider />
            <div style={Object.assign({}, { minHeight: "30%" })}>
              <h3 style={Style.sideHeader}>Membership Type Filter</h3>
              <Search
                handleSearch={handleSearchMemberships}
                searchText={searchTextMemberships}
              />
              <SubList
                data={membershipTypes}
                filterBy={"membership_type"}
                searchText={searchTextMemberships}
                isIchecked={isIchecked}
              />
            </div>
          </div>
          <div style={Object.assign({}, { visibility: rightIconVisibility })}>
            <h3 />
            <img
              style={Object.assign({}, { float: "right" })}
              src={rightSvg}
              alt="right"
              onClick={handleToggle}
            />
          </div>
        </div>
        <div
          className="col-10-12"
          style={Object.assign(
            {},
            {
              overflow: "auto",
              width: mainWidth,
              marginLeft: "3%",
              position: "relative"
            }
          )}
        >
          <Toolbar />
          <MuiTable />
          <Memberships />
        </div>
      </div>
    </StateProvider>
  );
};

export default ListPage;
