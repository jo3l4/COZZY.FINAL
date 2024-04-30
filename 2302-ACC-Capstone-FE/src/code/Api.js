import React, { useState } from 'react'

import auth from './Auth.js'

const endpoint = 'http://localhost:3000/api/';

function getEndpoint(relativePath) {
    return `${endpoint}${relativePath}`;
}

function getHeaders() {
    var headers = {};
    var bearerToken = auth.getBearerToken();

    if (bearerToken) {
        headers['Authorization'] = `Bearer ${auth.getBearerToken()}`;
    }

    return headers;
}

const api = {
    cartItems: {
        create(productSizeId, quantity) {
            return fetch(getEndpoint(`cartItems/${productSizeId}/${quantity}`), {
                method: 'POST',
                headers: getHeaders()
            });
        },
        getAll() {
            return fetch(getEndpoint("cartItems/"), {
                headers: getHeaders()
            });
        }
    },
    customers: {
        authenticate(username, password) {
            var headers = getHeaders();
            headers['Content-Type'] = 'application/json';
            headers['Referer-Policy'] = 'origin';

            return fetch(getEndpoint("customers/authenticate"), {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    username,
                    password
                })
            });
        }
    },
    orders: {
        create() {
            return fetch(getEndpoint('orders'), {
                method: 'POST',
                headers: getHeaders()
            });
        },
        getDetails(orderId) {
            return fetch(getEndpoint(`orders/${orderId}`), {
                headers: getHeaders()
            });
        }
    },
    products: {
        getAll() {
            return fetch(getEndpoint('products'));
        },
        getProductDetails(productId) {
            return fetch(getEndpoint(`products/${productId}`))
        }
    }
};

export default api