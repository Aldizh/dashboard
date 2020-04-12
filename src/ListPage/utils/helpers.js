import { capitalize } from "./string";

const capitalized = text => capitalize(text);

export const getMatchingData = (text, data) =>
  data.filter(item => item.description.includes(capitalized(text)));
