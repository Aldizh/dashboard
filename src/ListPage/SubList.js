import React, {useState} from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { useListPageContext } from "./context"

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const SectionList = (props) => {
  const { classes, data, filterBy, isIchecked } = props;

  const [state, setState] = useState({
    checked: [0]
  });

  const [{chips}, dispatch] = useListPageContext();

  const toggleChips = chip => {
    let newchips = chips;
    const index = newchips.findIndex(item => chip.code === item.code);
    if (index === -1) {
      newchips.push(chip);
    } else {
      newchips.splice(index, 1);
    }
    dispatch({ type: 'update_chips', data: newchips })
  };

  const handleToggle = (item, filterBy) => () => {
    const { checked } = state;
    const index = checked.indexOf(item.code);
    const newChecked = [...checked];

    if (index === -1) {
      newChecked.push(item.code);
    } else {
      newChecked.splice(index, 1);
    }

    setState({
      checked: newChecked
    });

    toggleChips({
      filterBy: filterBy,
      filterText: item.description,
      code: item.code
    });
  };

  return (
    <List className={classes.root}>
      {data.map(item => (
        <ListItem
          key={item.code}
          dense
          button
          onClick={handleToggle(item, filterBy)}
        >
          <Checkbox
            checked={isIchecked(item.description)}
            tabIndex={-1}
            disableRipple
          />
          <ListItemText primary={`(${item.code}) ${item.description}`} />
        </ListItem>
      ))}
    </List>
  );
}

SectionList.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  searchText: PropTypes.string,
  filterBy: PropTypes.string,
  toggleChips: PropTypes.func,
  fetchMembershipDetails: PropTypes.func,
  isIchecked: PropTypes.func
};

export default withStyles(styles)(SectionList);
// <List style={Object.assign({}, Style.SectionList)}>
//   {props.data.map((item, index) => {
//     if (
//       item.description
//         .toLowerCase()
//         .indexOf(props.searchText.toLowerCase()) !== -1
//     ) {
//       return (
//         <ListItem
//           style={{ fontSize: 12 }}
//           key={index}
//           leftCheckbox={
//             <Checkbox
//               onCheck={event => {
//                 props.toggleChips(
//                   item.code,
//                   item.description,
//                   props.filterBy
//                 );
//                 // props.fetchMembershipDetails();
//               }}
//               defaultChecked={props.isIchecked(item.description)}
//             />
//           }
//           primaryText={item}
//         />
//       );
//     } else {
//       return <div>{item}</div>;
//     }
//   })}
// </List>
