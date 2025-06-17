export interface SigninData {
    email: string;
    password: string;
}

export interface SignupData {
    email: string;
    name: string;
    password: string;
}

export interface SigninResponse {
    displayName: string;
    email: string;
    expiresIn: string;
    idToken: string;
    kind: string;
    localId: string;
    refreshToken: string;
    registered: boolean;
}

export interface SignupResponse {
    email: string;
    expiresIn: string;
    idToken: string;
    kind: string;
    localId: string;
    refreshToken: string;
}
