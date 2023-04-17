import * as ProductActions from "./../actions/productConfigActions";
const initalState = {
    originalSpecialProducts:[],
    specialProducts:[],
    workingData : {},
    manageDialogBox:false,
    editIndex: -1,
}
export const specialProduct = (state = initalState, action) => {
    switch (action.type) {
        case ProductActions.SET_SPECIAL_PRODUCT_DAILOG: return setManageDialog(action, state);
        case ProductActions.ADD_SPECIAL_PRODUCT: return addManage(action, state)
        case ProductActions.SET_SPECIAL_PRODUCT: return setManage(action, state);
        case ProductActions.SET_SPECIAL_PRODUCT_DATA: return setManageData(action, state)
        case ProductActions.SET_EDIT_INDEX: return setEditIndex(action, state);
        default:
            return state
    }
}

const setManageData = (action, state) => {
    return {
        ...state, workingData: action.payload
    }
}
const setManageDialog = (action, state) => {
    return {
        ...state, manageDialogBox: action.payload
    }
} 

const setManage = (action, state) => {
    let working = [...action.payload]  
    // working.manages = 
    return {
        ...state, specialProducts: working
    }

}


const addManage = (action, state) => {
    let working = [...state.specialProducts ] 
    // if (!working.manages)
    //     working.manages = [];
    working.push(action.payload)

    return {
        ...state, specialProducts: working
    }
}

const setEditIndex = (action, state) => {
    return {
        ...state, editIndex: action.payload
    }
}