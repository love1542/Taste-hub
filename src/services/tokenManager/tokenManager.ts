type TokenManagerType = {
    saveAccessToken: (accessToken: string) => void;
    getAccessToken: () => string | null
}

let accessToken: string | null = null

export const TokenManager: TokenManagerType = {
    getAccessToken: () => accessToken,

    saveAccessToken: (token) => {accessToken = token}
}