import { combineReducers } from "redux";
import user from "./userReducer";
import orders from "./ordersReducer";
import products from "./productsReducer";
import companies from "./companyReducer";
import categories from "./categoryReducer";
import units from "./unitReducer";
import forms from "./formReducer";
import { localizeReducer } from "react-localize-redux";

const allReducers = combineReducers({
  user,
  orders,
  localize: localizeReducer,
  products,
  companies,
  categories,
  units,
  forms
});

export default allReducers;
