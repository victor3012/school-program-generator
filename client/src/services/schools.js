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
export async function getRooms(schoolId) {
    return await get(`${URI}/${schoolId}/rooms`);
}

export async function createRoom(schoolId, name) {
    return await post(`${URI}/${schoolId}/rooms`, { name });
}

export async function editRoom(schoolId, roomId, name) {
    return await put(`${URI}/${schoolId}/rooms/${roomId}`, { name });
}


// subjects
export async function getSubjects(schoolId) {
    return await get(`${URI}/${schoolId}/subjects`);
}

export async function createSubject(schoolId, name) {
    return await post(`${URI}/${schoolId}/subjects`, { name });
}

export async function editSubject(schoolId, subjectId, name) {
    return await put(`${URI}/${schoolId}/subjects/${subjectId}`, { name });
}


// requests
export async function getRequests(schoolId) {
    return await get(`${URI}/${schoolId}/requests`);
}

export async function createRequest(schoolId, {
    roomId,
    from,
    to
}) {
    return await post(`${URI}/${schoolId}/requests`, { roomId, from, to });
}

export async function editRequest(schoolId, requestId, {
    roomId,
    from,
    to
}) {
    return await put(`${URI}/${schoolId}/requests/${requestId}`, { roomId, from, to });
}