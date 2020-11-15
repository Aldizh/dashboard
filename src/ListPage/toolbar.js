import React, { useState } from "react";
import { find, propEq } from "ramda";
import { PropTypes } from "prop-types";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import { useListPageContext } from "./context";
import Style from "./styles";
import "./styles.css";

const styles = {
  chip: {
    backgroundColor: "#f5f5f5"
  },
  label: {
    fontSize: 10
  },
  img: {
    paddingLeft: 3
  }
};

const calcuateFilteredData = (chips, members) => {
  if (!chips.length) return members
  let newMembers = []
  chips.forEach((currChip) => {
    const member = find(propEq(currChip.filterBy, currChip.code), members) || find(propEq(currChip.filterBy, currChip.filterText), members)
    if (member) newMembers.push(member)
  })
  return newMembers
}


const ToolbarComponent = ({members}) => {
  const [data, dispatch] = useListPageContext();
  const { chips = [] } = data

  const toggleChips = chip => {
    let newchips = chips;
    const index = newchips.findIndex(item => chip.code === item.code);
    if (index === -1) {
      newchips.push(chip);
    } else {
      newchips.splice(index, 1);
    }
    dispatch({ type: 'update_chips', data: newchips })
    dispatch({ type: 'update_members', data: calcuateFilteredData(newchips, members) })
  };

  return (
    <React.Fragment>
      <div className="col-1-1 tableHeader">
        <div className="toolbar">
          <div className="wrapper">
            {chips.map(chip => (
              <Chip
                key={chip.code}
                label={chip.filterText}
                onClick={() => {
                  toggleChips(chip);
                }}
                className={"memberChip"}
              >
                <img
                  style={styles.img}
                  src="/images/close-circle.png"
                  alt="Remove Chip Icon"
                  onTouchTap={() => {
                    toggleChips(chip)
                  }}
                />
              </Chip>
            ))}
          </div>
        </div>
        <div
          className="col-1-4"
          style={Object.assign({}, Style.membershipButton)}
        >
          <Button
            label="Add"
            color="primary"
            style={{ marginRight: 25 }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

ToolbarComponent.propTypes = {
  data: PropTypes.array,
  toggleChips: PropTypes.func,
};

export default ToolbarComponent;
