import {
    getAuth,
    signInWithEmailAndPassword,
    AuthErrorCodes,
    createUserWithEmailAndPassword,
    onAuthStateChanged as onAuthStateChangedFirebase,
    signOut as signOutFirebase,
    updateProfile,
} from 'firebase/auth';

const PHOTO_URL =
    'https://firebasestorage.googleapis.com/v0/b/rn-photoapp.appspot.com/o/profile.png?alt=media';

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
    await updateUserInfo({
        displayName: email.split('@')[0].slice(0, 10),
        photoURL: PHOTO_URL,
    });
    return user;
};

export const onAuthStateChanged = (callback) => {
    return onAuthStateChangedFirebase(getAuth(), callback);
};

export const signOut = async () => {
    await signOutFirebase(getAuth());
};

const updateUserInfo = async (userInfo) => {
    try {
        await updateProfile(getAuth().currentUser, userInfo);
    } catch (e) {
        throw new Error('사용자 정보 수정 실패');
    }
};
