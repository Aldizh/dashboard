import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import Select from "@material-ui/core/Select"
import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import currencyMap from "country-currency-map"

// local imports
import type { Member } from "../../types/FilterTable"
import type { ToastType } from "../../types/Toast"
import Toast from "../shared/Toast"
import { useListPageContext } from "./context"
import infoIcon from "../../images/info.svg"
import "./styles.css"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}))

const MemberSetup = (props: {
  countriesReference: Array<ReferenceData>,
  membershipTypesReference: Array<ReferenceData>,
}) => {
  const [toastList, setToastList] = useState<[ToastType] | []>([]);
  const [name, setName] = useState("")
  const [annual_fee, setFee] = useState("")
  const [membership_type, setType] = useState({ code: "", description: "" })
  const [country, setCountry] = useState({ code: "", description: "" })
  const [currency, setCurrency] = useState({ code: "", description: "" })
  const [from_date, setFromDate] = useState("")
  const [to_date, setToDate] = useState("")

  const { countriesReference, membershipTypesReference } = props
  const [data, dispatch] = useListPageContext()
  const { members } = data

  useEffect(() => setDefaults(), [])

  const setDefaults = () => {
    setName("John")
    setFee("10")
    setCountry(countriesReference[0])
    setCurrency({ code: "USD", description: "USD" })
    setType(membershipTypesReference[0])
    setFromDate("2021-05-24")
    setToDate("2022-05-24")
  }

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
    const fieldId = id || event.target.id
    switch (fieldId) {
      case "name":
        setName(event.target.value)
        break
      case "annual_fee":
        setFee(event.target.value)
        break
      case "from_date":
        setFromDate(event.target.value)
        break
      case "to_date":
        setToDate(event.target.value)
        break
      default:
        break
    }
  }

  const handleSelectChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>, id: string) => {
    const fieldId = id
    switch (fieldId) {
      case "country":
        const matchingCountry = countriesReference.find(country => country.code === event.target.value)
        if (matchingCountry) {
          setCountry(matchingCountry)

          const currency = currencyMap.getCurrencyAbbreviation(matchingCountry.code)
          setCurrency({ code: currency, description: currency })
        }

        break
      case "membership_type":
        const matchingType = membershipTypesReference.find(membership => membership.code === event.target.value)
        if (matchingType) setType(matchingType)
        break
      default:
        break
    }
  }

  const handleAdd = (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const updatedMembers = [...members]
    const memberToAdd: Partial<Member> = {
      name,
      annual_fee,
      from_date,
      to_date,
      country: country.description,
      membership_type: membership_type.description,
      currency: currency.description
    }
    updatedMembers.push(memberToAdd)
    dispatch({ type: "update_members", data: updatedMembers })
    const toastList: [ToastType] | [] = [{
      id: 1,
      title: "New member added",
      description: "",
      backgroundColor: "#212b63",
      icon: infoIcon
    }]
    setToastList(toastList)
    setDefaults()
  }

  const classes = useStyles()

  return (
    <>
      <Toast
        toastList={toastList}
        position={"bottom-right"}
        autoDelete={true}
        autoDeleteTime={6000}
      />
      <Grid
        container
        justifyContent='center'
      >
        <h3>Add new member</h3>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <form className={classes.root} noValidate autoComplete="off">
            <FormControl>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                value={name}
                onChange={(e) => handleFormChange(e, "name")}
              />
            </FormControl>
            <FormControl>
              <InputLabel id="country">Country</InputLabel>
              <Select
                labelId="country"
                id="country"
                value={country.code}
                onChange={(e) => handleSelectChange(e, "country")}
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
                onChange={(e) => handleSelectChange(e, "membership_type")}
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
              <TextField
                id="currency"
                label="Currency"
                type="currency"
                value={currency.code}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="annual_fee">Annual Fee</InputLabel>
              <Input
                id="annual_fee"
                value={annual_fee}
                onChange={(e) => handleFormChange(e, "annual_fee")}
                disabled={false}
              />
            </FormControl>
            <FormControl>
              <TextField
                id="from_date"
                label="From Date"
                type="date"
                value={from_date}
                onChange={(e) => handleFormChange(e, "from_date")}
                InputLabelProps={{
                  shrink: true
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
                onChange={(e) => handleFormChange(e, "to_date")}
                InputLabelProps={{
                  shrink: true
                }}
                disabled={false}
              />
            </FormControl>
          </form>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item={true} xs={12} sm={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAdd}
            className={"addButton"}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default MemberSetup
