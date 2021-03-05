import React, { useState, useEffect } from 'react'
import { find, propEq } from 'ramda'
import {
  Grid,
  FormControl,
  TextField,
  MenuItem,
  InputLabel,
  Input,
  Select,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useListPageContext } from './context'
import './styles.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

const MemberSetup = (props) => {
  const [name, setName] = useState('')
  const [annual_fee, setFee] = useState(0)
  const [membership_type, setType] = useState({ code: '' })
  const [country, setCountry] = useState({ code: '' })
  const [currency, setCurrency] = useState({ code: '' })
  const [from_date, setFromDate] = useState('')

  const {
    countriesReference,
    currenciesReference,
    membershipTypesReference,
  } = props
  const [data, dispatch] = useListPageContext()
  const { members } = data

  useEffect(() => {
    setName('John')
    setFee(10)
    setCountry(countriesReference[0])
    setCurrency(currenciesReference[0])
    setType(membershipTypesReference[0])
    setFromDate('2021-05-24')
  }, [])

  const clearForm = () => {
    setName('')
    setFee(0)
    setType('')
    setCountry('')
    setCurrency('')
    setFromDate('')
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
      default:
        break
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    const updatedMembers = members
    updatedMembers.push({
      name: name,
      country: country.description,
      membership_type: membership_type.description,
      currency: currency.description,
      annual_fee: annual_fee,
      from_date: from_date,
      to_date: '30th Jun, 2021',
    })
    dispatch({ type: 'update_members', data: updatedMembers })
    clearForm()
  }

  const classes = useStyles()

  return (
    <div>
      <h3>Add new member</h3>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container justify="space-around">
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
        </Grid>
      </form>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={'addButton'}
      >
        Add
      </Button>
    </div>
  )
}

export default MemberSetup
