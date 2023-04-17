const initalState = {
    Discount: []
}
export const discount = (state = initalState, action) => {
    switch (action.type) {
        case "ADD_DISCOUNT":
            const {
                startDate,
               
            } = action.payload
            return {
                ...state,
                Discount: [
                    ...state.Discount, {
                        startDate: startDate,
                    }

                ]

            }
        default:
            return state
    }


}