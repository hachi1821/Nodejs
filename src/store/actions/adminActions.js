import actionTypes from "./actionTypes";
import {
    getAllCodeService, createNewUserService,
    getAllUsers, deleteUserService, editUserService,
    getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService
} from "../../services/userService";
import { toast } from "react-toastify";

//GENDER
export const fetGendersStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetGenderSucess(res.data));
            } else {
                dispatch(fetGenderFailed());
            }
        } catch (e) {
            dispatch(fetGenderFailed());
            console.log('fetgender start error', e);
        }
    }

}
export const fetGenderSucess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})
export const fetGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
// POSITION
export const fetPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START })
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetPositionSucess(res.data));
            } else {
                dispatch(fetPositionFailed());
            }
        } catch (e) {
            dispatch(fetPositionFailed());
            console.log('fetgender start error', e);
        }
    }
}
export const fetPositionSucess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})
export const fetPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})
//ROLE
export const fetRoleStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetRoleSucess(res.data));
            } else {
                dispatch(fetRoleFailed());
            }
        } catch (e) {
            dispatch(fetRoleFailed());
            console.log('fetgender start error', e);
        }
    }

}
export const fetRoleSucess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})
export const fetRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})
//CREATE USER 
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user Success");
                dispatch(createNewUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(createNewUserFailed());
            }
        } catch (e) {
            dispatch(createNewUserFailed());
            console.log('fetgender start error', e);
        }
    }
}
export const createNewUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})
export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
//EDIT USER
export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.warning("Update user success");
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Update user errr");
                dispatch(editUserFailed());
            }
        } catch (e) {
            dispatch(editUserFailed());
            toast.error("Update user errr");
            console.log('Update errr', e);
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})
//DELETE USER
export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.warning("Delete user success");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Delete user errr");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            toast.error("Delete user errr");
            console.log('delete errr', e);
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})
//GET ALL USER
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                //short user 
                // hàm sort theo phần tử mới nhất 
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                toast.error("fetch all user errr");
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("fetch all user errr");
            dispatch(fetchAllUsersFailed());
            console.log('ffetchAllUsersFailed error', e);
        }
    }
}
// get trả về tất cả user nên có key là users : giá trị là data
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
//failed thì k cần truyền data trả về rỗng xảy ra khi kết nối lỗi trả về api lỗi
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED // viết như thế này để khi sửa  chỉ cần sữa ở file actiontypes

})
//get top doctor

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            console.log('admin check res', res);
            if (res && res.errCode === 0) {
                //short user 
                // hàm sort theo phần tử mới nhất 
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILED', e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED
            })
        }
    }
}
// lay tat cả bác sĩ 
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILED', e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            })
        }
    }
}
// THÊM THÔN TIN BÁC SĨ 
export const saveDetailDoctors = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success("Save infor detail doctor success");
                dispatch({
                    type: actionTypes.FETCH_DETAIL_DOCTOR_SUCCESS,
                    dataDr: res.data,
                });
            } else {
                toast.error("Save infor detail doctor errr");
                dispatch({
                    type: actionTypes.FETCH_DETAIL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            toast.error("Save infor detail doctor  errr");
            console.log('FETCH_ALL_DOCTORS_FAILED', e);
            dispatch({
                type: actionTypes.FETCH_DETAIL_DOCTOR_FAILED
            })
        }
    }
}
//THÊM THÔNG TIN LỊCH KHÁM BỆNH CỦA BÁC SĨ  
export const fetchAllScheduleTimes = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIMES_SUCCESS,
                    dataTime: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIMES_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIMES_FAILED,', e);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIMES_FAILED,
            })
        }
    }
}
//Privce ... .. ....
export const getRequiredDoctorInfor = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })
            let resPrivce = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");

            if (resPrivce && resPrivce.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
            ) {
                let data = {
                    resPrivce: resPrivce.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log('fetchRequiredDoctorInforFailed error', e);
        }
    }

}
export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData,
})
export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
})
// let res1 = await getTopDoctorHomeService(3);
//action chuẩn start-doing-end