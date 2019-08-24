import GrantI from './GrantI';
import AbstractGrant from './AbstractGrant';
import AccessTokenRequestI from '../requests/AccessTokenRequestI';
export default class RefreshTokenGrant extends AbstractGrant implements GrantI {
    getIdentifier(): string;
    /**
     * Responds to a refresh token grant access token requests
     * @param {AccessTokenRequestI} request
     * @param {number} accessTokenTTL
     * @returns {Promise<any>}
     */
    respondToAccessTokenRequest(request: AccessTokenRequestI, accessTokenTTL?: number): Promise<any>;
    /**
     * Checks whether refresh token has expired or is revoked
     *
     * @param {string} refreshToken
     * @returns {Promise<any>}
     */
    private validateRefreshToken;
    private decodeRefreshToken;
}
