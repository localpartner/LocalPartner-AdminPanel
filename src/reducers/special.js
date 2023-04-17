const initalState = {
    Special: []
}

export const special = (state = initalState, action) => {
    switch (action.type) {
        case "ADD_SPECIAL":
            const {
                startDate,
                price,
                endDate
            } = action.payload
            return {
                ...state,
                Special: [
                    ...state.Special, {
                        startDate: startDate,
                        price: price,
                        endDate: endDate
                    }


                ]

            }
        default:
            return state
    }

}