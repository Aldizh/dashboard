import React, { useState, useEffect, useRef } from "react";
import { find, propEq } from "ramda";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useListPageContext } from "./context";
import { membershipTypes, currencies, countries } from "./mockData";
import "./styles.css";

const renderAction = () => <i className="material-icons">remove_red_eye</i>;

const MemberSetup = props => {
  const [name, setName] = useState("");
  const [annual_fee, setFee] = useState(0);
  const [membership_type, setType] = useState({ code: "" });
  const [country, setCountry] = useState({ code: "" });
  const [currency, setCurrency] = useState({ code: "" });

  const [data, dispatch] = useListPageContext();
  const { members } = data

  const formEl = useRef(null);

  const handleSubmit = e => {
    console.log("submitted");
  };

  const handleFormChange = (event, id) => {
    const fieldId = id || event.target.id;
    switch (fieldId) {
      case "name":
        setName(event.target.value);
        break;
      case "country":
        setCountry(find(propEq("code", event.target.value), countries));
        break;
      case "currency":
        setCurrency(find(propEq("code", event.target.value), currencies));
        break;
      case "annual_fee":
        setFee(event.target.value);
        break;
      case "membership_type":
        setType(find(propEq("code", event.target.value),
          membershipTypes
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
  };

  return (
    <div className="addMembershipSection">
      <h3>Add new member</h3>
      <form ref={formEl} onSubmit={handleSubmit}>
        <div className="col-1-1 addRowsDiv">
          <section className="col-1-6">
            <TextField
              label="Name"
              className={"nameField"}
              value={name}
              onChange={e => handleFormChange(e, "name")}
              helperText="Please select a name"
              margin="normal"
            />
          </section>
          <section className="col-1-6">
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
              {countries.map(option => (
                <MenuItem
                  id={`${option.code}_cntry`}
                  key={option.code}
                  value={option.code}
                >
                  {option.description}
                </MenuItem>
              ))}
            </TextField>
          </section>
          <section className="col-1-6">
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
              {membershipTypes.map(option => (
                <MenuItem
                  id={`${option.code}_membership`}
                  key={option.code}
                  value={option.code}
                >
                  {option.description}
                </MenuItem>
              ))}
            </TextField>
          </section>
          <section className="col-1-6">
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
              {currencies.map(option => (
                <MenuItem
                  id={`${option.code}_currency`}
                  key={option.code}
                  value={option.code}
                >
                  {option.description}
                </MenuItem>
              ))}
            </TextField>
          </section>
          <section className="col-1-6">
            <TextField
              placeholder={"Annual Fee"}
              label={"Annual Fee"}
              helperText="Please select annual fee"
              className={"annualFeeField"}
              onChange={e => handleFormChange(e, "annual_fee")}
              disabled={false}
            />
          </section>
          <section className="col-1-6">
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
          </section>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            className={"addButton"}
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MemberSetup;
