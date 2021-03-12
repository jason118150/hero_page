const initialState = {
    global: {
        isLoading: false,
    }
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_LOADING': {
            return {
                ...state,
                global: {
                    isLoading: action.payload,
                }
            }
        }
        default:
            return state;
    }
}