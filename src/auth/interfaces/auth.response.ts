export interface AuthResponseSuccess {
    username: string;
    nama: string;
    state: 1;
    kode_org: string;
    kodeidentitas: string;
    nama_role: string;
}

export interface AuthResponseFailed {
    state: 0;
}

export type AuthResponse = AuthResponseSuccess | AuthResponseFailed;