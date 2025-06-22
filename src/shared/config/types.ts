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

export interface SigninValidationErrors {
    email?: string | undefined;
    password?: string | undefined;
}

export interface SignupValidationErrors {
    email?: string | undefined;
    name?: string | undefined;
    password?: string | undefined;
}

export interface ValidationErrorsObject {
    [key: string]: string;
}
