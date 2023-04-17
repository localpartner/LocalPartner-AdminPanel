import { API } from '../config';
import axios from 'axios';
import client from '../Client';

  
export const createCategory = async (category) => {
    const payload = category
    try {
        const url = `${API}/category`
        const response = await client.post(url, payload
        );

        return response;
    } catch (err) {
        if (err.response) {
            // Request made but the server responded with an error
            return(err.response.data);
           
        }
        console.log(err);
    }
};
export const statusCategories = async (category, code, accessToken) => {
    const payload = category
    try {
        const response = await client.put(`${API}/category/${code}/status`, payload);
        return response;
    } catch (err) {
        console.log(err)
    }
    // .then(response => {
    //     return response.json();
    // })

}

export const StatusCategories = async (category, code, accessToken) => {

    const payload = category;
    try {
        const response = await client.put(`${API}/category/${code}/status`, payload);
        return response
    }
    catch (err) {
        console.log(err)
    }
}
export const getCategoryBycode = async (code, category, accessToken) => {

    const payload = JSON.stringify(category);
    try {
        const response = await client.get(`${API}/category/${code}`, payload)
        return response
    }
    catch (err) {
        console.log(err)
    }

}

export const CreateSubCategory = async (code, category, accessToken) => {
    const payload = category;
    try {
        const response = await client.post(`${API}/category/${code}/subcategory`, payload);
        return response
    }
    catch (err) {
        if (err.response) {
            // Request made but the server responded with an error
            return(err.response.data);
           
        }
        console.log(err)
    }
}








export const statusCategory = async (category, code, subcode, accessToken) => {
    const payload = category;

    try {
        const response = await client.put(`${API}/category/${code}/subcategory/${subcode}/status`, payload);
        return response
    }
    catch (err) {
        console.log(err);

    }
};

export const statusChangeCategory = async (category, code, subcode, accessToken) => {
    const payload = category;

    try {
        const response = await client.put(`${API}/category/${code}/subcategory/${subcode}/status`, payload);
        return response;
    } catch (err) {
        console.log(err)
    }
};

export const updateCategory = async (category, code, accessToken) => {
    const payload = category;

    try {
        const response = await client.put(`${API}/category/${code}`, payload);
        return response;
    } catch (err) {
        if (err.response) {
            // Request made but the server responded with an error
            return(err.response.data);
           
        }
        console.log(err)
    }
};

export const updateSubCategory = async (code, subCode, category, accessToken) => {
    const payload = category;
    try {
        const response = await client.put(`${API}/category/${code}/subcategory/${subCode}`, payload)
        return response;
    } catch (err) {
        if (err.response) {
            // Request made but the server responded with an error
            return(err.response.data);
           
        }
        console.log(err)
    }
};




// export const deletecategory1 = (productId) => {
//     console.log(productId)
//     return fetch(`${API}/category/${productId}`, {
//         method: 'DELETE',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             //Authorization: `Bearer ${ token }`
//         }
//     })
// };

export const deletecategory = async (code, subcode, accessToken) => {
    try {
        const response = await client.delete(`${API}/category/${code}/subcategory/${subcode}`)
        return response;
    } catch (err) {
        console.log(err)
    }
};
export const deletecategorytest = async (code, accessToken) => {
    try {
        const response = await client.delete(`${API}/category/${code}`)
        return response;
    } catch (err) {
        console.log(err)
    }
};



export const getCategory = async (code, accessToken) => {
    try {
        const response = await client.get(`${API}/category/${code}`);
        return response;
    }
    catch (err) {
        console.log(err)
    }
}

export const getSubCategory = async (code, subCode, accessToken) => {
    try {
        const response = await client.get(`${API}/category/${code}/subcategory/${subCode}`);
        return response;
    }
    catch (err) {
        console.log(err)
    }
};

// LInk tab.  .....................................................................//
export const getCategories = async (accessToken) => {
    try {
        const response = await client.get(`${API}/category/list?fetch=all`);
        return response;
    }
    catch (err) {
        console.log(err)
    }
};






export const listOrders = () => {
    return fetch(`${API}/order/list/`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            //  Authorization: `Bearer ${ token }`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteOrder = (orderId, category) => {
    return fetch(`${API}/order/delete/${orderId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getOrder = orderId => {
    return fetch(`${API}/order/${orderId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateOrderData = (orderId, order) => {
    return fetch(`${API}/order/update/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(order)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
// Manufacturer Api//
export const createManufacturer = async (manufacture, accessToken) => {
    const payload = manufacture;

    try {
        const response = await client.post(`${API}/manufacturer`, payload);
        return response;
    } catch (err) {
        if (err.response) {
            // Request made but the server responded with an error
            return(err.response.data);
           
        }
        console.log(err);
    }
};
export const getManufacturer = async (name, accessToken) => {
    try {
        const response = await client.get(`${API}/manufacturer/${name}`)
        return response;
    } catch (err) {
        console.log(err);
    }
};
export const getManufacturers = async (accessToken) => {
    try {
        const response = await client.get(`${API}/manufacturer/list`)
        return response;
    }
    catch (err) {
        console.log(err);
    }

};

export const updateManfacturer = async (name, manufacturs, accessToken) => {
    const payload = manufacturs;
    try {
        const response = await client.put(`${API}/manufacturer/${name}`, payload

        );
        return response;
    }
    catch (err) {
        if (err.response) {
            // Request made but the server responded with an error
            return(err.response.data);
           
        }
        console.log(err);
    }
};

export const statusManfacturer = async (name, manufactures, accessToken) => {
    const payload = manufactures;
    try {
        const response = await client.put(`${API}/manufacturer/${name}/status`, payload);
        return response;
    }
    catch (err) {
        console.log(err);
    }

};

export const statusChangeManfacturer = async (name, manufacturers, accessToken) => {
    const payload = manufacturers;

    try {
        const response = await client.put(`${API}/manufacturer/${name}/status`, payload)
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const deleteManufacturer1 = async (name, accessToken) => {
    // const payload = JSON.stringify(category);

    try {
        const response = await client.delete(`${API}/manufacturer/${name}`)
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const deleteManufacturer = (manufacturerId) => {
    return fetch(`${API}/manufacturer/${manufacturerId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};






//
export const getStatusValues = (userId, token) => {
    return fetch(`${API}/order/status-values/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, orderId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

/**
 * to perform crud on product
 * get all products
 * get a single product
 * update single product
 * delete single product
 */




export const getProducts = async (accessToken,storeId,type) => {
    /*
    /prodmgmt/admin/product/list", ProductAPI.getAllProducts);
router.put("/prodmgmt/admin/product/:code/status"
*/
    try {
        if(type=="ADMIN"){
            console.log(type,"from api")
        const response = await client.get(`${API}/prodmgmt/admin/product/list?fetch=all`)
        return response;}
        else{
           
            const response = await client.get(`${API}/prodmgmt/store/${storeId}/product/list?fetch=all`)
            return response;
        }

        
    }
    catch (err) {
        console.log(err);
    }
};


export const statusDeleteProducts = async (code, accessToken) => {

    try {
        const response = await client.delete(`${API}/product/${code}`)
        return response
    }
    catch (err) {
        console.log(err);
    }
};
export const statusProducts = async(productId, product) => {
    const payload = product
    try {
        const response = await client.put(`${API}/product/${productId}/status`,payload)
        return response;
    }
    catch (err) {
        console.log(err);
    }
}

export const statusChangeProducts =async (productId, product) => {
    const payload = product
    try {
        const response = await client.put(`${API}/product/${productId}/status`,payload)
        return response;
    }
    catch (err) {
        console.log(err);
    }
}



export const createProduct = async (product,storeId) => {
    const payload = product
    const accessToken1 = JSON.parse(localStorage.getItem("jwt"));
    
    return await client.post(`${API}/prodmgmt/store/${storeId}/product`, payload)
    /*try {
        const response = await axios.post(`${API}/product`, payload, {

            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken1}`
            },

        })
        return response;
    }
    catch (err) {
        console.log(err);
        throw err;

    };*/
}

export const getProduct = async (code, accessToke) => {
    const payload = code
    const accessToken = localStorage.getItem('jwt')

    try {
        const response = await client.get(`${API}/product/${code}`, payload,)
        return response;
    }
    catch (err) {
        console.log(err);

    };
}

// old update product
export const updateProducttest = (productId, product) => {
    return fetch(`${API}/product/${productId}/`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            //Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const updateProduct = async (product) => {
   
    const payload = product
    let code = product.code
    const accessToken1 = JSON.parse(localStorage.getItem("jwt"));

    return await client.put(`${API}/product/${code}`, payload, );
};




export const createmenu = async (category) => {
    try {
        const response = await fetch(`${API}/menu/create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                //  Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};




// specification api //
/*
export const createspecification = async (category) => {
 
    try {
        const response = await fetch(`${API}/specification/create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              //  Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};
*/
export const createspecification = async (category, accessToken) => {
    const payload = category
    try {
        const response = await client.post(`${API}/specification`, payload);
        return response
    } catch (err) {
        if (err.response) {
            // Request made but the server responded with an error
            return(err.response.data);
           
        }
        console.log(err);
    }
};
export const updatespecification = async (code, category, accessToken) => {
    const payload = category
    try {
        const response = await client.put(`${API}/specification/${code}`, payload)
        return response;
    } catch (err) {
        if (err.response) {
            // Request made but the server responded with an error
            return(err.response.data);
           
        }
        console.log(err);
    }
};
export const getSpecification = async (code, accessToken) => {
    const payload = code
    try {
        const response = await client.get(`${API}/specification/${code}`, payload)
        return response;
    } catch (err) {
        console.log(err);
    }
};
export const getAllSpecifications = async (accessToken) => {
    try {
        const response = await client.get(`${API}/specification/list?fetch=all`)
        return response
    }
    catch (err) {
        console.log(err);
    }
};

export const getAllActiveSpecifications = async (accessToken) => {
    try {
        const accessToken1 = JSON.parse(localStorage.getItem("jwt"));
        const response = await client.get(`${API}/specification/list`)
        return response
    }
    catch (err) {
        console.log(err);
    }
};

export const deleteSpecification = (productId) => {
    return fetch(`${API}/specification/${productId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${token}`
        }
    })
};

export const deleteSpecificationSoft = async (name, accessToken) => {
    // const payload = JSON.stringify(category)
    try {
        const response = await client.delete(`${API}/specification/${name}`

        )
        return response
    }
    catch (err) {
        console.log(err);
    }
};



export const statusSpecification = async (code, specification, accessToken) => {
    const payload = specification
    try {
        const response = await client.put(`${API}/specification/${code}/status`,payload)
        return response;
    }
    catch (err) {
        console.log(err);
    }


};

export const statusChangeSpecification = async (code, specification, accessToken) => {
    const payload = specification
    try {
        const response = await client.put(`${API}/specification/${code}/status`, payload)
        return response;
    }
    catch (err) {
        console.log(err);
    }
};
//      //

// Link tab api..................category.............................................................//
export const getAllCategory = async (accessToken) => {
    try {
        const response = await client.get(`${API}/category/list?fetch=all`)
        return response
    }
    catch (err) {
        console.log(err);
    }
};

export const getManufactureName = async (accessToken) => {
    try {
        const response = await axios.get(`${API}/manufacturer/list`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        })
        return response;
    }
    catch (err) { console.log(err) }
}

export const getAllSubCategory = async (code, accessToken) => {
    const accessToken1 = JSON.parse(localStorage.getItem("jwt"));
    try {
        const response = await client.get(`${API}/category/${code}`
        )
        return response;
    }
    catch (err) { console.log(err) };
};



// show all user
export const getCoustomer = async (accessToken) => {
    try {
        const response = await axios.get(`${API}/cust/list`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        })
        return response;
    }
    catch (err) { console.log(err) }
}


export const getCust = productId => {
    return fetch(`${API}/cust/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateCustomer = (productId, category) => {
    return fetch(`${API}/cust/${productId}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            Accept: 'application/json',
            // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const deleteCustomer = (productId, category) => {
    return fetch(`${API}/cust/delete/${productId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const removeCustomer = (productId) => {
    return fetch(`${API}/cust/${productId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const statusCustomer = (productId, category) => {
    return fetch(`${API}/cust/status/${productId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const statusCheckCustomer = (productId, category) => {
    return fetch(`${API}/cust/statusCheck/${productId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//create tax API //
export const createTax = async (tax) => {
    try {
        const response = await fetch(`${API}/tax/create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                //  Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(tax)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

export const getTaxes = () => {
    return fetch(`${API}/tax`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteTax = (taxId, category) => {
    return fetch(`${API}/tax/delete/${taxId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getTax = attributeId => {
    return fetch(`${API}/tax/${attributeId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateTax = (taxId, tax) => {
    return fetch(`${API}/tax/${taxId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(tax)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const statusTax = (taxId, tax) => {
    return fetch(`${API}/tax/status/${taxId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(tax)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const statusChangeTax = (taxId, tax) => {
    return fetch(`${API}/tax/statusChange/${taxId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(tax)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//create Attribute API //


export const createAttribute = async (attribute, accessToken) => {
    const payload = attribute
    try {
        const response = await client.post(`${API}/attribute`, payload);
        return response;
    } catch (err) {
        if (err.response) {
            // Request made but the server responded with an error
            return(err.response.data);
           
        }
        console.log(err);
    }
};


export const getAttributes = async (accessToken) => {
    try {
        const response = await client.get(`${API}/attribute/list?fetch=all`)
        return response;
    }
    catch (err) { console.log(err) };
};

export const getDimanstions = async (attributeId, accessToken) => {
    const payload = attributeId;
    try {
        const response = await client.get(`${API}/attribute/${attributeId}`, payload)
        return response
    }
    catch (err) {
        console.log(err)

    }
}
export const getActiveAttributes = async (accessToken) => {
    try {
        const response = await client.get(`${API}/attribute/list`);
        return response
    }
    catch (err) {
        console.log(err)
    }
};

export const getAttributeByCode = async (code) => {

    const accessToken1 = JSON.parse(localStorage.getItem("jwt"));
    try {
        const response = await client.get(`${API}/attribute/${code}`
        )
        return response;
    }
    catch (err) { console.log(err) };
};
export const getAttribute = async (attributeId, accessToken) => {
    const payload = attributeId
    try {
        const response = await client.get(`${API}/attribute/${attributeId}`, payload)
        return response;
    }
    catch (err) { console.log(err) };
};


export const updateAttribute = async (name, attribute, accessToken) => {
    const payload = attribute;
    try {
        const response = await client.put(`${API}/attribute/${name}`, payload);
        return response;
    }
    catch (err) { 
        if (err.response) {
            // Request made but the server responded with an error
            return(err.response.data);
           
        }
        console.log(err) };
};

export const deleteAttributeone = async (name, accessToken) => {

    try {
        const response = await client.delete(`${API}/attribute/${name}`

        )
        return response;
    }
    catch (err) { console.log(err) };
};
export const deleteAttribute = (attributeId) => {
    return fetch(`${API}/attribute/${attributeId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const statusAttributes = async (name, attributes, accessToken) => {
    const payload = attributes

    try {
        const response = await client.put(`${API}/attribute/${name}/status`, payload)

        return response;
    }
    catch (err) { console.log(err) };
};

export const statusChangeAttributes = async (name, attributes, accessToken) => {
    const payload = attributes
    try {

        const response = await client.put(`${API}/attribute/${name}/status`, payload)
        return response;
    }
    catch (err) { console.log(err) };
};

export const getStoreName = async (accessToken) => {
    try {
        const response = await axios.get(`${API}/store/list`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        })
        console.log(response, "resp")
        return response;
    }
    catch (err) { console.log(err) }
}

export const getProductName = async (storeId) => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));
    console.log(accessToken,"accessToken");
    // const storeId = (localStorage.getItem("storeid"));
    // console.log(storeId,"storeid");
    try {
        const response = await axios.get(`${API}/prodmgmt/store/${storeId}/product/list`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        })
        console.log(response,"get data")
        return response;
     
    }
    catch (err) { console.log(err) }
}

// update Special Products........................................//



export const updateSpecialProducts = (manageData) => {
      console.log("manageData",manageData)
    return fetch(`${API}/prodmgmt/admin/featured/product`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({products :manageData})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}; 
export const getSpecialandFeaturedProducts = async (accessToken) => {
    try {
        const response = await axios.get(`${API}/prodmgmt/admin/featured/product/`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        })
        console.log(response, "resp")
        return response;
    }
    catch (err) { console.log(err) }
}


// get order data by store id ....................................//

export const getOrderData = async () => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));
    console.log(accessToken,"accessToken");
    const storeId = localStorage.getItem("storeId");
    const storeid = storeId.slice(1, -1)
    console.log(storeId,"storeid");
    try {
        const response = await axios.get(`${API}/store/${storeid}/orders`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        })
        console.log(response,"get data")
        return response;
     
    }
    catch (err) { console.log(err) }
}