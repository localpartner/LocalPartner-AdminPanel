import {FETCH_ATTRIBUTES,ADD_SPECIFICATION} from "../actions/index";
const initalState = {
    attributes :[]
}
export const staticData = (state = initalState, action) => {
    switch (action.type) {
        
        case FETCH_ATTRIBUTES: {
           let allAtrributes = action.payload;
           if(!allAtrributes){
            return {
                ...state, attributes: []               
                
            }
           }

           let attrs = allAtrributes.map((attr)=>{
                return {
                    "name": attr.name,
                    "description": attr.description,
                }

           })
            return {
                ...state, attributes: attrs               
                
            }
        }
        default:
            return state
    }
}