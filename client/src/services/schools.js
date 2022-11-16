import { HOST, get, post, put } from './api';

export async function getSchools() {
    return await get(`${HOST}/schools`);
}

export async function getSchoolById(schoolId) {
    return await get(`${HOST}/schools/${schoolId}`);
}

export async function createSchool(name) {
    return await post(`${HOST}/schools`, { name });
}

export async function renameSchoolById(id, name) {
    return await put(`${HOST}/schools/${id}`, { name });
}