import React, { useState, useEffect } from 'react'
import { find, propEq } from 'ramda'
import {
  FormControl,
  TextField,
  MenuItem,
  InputLabel,
  Input,
  Select,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

// local imports
import Toast from '../shared/Toast'
import { useListPageContext } from './context'
import infoIcon from '../../images/info.svg'
import './styles.css'

const theme = createTheme({
  palette: {
    secondary: {
      main: '#00FFFF',
    }
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

const MemberSetup = (props) => {
  const [toastList, setToastList] = useState([])
  const [name, setName] = useState('')
  const [annual_fee, setFee] = useState(0)
  const [membership_type, setType] = useState({ code: '' })
  const [country, setCountry] = useState({ code: '' })
  const [currency, setCurrency] = useState({ code: '' })
  const [from_date, setFromDate] = useState('')
  const [to_date, setToDate] = useState('')

  const { countriesReference, currenciesReference, membershipTypesReference } =
    props
  const [data, dispatch] = useListPageContext()
  const { members } = data

  useEffect(() => setDefaults(), [])

  const setDefaults = () => {
    setName('John')
    setFee(10)
    setCountry(countriesReference[0])
    setCurrency(currenciesReference[0])
    setType(membershipTypesReference[0])
    setFromDate('2021-05-24')
    setToDate('2022-05-24')
  }

  const handleFormChange = (event, id) => {
    const fieldId = id || event.target.id
    switch (fieldId) {
      case 'name':
        setName(event.target.value)
        break
      case 'country':
        setCountry(find(propEq('code', event.target.value), countriesReference))
        break
      case 'currency':
        setCurrency(
          find(propEq('code', event.target.value), currenciesReference)
        )
        break
      case 'annual_fee':
        setFee(event.target.value)
        break
      case 'membership_type':
        setType(
          find(propEq('code', event.target.value), membershipTypesReference)
        )
        break
      case 'from_date':
        setFromDate(event.target.value)
        break
      case 'to_date':
        setToDate(event.target.value)
        break
      default:
        break
    }
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const updatedMembers = members
    updatedMembers.push({
      name,
      annual_fee,
      from_date,
      to_date,
      country: country.description,
      membership_type: membership_type.description,
      currency: currency.description,
    })
    dispatch({ type: 'update_members', data: updatedMembers })
    setToastList([
      {
        id: 1,
        title: 'New member added',
        description: '',
        backgroundColor: '#3f51b5',
        icon: infoIcon,
      },
    ])
    setDefaults()
  }

  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <Toast
        toastList={toastList}
        position={'bottom-right'}
        autoDelete={true}
        autoDeleteTime={6000}
      />
      <h3>Add new member</h3>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            value={name}
            onChange={(e) => handleFormChange(e, 'name')}
          />
        </FormControl>
        <FormControl>
          <InputLabel id="country">Country</InputLabel>
          <Select
            labelId="country"
            id="country"
            value={country.code}
            onChange={(e) => handleFormChange(e, 'country')}
          >
            {countriesReference.map((option) => (
              <MenuItem
                id={`${option.code}_cntry`}
                key={option.code}
                value={option.code}
              >
                {option.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="membership">Type</InputLabel>
          <Select
            labelId="membership"
            id="membership"
            value={membership_type.code}
            onChange={(e) => handleFormChange(e, 'membership_type')}
          >
            {membershipTypesReference.map((option) => (
              <MenuItem
                id={`${option.code}_membership`}
                key={option.code}
                value={option.code}
              >
                {option.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="membership">Currency</InputLabel>
          <Select
            labelId="currency"
            id="currency"
            value={currency.code}
            onChange={(e) => handleFormChange(e, 'currency')}
          >
            {currenciesReference.map((option) => (
              <MenuItem
                id={`${option.code}_currency`}
                key={option.code}
                value={option.code}
              >
                {option.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="annual_fee">Annual Fee</InputLabel>
          <Input
            id="annual_fee"
            value={annual_fee}
            onChange={(e) => handleFormChange(e, 'annual_fee')}
            disabled={false}
          />
        </FormControl>
        <FormControl>
          <TextField
            id="from_date"
            label="From Date"
            type="date"
            value={from_date}
            onChange={(e) => handleFormChange(e, 'from_date')}
            InputLabelProps={{
              shrink: true,
            }}
            disabled={false}
          />
        </FormControl>
        <FormControl>
          <TextField
            id="to_date"
            label="To Date"
            type="date"
            value={to_date}
            onChange={(e) => handleFormChange(e, 'to_date')}
            InputLabelProps={{
              shrink: true,
            }}
            disabled={false}
          />
        </FormControl>
      </form>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleAdd}
        className={'addButton'}
      >
        Add
      </Button>
    </ThemeProvider>
  )
}

export default MemberSetup
