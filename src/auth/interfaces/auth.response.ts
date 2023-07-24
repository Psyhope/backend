export interface AuthResponseSuccess {
    status: 200,
    message: 'OK',
    data: {
        name: string
        role: string
        group: string;
    }
}

