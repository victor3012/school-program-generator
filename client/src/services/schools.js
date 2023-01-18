import { HOST, get, post, put } from './api';

const URI = `${HOST}/schools`;

// schools
export async function getSchools() {
    return await get(URI);
}

export async function getSchoolById(schoolId) {
    return await get(`${URI}/${schoolId}`);
}

export async function createSchool(name) {
    return await post(URI, { name });
}

export async function renameSchool(schoolId, name) {
    return await put(`${URI}/${schoolId}`, { name });
}


// teachers
export async function getTeachers(schoolId) {
    return await get(`${URI}/${schoolId}/teachers`);
}

export async function createTeacher(schoolId, {
    firstName,
    lastName,
    email,
    role
}) {
    return await post(`${URI}/${schoolId}/teachers`, { firstName, lastName, email, role });
}

export async function editTeacher(schoolId, teacherId, {
    firstName,
    lastName,
    email,
    role
}) {
    return await put(`${URI}/${schoolId}/teachers/${teacherId}`, { firstName, lastName, email, role });
}


// rooms
export async function getRoomTypes(schoolId) {
    return await get(`${URI}/${schoolId}/roomTypes`);
}

export async function getRooms(schoolId) {
    return await get(`${URI}/${schoolId}/rooms`);
}

export async function createRoom(schoolId, { name, type }) {
    return await post(`${URI}/${schoolId}/rooms`, { name, type });
}

export async function editRoom(schoolId, roomId, name) {
    return await put(`${URI}/${schoolId}/rooms/${roomId}`, { name, type });
}


// subjects
export async function getSubjectTypes(schoolId) {
    return await get(`${URI}/${schoolId}/subjectTypes`);
}

export async function getSubjects(schoolId) {
    return await get(`${URI}/${schoolId}/subjects`);
}

export async function createSubject(schoolId, { name, type, roomType }) {
    return await post(`${URI}/${schoolId}/subjects`, { name, type, roomType });
}

export async function editSubject(schoolId, subjectId, { name, type, roomType }) {
    return await put(`${URI}/${schoolId}/subjects/${subjectId}`, { name, type, roomType });
}


// classes
export async function getClasses(schoolId) {
    return await get(`${URI}/${schoolId}/classes`);
}

export async function createClass(schoolId, name) {
    return await post(`${URI}/${schoolId}/classes`, { name });
}

export async function editClass(schoolId, { id, name }) {
    return await put(`${URI}/${schoolId}/classes/${id}`, { name });
}