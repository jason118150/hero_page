import { actionTypes } from "../actionTypes";

export const setLoading = (isLoading) => {
    return {
        type: actionTypes.global.SET_LOADING,
        payload: isLoading,
    }
}