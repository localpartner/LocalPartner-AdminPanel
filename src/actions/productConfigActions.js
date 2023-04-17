export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";
export const SET_PREVIOUS_TAB = "SET_PREVIOUS_TAB";
export const SWITCH_TAB = "SWITCH_TAB";
export const SET_EDIT_INDEX = "SET_EDIT_INDEX";
export const SAVE_PRODUCT = "SAVE_PRODUCT";
export const CANCEL_SAVE_PRODUCT = "CANCEL_SAVE_PRODUCT";
export const SAVE_SPECIFICATIONS = "SAVE_SPECIFICATIONS";
export const SAVE_CATEGORY_DATA = "SAVE_CATEGORY_DATA";
export const SAVE_MANUFACTURE_NAME = "SAVE_MANUFACTURE_NAME";
export const SAVE_ALL_SUB_CATEGORY = "SAVE_ALL_SUB_CATEGORY";


export const SET_NEW_FLAG = "SET_NEW_FLAG";
export const SET_WORKING_PRODUCT = "SET_WORKING_PRODUCT"
export const SET_PRODUCT = "SET_PRODUCT"

export const SET_SPECIFICATION_DAILOG = "SET_SPECIFICATION_DAILOG";
export const ADD_SPECIFICATION = "ADD_SPECIFICATION";
export const SET_SPECIFICATION = "SET_SPECIFICATION";
export const SET_SPECIFICATION_DATA = "SET_SPECIFICATION_DATA";

// export const SET_SPECIFICATION_DAILOG = "SET_SPECIFICATION_DAILOG";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_CATEGORY_DATA = "SET_CATEGORY_DATA";

export const SET_DISCOUNT_DAILOG = "SET_DISCOUNT_DAILOG";
export const ADD_DISCOUNT = "ADD_DISCOUNT";
export const SET_DISCOUNT = "SET_DISCOUNT";
export const SET_DISCOUNT_DATA = "SET_DISCOUNT_DATA";

export const SET_SPECIAL_DAILOG = "SET_SPECIAL_DAILOG";
export const ADD_SPECIAL = "ADD_SPECIAL";
export const SET_SPECIAL = "SET_SPECIAL";
export const SET_SPECIAL_DATA = "SET_SPECIAL_DATA";

export const SET_OPTION_DAILOG = "SET_OPTION_DAILOG";
export const ADD_OPTION = "ADD_OPTION";
export const SET_OPTION_DATA = "SET_OPTION_DATA";
export const SET_OPTION = "SET_OPTION";

export const SET_IMAGE_DAILOG = "SET_IMAGE_DAILOG";
export const ADD_IMAGE = "ADD_IMAGE";
export const SET_IMAGE_DATA = "SET_IMAGE_DATA";
export const SET_IMAGE = "SET_IMAGE";

export const SET_FEATURE_DAILOG = "SET_FEATURE_DAILOG";
export const ADD_FEATURE = "ADD_FEATURE";
export const SET_FEATURE_DATA = "SET_FEATURE_DATA";
export const SET_FEATURE = "SET_FEATURE";

export const SET_HIGHLIGHT_DAILOG = "SET_HIGHLIGHT_DAILOG";
export const ADD_HIGHLIGHT = "ADD_HIGHLIGHT";
export const SET_HIGHLIGHT_DATA = "SET_HIGHLIGHT_DATA";
export const SET_HIGHLIGHT = "SET_HIGHLIGHT";

export const SET_LINK_DAILOG = "SET_LINK_DAILOG";
export const ADD_LINK = "ADD_LINK";
export const SET_Link = "SET_Link";
export const SET_LINK_DATA = "SET_LINK_DATA";

export const SET_GENERAL_DATA = "SET_GENERAL_DATA";
export const SET_IDENTIFICATION_DATA = "SET_IDENTIFICATION_DATA";
export const SET_STOCK_DATA = "SET_STOCK_DATA";

export const SET_SPECIAL_PRODUCT_DAILOG = "SET_SPECIAL_PRODUCT_DAILOG";
export const ADD_SPECIAL_PRODUCT = "ADD_SPECIAL_PRODUCT";
export const SET_SPECIAL_PRODUCT = "SET_SPECIAL_PRODUCT";
export const SET_SPECIAL_PRODUCT_DATA = "SET_SPECIAL_PRODUCT_DATA";
export const SET_ORGINAL_SPECIAL_PRODUCT_DATA = "SET_ORGINAL_SPECIAL_PRODUCT_DATA";


export const setCurrentTab = (data) => (
    {
        type: SET_ACTIVE_TAB,
        payload: data

    }
)

export const setPreviousTab = (data) => (
    {
        type: SET_PREVIOUS_TAB,
        payload: data

    }
)
export const switchTab = () => (
    {
        type: SWITCH_TAB,
        payload: new Date().getMilliseconds()

    }
)
export const setEditIndex = (data) => (
    {
        type: SET_EDIT_INDEX,
        payload: data

    }
)

export const setWorkingProduct = (data) => (
    {
        type: SET_WORKING_PRODUCT,
        payload: data

    }
)

export const setProduct = (data) => (
    {
        type: SET_PRODUCT,
        payload: data

    }
)

export const saveProduct = (data) => (
    {
        type: SAVE_PRODUCT,
        payload: data

    }
)

export const cancelSaveProduct = (data) => (
    {
        type: CANCEL_SAVE_PRODUCT,
         payload: data

    }
)

export const setNewFlag = (data) => (
    {
        type: SET_NEW_FLAG,
        payload: data

    }
)

export const saveSpecifications = (data) => (
    {
        type: SAVE_SPECIFICATIONS,
        payload: data

    }
)


// ...................category.........................../

export const saveCategoryData = (data) => (
    {
        type: SAVE_CATEGORY_DATA,
        payload: data

    }
)

export const saveManufactureName = (data) => (
    {
        type: SAVE_MANUFACTURE_NAME,
        payload: data

    }
)

export const saveAllSubCategory = (data) => (
    {
        type: SAVE_ALL_SUB_CATEGORY,
        payload: data

    }
)

/*------------------- General  data --------------------*/

export const setProductGeneralData = (data) => (
    {
        type: SET_GENERAL_DATA,
        payload: data

    }
)
/*------------------- Identification  data --------------------*/

export const setProductIdentificationData = (data) => (
    {
        type: SET_IDENTIFICATION_DATA,
        payload: data

    }
)

/*------------------- Stock  data --------------------*/

export const setStockData = (data) => (
    {
        type: SET_STOCK_DATA,
        payload: data

    }
)

/*------------------- Specification Dailog --------------------*/
export const showSpecificationDailogBox = () => (
    {
        type: SET_SPECIFICATION_DAILOG,
        payload: true

    }
)

export const hideSpecificationDailogBox = () => (
    {
        type: SET_SPECIFICATION_DAILOG,
        payload: false

    }
)
export const addSpecification = (data) => (
    {
        type: ADD_SPECIFICATION,
        payload: data

    }
)

export const setSpecification = (data) => (
    {
        type: SET_SPECIFICATION,
        payload: data

    }
)

export const setSpecificationData = (data) => (
    {
        type: SET_SPECIFICATION_DATA,
        payload: data

    }
)

//...................category.........................../

export const setCategoryData = (data) => (
    {
        type: SET_CATEGORY_DATA,
        payload: data

    }
)

/*------------------- Dsicount Dailog --------------------*/
export const showDiscountDailogBox = () => (
    {
        type: SET_DISCOUNT_DAILOG,
        payload: true

    }
)

export const hideDiscountDailogBox = () => (
    {
        type: SET_DISCOUNT_DAILOG,
        payload: false

    }
)
export const addDiscount = (data) => (
    {
        type: ADD_DISCOUNT,
        payload: data

    }
)

export const setDiscount = (data) => (
    {
        type: SET_DISCOUNT,
        payload: data

    }
)

export const setDiscountData = (data) => (
    {
        type: SET_DISCOUNT_DATA,
        payload: data

    }
)


/*------------------- Special Dailog --------------------*/
export const showSpecialDailogBox = () => (
    {
        type: SET_SPECIAL_DAILOG,
        payload: true

    }
)

export const hideSpecialDailogBox = () => (
    {
        type: SET_SPECIAL_DAILOG,
        payload: false

    }
)
export const addSpecial = (data) => (
    {
        type: ADD_SPECIAL,
        payload: data

    }
)

export const setSpecial = (data) => (
    {
        type: SET_SPECIAL,
        payload: data

    }
)

export const setSpecialData = (data) => (
    {
        type: SET_SPECIAL_DATA,
        payload: data

    }
)

/*------------------- Option Dailog --------------------*/

export const showOptionDailogBox = () => (
    {
        type: SET_OPTION_DAILOG,
        payload: true

    }
)

export const hideOptionDailogBox = () => (
    {
        type: SET_OPTION_DAILOG,
        payload: false

    }
)
export const addOption = (data) => (
    {
        type: ADD_OPTION,
        payload: data

    }
)

export const setOptionData = (data) => (
    {
        type: SET_OPTION_DATA,
        payload: data

    }
)

export const setOption = (data) => (
    {
        type: SET_OPTION,
        payload: data

    }
)



/*------------------- images  data --------------------*/

export const showImageDailogBox = () => (
    {
        type: SET_IMAGE_DAILOG,
        payload: true

    }
)

export const hideImageDailogBox = () => (
    {
        type: SET_IMAGE_DAILOG,
        payload: false

    }
)
export const addImage = (data) => (
    {
        type: ADD_IMAGE,
        payload: data

    }
)

export const setImageData = (data) => (
    {
        type: SET_IMAGE_DATA,
        payload: data

    }
)

export const setImage = (data) => (
    {
        type: SET_IMAGE,
        payload: data

    }
)



/*------------------- Feature  data --------------------*/

export const showFeatureDailogBox = () => (
    {
        type: SET_FEATURE_DAILOG,
        payload: true

    }
)

export const hideFeatureDailogBox = () => (
    {
        type: SET_FEATURE_DAILOG,
        payload: false

    }
)
export const addFeature = (data) => (
    {
        type: ADD_FEATURE,
        payload: data

    }
)

export const setFeatureData = (data) => (
    {
        type: SET_FEATURE_DATA,
        payload: data

    }
)

export const setFeature = (data) => (
    {
        type: SET_FEATURE,
        payload: data

    }
)



/*------------------- Highlight  data --------------------*/

export const showHighlightDailogBox = () => (
    {
        type: SET_HIGHLIGHT_DAILOG,
        payload: true

    }
)

export const hideHighlightDailogBox = () => (
    {
        type: SET_HIGHLIGHT_DAILOG,
        payload: false

    }
)
export const addHighlight = (data) => (
    {
        type: ADD_HIGHLIGHT,
        payload: data

    }
)

export const setHighlightData = (data) => (
    {
        type: SET_HIGHLIGHT_DATA,
        payload: data

    }
)

export const setHighlight = (data) => (
    {
        type: SET_HIGHLIGHT,
        payload: data

    }
)

/*------------------- Links Dailog --------------------*/
export const showLinkDailogBox = () => (
    {
        type: SET_LINK_DAILOG,
        payload: true

    }
)

export const hideLinkDailogBox = () => (
    {
        type: SET_LINK_DAILOG,
        payload: false

    }
)
export const addLink = (data) => (
    {
        type: ADD_LINK,
        payload: data

    }
)

export const setLink = (data) => (
    {
        type: SET_Link,
        payload: data

    }
)

export const setLinkData = (data) => (
    {
        type: SET_LINK_DATA,
        payload: data

    }
)



/*------------------- Manage Special Product Dailog --------------------*/
export const showSpecialProductDailogBox = () => (
    {
        type: SET_SPECIAL_PRODUCT_DAILOG,
        payload: true

    }
)

export const hideSpecialProductDailogBox = () => (
    {
        type: SET_SPECIAL_PRODUCT_DAILOG,
        payload: false

    }
)
export const addSpecialProduct = (data) => (
    {
        type: ADD_SPECIAL_PRODUCT,
        payload: data

    }
)

export const setSpecialProduct = (data) => (
    {
        type: SET_SPECIAL_PRODUCT,
        payload: data

    }
)

export const setSpecialProductData = (data) => (
    {
        type: SET_SPECIAL_PRODUCT_DATA,
        payload: data

    }
)

export const setOrginalSpecialProductData = (data) => (
    {
        type: SET_ORGINAL_SPECIAL_PRODUCT_DATA,
        payload: data

    }
)