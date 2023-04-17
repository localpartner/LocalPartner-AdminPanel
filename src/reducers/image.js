const initalState = {
    Image: []
}

export const image = (state = initalState, action) => {
    switch (action.type) {
        case "ADD_IMAGE":
            const {
                name,
                content
            } = action.payload
            return {
                ...state,
                Image: [
                    ...state.Image, {
                        name: name,
                      
                        content: content

                    }


                ]

            }
        default:
            return state
    }

}