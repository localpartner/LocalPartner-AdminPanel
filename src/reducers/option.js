const initalState = {
    Option: []
}


export const option = (state = initalState, action) => {
    switch (action.type) {
        case "ADD_OPTION":
            const {
                type,


            } = action.payload
            return {
                ...state, Option: [
                    ...state.Option, {
                        type: type,
                    }
                ]
            }
        case "DELETE_OPTION":
            return {
                ...state,
                Option: [
                    ...state.Option.filter((todo) => todo.id !== action.id)
                ]
            }

        default:
            return state;
    }
}