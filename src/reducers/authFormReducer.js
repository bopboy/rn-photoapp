export const initAuthForm = {
    email: '',
    password: '',
    passwordConfirm: '',
    isLoading: false,
    disabled: true,
};

export const AuthFromTypes = {
    UPDATE_FORM: 'UPDATE_FORM',
    TOGGLE_LOADING: 'TOGGLE_LOADING',
    RESET: 'RESET',
};

export const authFormReducer = (state, action) => {
    switch (action.type) {
        case AuthFromTypes.UPDATE_FORM:
            return { ...state, ...action.payload };
        case AuthFromTypes.TOGGLE_LOADING:
            return { ...state, isLoading: !state.isLoading };
        case AuthFromTypes.RESET:
            return initAuthForm;
        default:
            return state;
    }
};
