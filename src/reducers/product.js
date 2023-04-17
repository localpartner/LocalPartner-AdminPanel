import * as ProductActions from "./../actions/productConfigActions";
const initalState = {
    activeTab: 1,
    previousTab: 0,
    switchTab: new Date().getMilliseconds(),
    editIndex: -1,
    saveProduct: false,
    cancelSaveProduct: false,
    newProduct: true,
    specificationDialogBox: false,
    discountDialogBox: false,
    specialDialogBox: false,
    optionDialogBox: false,
    imageDialogBox: false,
    featureDialogBox : false,
    highlightDialogBox: false,
    optionsData: [],
    discountData: [],
    specialData: [],
    specificationData: [],
    specifications: [],
    links: [],
    manufacture: [],
    imageData: [],
    features: [],
    highlights: [],
    product:  { status: false, options: [], discount: [], specials: [], identification: {}, stock: {}, specifications: [], images: [], links: [],   features:[],  highlights: []} ,
    workingProduct: { status: false, options: [], discount: [], specials: [], identification: {}, stock: {}, specifications: [], images: [], links: [],   features:[],  highlights: [] } 
   
}
export const product = (state = initalState, action) => {
    switch (action.type) {
        case ProductActions.SET_ACTIVE_TAB: return setActiveTab(action, state);
        case ProductActions.SET_PREVIOUS_TAB: return setPreviousTab(action, state);
        case ProductActions.SET_EDIT_INDEX: return setEditIndex(action, state);
        case ProductActions.SET_NEW_FLAG: return setNewFlag(action, state);
        case ProductActions.SWITCH_TAB: return switchTab(action, state);

        case ProductActions.SET_WORKING_PRODUCT: return setWorkingProduct(action, state);
        case ProductActions.SET_PRODUCT: return setProduct(action, state);
        case ProductActions.SAVE_PRODUCT: return saveProduct(action, state);
        case ProductActions.CANCEL_SAVE_PRODUCT: return cancelSaveProduct(action, state);

        case ProductActions.SAVE_SPECIFICATIONS: return saveSpecifications(action, state);

        case ProductActions.SAVE_CATEGORY_DATA: return saveCategoryData(action, state);

        case ProductActions.SAVE_MANUFACTURE_NAME: return saveManufactureName(action, state);

        /*General*/
        case ProductActions.SET_GENERAL_DATA: return setGeneralData(action, state);

        /*Identification*/
        case ProductActions.SET_IDENTIFICATION_DATA: return setIdentificationData(action, state);

        /*Stock*/
        case ProductActions.SET_STOCK_DATA: return setStockData(action, state);

        /*Links*/
        case ProductActions.SET_LINK_DATA: return setLinkData(action, state);

        /*Discount*/
        case ProductActions.SET_DISCOUNT_DAILOG: return setDiscountDialog(action, state);
        case ProductActions.ADD_DISCOUNT: return addDiscount(action, state)
        case ProductActions.SET_DISCOUNT: return setDiscount(action, state);
        case ProductActions.SET_DISCOUNT_DATA: return setDiscountData(action, state)

        /*Special*/
        case ProductActions.SET_SPECIAL_DAILOG: return setSpecialDialog(action, state);
        case ProductActions.ADD_SPECIAL: return addSpecial(action, state)
        case ProductActions.SET_SPECIAL: return setSpecial(action, state);
        case ProductActions.SET_SPECIAL_DATA: return setSpecialData(action, state)

        /*Options*/
        case ProductActions.SET_OPTION_DAILOG: return setOptionDialog(action, state)
        case ProductActions.ADD_OPTION: return addOption(action, state)
        case ProductActions.SET_OPTION_DATA: return setOptionData(action, state)
        case ProductActions.SET_OPTION: return setOption(action, state);

        /*Specification*/
        case ProductActions.SET_SPECIFICATION_DAILOG: return setSpecificationDialog(action, state);
        case ProductActions.ADD_SPECIFICATION: return addSpecification(action, state)
        case ProductActions.SET_SPECIFICATION: return setSpecification(action, state);
        case ProductActions.SET_SPECIFICATION_DATA: return setSpecificationData(action, state)
 
        // changeskk...................................................................................................//
         /*Link*/
        //  case ProductActions.SET_SPECIFICATION_DAILOG: return setSpecificationDialog(action, state);
         case ProductActions.ADD_CATEGORY: return addCategory(action, state)
         
         case ProductActions.SET_CATEGORY_DATA: return setCategoryData(action, state)

        /* Images*/
        case ProductActions.SET_IMAGE_DAILOG: return setImageDialog(action, state);
        case ProductActions.ADD_IMAGE: return addImage(action, state)
        case ProductActions.SET_IMAGE: return setImage(action, state);
        case ProductActions.SET_IMAGE_DATA: return setImagesData(action, state)

         /* Feature Page*/
         case ProductActions.SET_FEATURE_DAILOG: return setFeatureDialog(action, state);
         case ProductActions.ADD_FEATURE: return addFeature(action, state)
         case ProductActions.SET_FEATURE: return setFeature(action, state);
         case ProductActions.SET_FEATURE_DATA: return setFeatureData(action, state)

           /* Highlight */
           case ProductActions.SET_HIGHLIGHT_DAILOG: return setHighlightDialog(action, state);
           case ProductActions.ADD_HIGHLIGHT: return addHighlight(action, state)
           case ProductActions.SET_HIGHLIGHT: return setHighlight(action, state);
           case ProductActions.SET_HIGHLIGHT_DATA: return setHighlightData(action, state)

              /* Manage */
              
          
        
        default:
            return state
    }
}
const setActiveTab = (action, state) => {
    return {
        ...state, activeTab: action.payload
    }
}

const setPreviousTab = (action, state) => {
    return {
        ...state, previousTab: action.payload
    }
}

const switchTab = (action, state) => {
    return {
        ...state, switchTab: action.payload
    }
}

const setEditIndex = (action, state) => {
    return {
        ...state, editIndex: action.payload
    }
}

const saveProduct = (action, state) => {
    return {
        ...state, saveProduct: action.payload
    }
}


const cancelSaveProduct = (action, state) => {
    return {
        ...state, cancelSaveProduct: action.payload
    }
}

const setWorkingProduct = (action, state) => {
    return {
        ...state, workingProduct: action.payload
    }
}

const setProduct = (action, state) => {
    return {
        ...state, product: action.payload
    }
}

const setNewFlag = (action, state) => {
    return {
        ...state, newProduct: action.payload
    }
}
const saveSpecifications = (action, state) => {
    return {
        ...state, specifications: action.payload
    }
}

const saveCategoryData = (action, state) => {
    return {
        ...state, category: action.payload
    }
}

const saveManufactureName = (action, state) => {
    return {
        ...state, manufacture: action.payload
    }
}

/** General */
const setGeneralData = (action, state) => {
    let working = { ...state.workingProduct }
    working = { ...working, ...action.payload }
    return { ...state, workingProduct: working }
}

/** Identification */
const setIdentificationData = (action, state) => {
    let working = { ...state.workingProduct }
    working = { ...working, identification: { ...action.payload } }

    return { ...state, workingProduct: working }
}

/** Stock */
const setStockData = (action, state) => {
    let working = { ...state.workingProduct }
    working = { ...working, stock: { ...action.payload } }
    return { ...state, workingProduct: working }
}

/**Link */

const setLinkData = (action, state) => {
    console.log(action.payload)
    let working = { ...state.workingProduct }
    working = { ...working, links: { ...action.payload } }
    console.log("Working Prod : ", working)
    return { ...state, workingProduct: working }
}

/** Discount */
const setDiscountDialog = (action, state) => {
    return {
        ...state, discountDialogBox: action.payload
    }
}

const setDiscount = (action, state) => {
    let working = { ...state.workingProduct }
    working.discount = action.payload;
    return {
        ...state, workingProduct: working
    }

}


const addDiscount = (action, state) => {
    let working = { ...state.workingProduct }
    if (!working.discount)
        working.discount = [];
    working.discount.push(action.payload)

    return {
        ...state, workingProduct: working
    }
}

const setDiscountData = (action, state) => {
    return {
        ...state, discountData: action.payload
    }

}


/** Special */
const setSpecialDialog = (action, state) => {
    return {
        ...state, specialDialogBox: action.payload
    }
}

const setSpecial = (action, state) => {
    let working = { ...state.workingProduct }
    working.specials = action.payload;
    return {
        ...state, workingProduct: working
    }

}


const addSpecial = (action, state) => {
    let working = { ...state.workingProduct }
    if (!working.specials)
        working.specials = [];
    working.specials.push(action.payload)

    return {
        ...state, workingProduct: working
    }
}

const setSpecialData = (action, state) => {
    return {
        ...state, specialData: action.payload
    }

}


/*** Option  */
const setOptionDialog = (action, state) => {
    return {
        ...state, optionDialogBox: action.payload
    }
}

const setOption = (action, state) => {
    let working = { ...state.workingProduct }
    working.options = action.payload;
    return {
        ...state, workingProduct: working
    }

}


const setOptionData = (action, state) => {
    return {
        ...state, optionsData: action.payload
    }

}

const addOption = (action, state) => {
    let working = { ...state.workingProduct }
    if (!working.options)
        working.options = [];
    working.options.push(action.payload)

    return {
        ...state, workingProduct: working
    }
}




/** Specification */
const setSpecificationDialog = (action, state) => {
    return {
        ...state, specificationDialogBox: action.payload
    }
}

const setSpecification = (action, state) => {
    let working = { ...state.workingProduct }
    working.specifications = action.payload;
    return {
        ...state, workingProduct: working
    }

}


const addSpecification = (action, state) => {
    let working = { ...state.workingProduct }
    if (!working.specifications)
        working.specifications = [];
    working.specifications.push(action.payload)

    return {
        ...state, workingProduct: working
    }
}

const setSpecificationData = (action, state) => {
    return {
        ...state, specificationData: action.payload
    }

}



const setCategoryData = (action, state) => {
    let working = { ...state.workingProduct }
    working.links = action.payload;
    return {
        ...state, workingProduct: working
    }

}


const addCategory = (action, state) => {
    let working = { ...state.workingProduct }
    if (!working.links)
        working.links = [];
    working.links.push(action.payload)

    return {
        ...state, workingProduct: working
    }
}








/* images*/
const setImagesData = (action, state) => {
    return {
        ...state, imageData: action.payload
    }
}
const setImageDialog = (action, state) => {
    return {
        ...state, imageDialogBox: action.payload
    }
}

const setImage = (action, state) => {
    let working = { ...state.workingProduct }
    working.images = action.payload;
    return {
        ...state, workingProduct: working
    }

}


const addImage = (action, state) => {
    let working = { ...state.workingProduct }
    if (!working.images)
        working.images = [];
    working.images.push(action.payload)

    return {
        ...state, workingProduct: working
    }
}



/* Features*/
const setFeatureData = (action, state) => {
    return {
        ...state, featureData: action.payload
    }
}
const setFeatureDialog = (action, state) => {
    return {
        ...state, featureDialogBox: action.payload
    }
}

const setFeature = (action, state) => {
    let working = { ...state.workingProduct }
    working.features = action.payload;
    return {
        ...state, workingProduct: working
    }

}


const addFeature = (action, state) => {
    let working = { ...state.workingProduct }
    if (!working.features)
        working.features = [];
    working.features.push(action.payload)

    return {
        ...state, workingProduct: working
    }
}

/* Highlights*/
const setHighlightData = (action, state) => {
    return {
        ...state, highlightData: action.payload
    }
}
const setHighlightDialog = (action, state) => {
    return {
        ...state, highlightDialogBox: action.payload
    }
}

const setHighlight = (action, state) => {
    let working = { ...state.workingProduct }
    working.highlights = action.payload;
    return {
        ...state, workingProduct: working
    }

}


const addHighlight = (action, state) => {
    let working = { ...state.workingProduct }
    if (!working.highlights)
        working.highlights = [];
    working.highlights.push(action.payload)

    return {
        ...state, workingProduct: working
    }
}


/* Manage*/
