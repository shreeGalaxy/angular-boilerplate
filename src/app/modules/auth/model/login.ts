export interface Login {
    email: string | null | undefined;
    password: string | null | undefined;
}

export interface loginData {
    message: string | null | undefined;
    token: string | null | undefined;
}

export interface message {
    message: string | null | undefined;
}

export interface profileData {
    name: string | null | undefined;
    email: string | null | undefined;
    password: string | null | undefined;
    confirmPassword: string | null | undefined;
    city: string | null | undefined;
    place: string | null | undefined;
    phoneNumber: string | null | undefined;
}
