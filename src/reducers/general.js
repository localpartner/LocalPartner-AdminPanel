const initalState = {
    General: [],
};
const general = (state = initalState, action) => {
    switch (action.type) {
        case "ADD_GENERAL":
            const { productName,
                productDescription,
                productCode,
                price,
                stockKeepingUnit,
                universalProductCode,
                europeanArticleNumber,
                japaneseArticleNumber,
                internationalStandard,
                manufacturerPartNumber } = action.payload;
            return {
                ...state,
                General: [...state.General, {
                    productName: productName,
                    productDescription: productDescription,
                    productCode: productCode,
                    price: price,
                    stockKeepingUnit: stockKeepingUnit,
                    universalProductCode: universalProductCode,
                    europeanArticleNumber: europeanArticleNumber,
                    japaneseArticleNumber: japaneseArticleNumber,
                    internationalStandard: internationalStandard,
                    manufacturerPartNumber: manufacturerPartNumber
                }]
            }
        default:
            return state;
    }

}
export default general