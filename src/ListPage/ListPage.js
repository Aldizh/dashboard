import React, { useState } from 'react'
import Divider from '@material-ui/core/Divider'
import Memberships from './Memberships'
import MuiTable from '../Components/MuiTable'
import Search from './Search'
import Toolbar from './toolbar'
import { getMatchingData } from './utils/helpers'
import SubList from './SubList'
import { StateProvider } from './context'
import { ReactComponent as LeftArrow } from './images/left_big.svg'
import { ReactComponent as RightArrow } from './images/right_big.svg'
import { generateData } from './mockData'

const ListPage = props => {
  const [rows, countriesReference, currenciesReference, membershipTypesReference, initialChipData] = generateData();
  const [members, setMembers] = useState(rows);
  const [chipData, setChipData] = useState(initialChipData);

  const [searchTextCountries, setSearchTextCountries] = useState('');
  const [searchTextCurrencies, setSearchTextCurrencies] = useState('');
  const [searchTextMemberships, setSearchTextMemberships] = useState('');
  const [open, setOpen] = useState(false);
  const [sideWidth, setSideWidth] = useState('16.66%');
  const [mainWidth, setMinWidth] = useState('83.33%');
  const [rightIconVisibility, setIconVisibility] = useState('hidden');
  const [mainDisplay, setMainDisplay] = useState('inherit');

  const handleToggle = () => {
    setOpen(!open);
    setSideWidth(sideWidth === '16.66%' ? '3%' : '16.66%');
    setMinWidth(mainWidth === '83.33%' ? '97%' : '83.33%');
    setMainDisplay(mainDisplay === 'none' ? 'inherit' : 'none');
    setIconVisibility(rightIconVisibility === 'hidden' ? 'visible' : 'hidden');
  };

  const isIchecked = description => {
    const index = chipData.map(chip => chip.filterText).indexOf(description);
    return index === -1 ? false : true;
  };

  const handleSearchCountries = text => {
    setSearchTextCountries(text);
  };

  const handleSearchCurrencies = text => {
    setSearchTextCurrencies(text);
  };

  const handleSearchMemberships = text => {
    setSearchTextMemberships(text);
  };

  return (
    <StateProvider initialState={{chips: initialChipData, members: rows}}>
      {<div className='col-1-1 mainContent'>
        <div
          className='col-2-12'
          style={{ width: sideWidth, overflowY: 'scroll', maxHeight: '780px', padding: '10px' }}
        >
          <div style={Object.assign({}, { display: mainDisplay })}>
            <div className="sidebarHeader">
              <div
                style={Object.assign(
                  {},
                  { float: 'left', padding: 5, width: '50%', textAlign: 'left' }
                )}
              >
                Filters
              </div>
              <div
                style={Object.assign(
                  {},
                  { float: 'right', padding: 5, width: '50%', textAlign: 'right' }
                )}>
                <LeftArrow
                  onClick={handleToggle}
                  alt='left'
                />
              </div>
            </div>
            <Divider />
            <div>
              <Search
                handleSearch={handleSearchCountries}
                searchText={searchTextCountries}
                searchBy={'Country'}
              />
              <SubList
                filterFacets={countriesReference}
                members={members}
                filterBy={'country'}
                searchText={searchTextCountries}
                isIchecked={isIchecked}
              />
            </div>
            <Divider />
            <div>
              <Search
                handleSearch={handleSearchCurrencies}
                searchText={searchTextCurrencies}
                searchBy={'Currency'}
              />
              <SubList
                filterFacets={currenciesReference}
                members={members}
                filterBy={'currency'}
                searchText={searchTextCurrencies}
                isIchecked={isIchecked}
              />
            </div>
            <Divider />
            <div>
              <Search
                handleSearch={handleSearchMemberships}
                searchText={searchTextMemberships}
                searchBy={'Membership Type'}
              />
              <SubList
                filterFacets={membershipTypesReference}
                members={members}
                filterBy={'membership_type'}
                searchText={searchTextMemberships}
                isIchecked={isIchecked}
              />
            </div>
          </div>
          <div style={Object.assign({}, { visibility: rightIconVisibility })}>
            <h3 />
            <RightArrow
              style={Object.assign({}, { float: 'right' })}
              onClick={handleToggle}
              alt='right'
            />
          </div>
        </div>
        <div
          className='col-10-12'
          style={{
            width: mainWidth,
            marginLeft: '3%',
            position: 'relative'
          }}
        >
          <Toolbar members={members} />
          <MuiTable />
        </div>
      </div>}
      <Memberships />
    </StateProvider>
  );
};

export default ListPage;
