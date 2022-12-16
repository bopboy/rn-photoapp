import {
    getAuth,
    signInWithEmailAndPassword,
    AuthErrorCodes,
} from 'firebase/auth';

export const signIn = async ({ email, password }) => {
    const { user } = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
    );
    return user;
};

export const getAuthErrorMessage = (errorCode) => {
    switch (errorCode) {
        case AuthErrorCodes.USER_DELETED:
            return '계정을 찾을 수 없어';
        case AuthErrorCodes.INVALID_EMAIL:
            return '그런 이메일 주소가 없어';
        case AuthErrorCodes.INVALID_PASSWORD:
            return '비번이 틀리네';
        default:
            return '로그인 실패!!';
    }
};
