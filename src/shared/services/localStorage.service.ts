interface AuthData {
    idToken: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    name: string;
}

const ID_TOKEN_KEY = "jwt-id-token";
const REFRESH_TOKEN_KEY = "jwt-refresh-token";
const EXPIRES_IN_KEY = "jwt-expires-in";
const LOCAL_ID_KEY = "user-local-id";
const NAME_KEY = "user-name";

const setAuthData = ({ idToken, refreshToken, localId, name }: AuthData) => {
    const expiresIn = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    localStorage.setItem(ID_TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(EXPIRES_IN_KEY, expiresIn.toString());
    localStorage.setItem(LOCAL_ID_KEY, localId);
    localStorage.setItem(NAME_KEY, name);
};

const removeAuthData = () => {
    localStorage.removeItem(ID_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(EXPIRES_IN_KEY);
    localStorage.removeItem(LOCAL_ID_KEY);
    localStorage.removeItem(NAME_KEY);
};

const localStorageService = {
    setAuthData,
    removeAuthData,
};

export default localStorageService;
