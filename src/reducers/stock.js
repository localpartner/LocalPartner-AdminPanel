
const initalState = {
    Stock: []
}

export const stock = (state = initalState, action) => {
    switch (action.type) {
        case "ADD_STOCK":
            const {
                dateAvailable,
                quantity,



            } = action.payload
            return {
                ...state,
                Stock: [
                    ...state.Stock, {
                        dateAvailable: dateAvailable,
                        quantity: quantity,


                    }


                ]

            }
        default:
            return state
    }

}