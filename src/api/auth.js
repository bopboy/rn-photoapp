import {
    getAuth,
    signInWithEmailAndPassword,
    AuthErrorCodes,
    createUserWithEmailAndPassword,
    onAuthStateChanged as onAuthStateChangedFirebase,
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
        case AuthErrorCodes.EMAIL_EXISTS:
            return '이미 가입된 메일이야';
        case AuthErrorCodes.WEAK_PASSWORD:
            return '비번은 6자리 이상인데';
        default:
            return '로그인 실패!!';
    }
};

export const signUp = async ({ email, password }) => {
    const { user } = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
    );
    return user;
};

export const onAuthStateChanged = (callback) => {
    return onAuthStateChangedFirebase(getAuth(), callback);
};
