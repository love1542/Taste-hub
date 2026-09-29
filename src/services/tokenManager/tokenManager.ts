type TokenManagerType = {
    saveAccessToken: (accessToken: string) => void;
    getAccessToken: () => string | null
    clearToken: () => void;
}

let accessToken: string | null = null

export const TokenManager: TokenManagerType = {
    getAccessToken: () => accessToken,

    saveAccessToken: (token) => { accessToken = token },

    clearToken: () => {
        accessToken = null
    },

}