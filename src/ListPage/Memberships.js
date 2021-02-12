import React, { useState } from "react";
import { find, propEq } from "ramda";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { useListPageContext } from "./context";
import "./styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const MemberSetup = props => {
  const [name, setName] = useState("");
  const [annual_fee, setFee] = useState(0);
  const [membership_type, setType] = useState({ code: "" });
  const [country, setCountry] = useState({ code: "" });
  const [currency, setCurrency] = useState({ code: "" });

  const { countriesReference, currenciesReference, membershipTypesReference } = props
  const [data, dispatch] = useListPageContext();
  const { members } = data

  const clearForm = () => {
    setName("")
    setFee(0)
    setType("")
    setCountry("")
    setCurrency("")
  }

  const handleFormChange = (event, id) => {
    const fieldId = id || event.target.id;
    switch (fieldId) {
      case "name":
        setName(event.target.value);
        break;
      case "country":
        setCountry(find(propEq("code", event.target.value), countriesReference));
        break;
      case "currency":
        setCurrency(find(propEq("code", event.target.value), currenciesReference));
        break;
      case "annual_fee":
        setFee(event.target.value);
        break;
      case "membership_type":
        setType(find(propEq("code", event.target.value),
          membershipTypesReference
        ));
        break;
      default:
        break;
    }
  };

  const handleClick = e => {
    e.preventDefault();
    const updatedMembers = members;
    updatedMembers.push({
      name: name,
      country: country.description,
      membership_type: membership_type.description,
      currency: currency.description,
      annual_fee: annual_fee,
      from_date: "30th Jun, 2016",
      to_date: "30th Jun, 2017"
    });
    dispatch({ type: 'update_members', data: updatedMembers })
    clearForm()
  };

  const classes = useStyles();

  return (
    <div>
      <h3>Add new member</h3>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          label="Name"
          className={"nameField"}
          value={name}
          onChange={e => handleFormChange(e, "name")}
          helperText="Please select a name"
          margin="normal"
        />
        <TextField
          select
          label="Country"
          placeholder={"Country"}
          className={"countryField"}
          value={country.code}
          onChange={e => handleFormChange(e, "country")}
          helperText="Please select a country"
          margin="normal"
        >
          {countriesReference.map(option => (
            <MenuItem
              id={`${option.code}_cntry`}
              key={option.code}
              value={option.code}
            >
              {option.description}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          id="membership"
          label="Membership"
          placeholder={"Membership"}
          className={"membershipField"}
          value={membership_type.code}
          onChange={e => handleFormChange(e, "membership_type")}
          helperText="Please select membership type"
          margin="normal"
        >
          {membershipTypesReference.map(option => (
            <MenuItem
              id={`${option.code}_membership`}
              key={option.code}
              value={option.code}
            >
              {option.description}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Currency"
          placeholder={"Currency"}
          className={"currencyField"}
          value={currency.code}
          onChange={e => handleFormChange(e, "currency")}
          helperText="Please select your currency"
          margin="normal"
        >
          {currenciesReference.map(option => (
            <MenuItem
              id={`${option.code}_currency`}
              key={option.code}
              value={option.code}
            >
              {option.description}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          placeholder={"Annual Fee"}
          label={"Annual Fee"}
          helperText="Please select annual fee"
          className={"annualFeeField"}
          onChange={e => handleFormChange(e, "annual_fee")}
          disabled={false}
        />
        <TextField
          id="from_date"
          label="From Date"
          placeholder="From Date"
          type="date"
          helperText="Please select from date"
          defaultValue="2019-03-01"
          className={"datePickerField"}
          InputLabelProps={{
            shrink: true
          }}
        />
      </form>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={"addButton"}
      >
        Add
      </Button>
    </div>
  );
};

export default MemberSetup;
