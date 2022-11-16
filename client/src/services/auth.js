import AsyncStorage from '@react-native-async-storage/async-storage';

import { get, post, HOST, ACCESS_TOKEN } from './api';

export async function login({ email, password }) {
    const response = await post(`${HOST}/api/login`, { email, password });

    await AsyncStorage.setItem(ACCESS_TOKEN, response[ACCESS_TOKEN]);

    return response;
}

export async function persistentLogin() {
    if (!await AsyncStorage.getItem(ACCESS_TOKEN)) {
        return Promise.resolve(null);
    }

    try {
        const response = await get(`${HOST}/api/login/persistent`);

        await AsyncStorage.setItem(ACCESS_TOKEN, response[ACCESS_TOKEN]);

        return response;
    } catch (error) {
        console.error(error.message);

        await AsyncStorage.removeItem(ACCESS_TOKEN);

        throw error;
    }
}

export async function register({ firstName, lastName, email, password }) {
    const response = await post(`${HOST}/api/register`, { firstName, lastName, email, password });

    await AsyncStorage.setItem(ACCESS_TOKEN, response[ACCESS_TOKEN]);

    return response;
}

export async function logout() {
    // post(`${HOST}/api/logout`);

    await AsyncStorage.removeItem(ACCESS_TOKEN);
}