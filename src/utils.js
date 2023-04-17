export const formatDate = (value) =>{
    //return new Date(value).toLocaleDateString()
    let today = new Date(value)
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    let formattedToday = dd + '-' + mm + '-' + yyyy;
    return formattedToday;

}
export const formatDateYYYMMDD = (value) =>{
    //return new Date(value).toLocaleDateString()
    let today = new Date(value)
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    let formattedToday = yyyy + '-' + mm + '-' + dd;
    return formattedToday;

}