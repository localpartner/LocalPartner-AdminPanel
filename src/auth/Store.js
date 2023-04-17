import { API } from '../config';

export const storesignin = store => {
    return fetch(`${API}/storesignin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        body: JSON.stringify(store)
    })
}