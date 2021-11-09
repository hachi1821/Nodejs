import axios from '../axios';
//login
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}
//get all
const getAllUsers = (inputid) => {
    //template string 
    return axios.get(`/api/get-all-users?id=${inputid}`)
}
// create
const createNewUserService = (data) => {
    return axios.post('api/create-new-user', data)
}
//delete user
const deleteUserService = (userId) => {
    // return axios.delete('api/delete-user', { id: userId })
    return axios.delete('api/delete-user', {
        data: {
            id: userId
        }
    });
}
//edit
const editUserService = (Inputdata) => {
    return axios.put('api/edit-user', Inputdata);
}
//api get allcode 
const getAllCodeService = (inputType) => {
    return axios.get(`api/allcode?type=${inputType}`);
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`api/top-doctor-home?limit=${limit}`);
}
const getAllDoctors = () => {
    return axios.get(`api/get-all-doctors`);
}
const saveDetailDoctorService = (data) => {
    return axios.post('api/save-infor-doctors', data);
}
const getDetailInforDoctor = (inputId) => {
    return axios.get(`api/get-detail-doctors-by-id?id=${inputId}`);
}
const saveBulkScheduleDoctor = (data) => {
    return axios.post('api/bluk-create-schedule', data);
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

export {
    handleLoginApi, getAllUsers,
    createNewUserService, deleteUserService,
    editUserService, getAllCodeService, getTopDoctorHomeService,
    getAllDoctors, saveDetailDoctorService, getDetailInforDoctor,
    getScheduleDoctorByDate, saveBulkScheduleDoctor,
}