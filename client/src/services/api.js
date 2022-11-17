import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export const HOST = 'http://localhost:8083/api';
export const ACCESS_TOKEN = 'accessToken';

async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message);
        }

        try {
            return await response.json();
        } catch (err) {
            return response;
        }
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

async function getOptions(method = 'GET', body) {
    const options = {
        method,
        headers: {}
    };

    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);

    if (accessToken) {
        options.headers['X-Authorization'] = accessToken;
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

export async function get(url) {
    return await request(url, await getOptions());
}

export async function post(url, body) {
    return await request(url, await getOptions('POST', body));
}

export async function put(url, body) {
    return await request(url, await getOptions('PUT', body));
}

export async function del(url) {
    return await request(url, await getOptions('DELETE'));
}