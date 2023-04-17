import { combineReducers } from "redux";
import general from "./general"
import { stock } from "./stock";
import { image } from "./image";
import { special } from "./special"
import { discount } from "./discount";
import { specification } from "./specification";
import { links } from "./links";
import { option } from "./option";
import { product } from "./product";
import { specialProduct } from "./specialProduct";

import { staticData } from "./staticData"
const rootReducer = combineReducers({
    general, stock, image, special, specification, links,staticData,product,featured:specialProduct
    //add more reducer here
});
export default rootReducer;