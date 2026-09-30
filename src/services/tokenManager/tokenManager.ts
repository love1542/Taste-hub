import * as Keychain from 'react-native-keychain';

type TokenManagerType = {
    saveAccessToken: (accessToken: string) => void;
    getAccessToken: () => string | null;

    saveRefreshToken: (refreshToken: string) => Promise<void>;
    getRefreshToken: () => Promise<string | null>;

    clearTokens: () => Promise<void>;
};

const REFRESH_TOKEN_SERVICE = 'tastehub.refreshToken';

let accessToken: string | null = null;

export const TokenManager: TokenManagerType = {

    getAccessToken: () => accessToken,

    saveAccessToken: (token) => {
        accessToken = token;
    },

    saveRefreshToken: async (refreshToken) => {
        await Keychain.setGenericPassword(
            'refreshToken',
            refreshToken,
            {
                service: REFRESH_TOKEN_SERVICE,
            }
        );
    },

    getRefreshToken: async () => {
        const credentials = await Keychain.getGenericPassword({
            service: REFRESH_TOKEN_SERVICE,
        });

        if (!credentials) {
            return null;
        }

        return credentials.password;
    },

    clearTokens: async () => {
        accessToken = null;

        await Keychain.resetGenericPassword({
            service: REFRESH_TOKEN_SERVICE,
        });
    },
};