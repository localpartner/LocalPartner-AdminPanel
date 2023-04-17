import {FETCH_ATTRIBUTES,ADD_SPECIFICATION} from "./../actions/index";
const initalState = {
    Specification: []
}
export const specification = (state = initalState, action) => {
    switch (action.type) {
        case ADD_SPECIFICATION: {
            const {
                code,
                value

            } = action.payload;
            return {
                ...state, Specification: [
                    ...state.Specification, {
                        code: code,
                        value: value

                    }
                ]
            }
        }
       
        default:
            return state
    }
}