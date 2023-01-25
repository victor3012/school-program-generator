import { HOST, get, post, put, del } from './api';

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

export async function getTeacherById(schoolId, id) {
    return await get(`${URI}/${schoolId}/teachers/${id}`);
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

export async function deleteTeacher(schoolId, id) {
    return await del(`${URI}/${schoolId}/teachers/${id}`);
}


// rooms
export async function getRoomTypes(schoolId) {
    return await get(`${URI}/${schoolId}/roomTypes`);
}

export async function getRooms(schoolId) {
    return await get(`${URI}/${schoolId}/rooms`);
}

export async function getRoomById(schoolId, id) {
    return await get(`${URI}/${schoolId}/rooms/${id}`);
}

export async function createRoom(schoolId, { name, type }) {
    return await post(`${URI}/${schoolId}/rooms`, { name, type });
}

export async function editRoom(schoolId, roomId, { name, type }) {
    return await put(`${URI}/${schoolId}/rooms/${roomId}`, { name, type });
}

export async function deleteRoom(schoolId, id) {
    return await del(`${URI}/${schoolId}/rooms/${id}`);
}

// subjects
export async function getSubjectTypes(schoolId) {
    return await get(`${URI}/${schoolId}/subjectTypes`);
}

export async function getSubjects(schoolId) {
    return await get(`${URI}/${schoolId}/subjects`);
}

export async function getSubjectById(schoolId, id) {
    return await get(`${URI}/${schoolId}/subjects/${id}`);
}

export async function createSubject(schoolId, { name, type, roomType }) {
    return await post(`${URI}/${schoolId}/subjects`, { name, type, roomType });
}

export async function editSubject(schoolId, subjectId, { name, type, roomType }) {
    return await put(`${URI}/${schoolId}/subjects/${subjectId}`, { name, type, roomType });
}

export async function deleteSubject(schoolId, id) {
    return await del(`${URI}/${schoolId}/subjects/${id}`);
}

// classes
export async function getClasses(schoolId) {
    return await get(`${URI}/${schoolId}/classes`);
}

export async function getClassById(schoolId, id) {
    return await get(`${URI}/${schoolId}/classes/${id}`);
}

export async function createClass(schoolId, name) {
    return await post(`${URI}/${schoolId}/classes`, { name });
}

export async function editClass(schoolId, id, { name }) {
    return await put(`${URI}/${schoolId}/classes/${id}`, { name });
}

export async function deleteClass(schoolId, id) {
    return await del(`${URI}/${schoolId}/classes/${id}`);
}