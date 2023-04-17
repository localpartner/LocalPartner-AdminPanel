const initalState = {
    Link: []
}


export const links = (state = initalState, action) => {
    switch (action.type) {
        case "ADD_LINKS":
            const {
            
                code,
                subCode,
                brandName

            } = action.payload;


            return {
                ...state, Link: [
                    ...state.Link, {
                        code: code,
                        subCode: subCode,
                        brandName: brandName
                    }
                ]
            }
        default:
            return state
    }
}