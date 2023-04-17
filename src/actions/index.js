// General  actions
const ADD_GENERAL = 'ADD_GENERAL';
const ADD_STOCK = 'ADD_STOCK';
const ADD_IMAGE = 'ADD_IMAGE';
const ADD_SPECIAL = 'ADD_SPECIAL';
const ADD_DISCOUNT = 'ADD_DISCOUNT';
export const ADD_SPECIFICATION = 'ADD_SPECIFICATION';
const ADD_LINKS = 'ADD_LINKS';
const ADD_OPTION = "ADD_OPTION";
const UPDATE_OPTION = "UPDATE_OPTION";
const DELETE_OPTION = "DELETE_OPTION";
export const FETCH_ATTRIBUTES = "FETCH_ATTRIBUTES";

export const addGeneral = (productName,
    productDescription,
    productCode,
    price,
    stockKeepingUnit,
    universalProductCode,
    europeanArticleNumber,
    japaneseArticleNumber,
    internationalStandard,
    manufacturerPartNumber) => ({
        type: ADD_GENERAL,
        payload: {
            productName,
            productDescription,
            productCode,
            price,
            stockKeepingUnit,
            universalProductCode,
            europeanArticleNumber,
            japaneseArticleNumber,
            internationalStandard,
            manufacturerPartNumber
        }
    })


export const addData = (dateAvailable,
    quantity,
    substractStock,
    oosMessage) => ({
        type: ADD_STOCK,
        payload: {
            dateAvailable,
            quantity,
            substractStock,
            oosMessage

        }
    })

export const addImage = (name, content) => ({
    type: ADD_IMAGE,
    payload: {
        name,
        content
    }
})

export const special = (startDate,
    price,
    endDate) => ({
        type: ADD_SPECIAL,
        payload: {
            startDate,
            price,
            endDate
        }

    });


export const addDiscount = (startDate) => ({
    type: ADD_DISCOUNT,
    payload: {
        startDate
    }
})
export const specifications = (code, value) => ({
    type: ADD_SPECIFICATION,
    payload: {
        code, value
    }
});
export const links = (code, subCode, brandName) => ({
    type: ADD_LINKS,
    payload: {
        code, subCode, brandName
    }
});
export const addOption = (type) => ({
    type: ADD_OPTION,
    payload: {
        type: type.values,

    }
});
export const updateOption = (type, id) => (
    {
        type: UPDATE_OPTION,
        id
    }
);
export const delete_option = (type, id) => (
    {
        type: DELETE_OPTION,
        id
    }
)

export const fetchAttributes = (data) => (
    {
        type: FETCH_ATTRIBUTES,
        payload:data
        
    }
)