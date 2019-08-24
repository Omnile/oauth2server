import GrantI from './GrantI';
import AbstractGrant from './AbstractGrant';
import AccessTokenRequestI from '../requests/AccessTokenRequestI';
export default class PasswordGrant extends AbstractGrant implements GrantI {
    getIdentifier(): string;
    /**
     * Responds to password grant access token requests
     * @param {AccessTokenRequestI} request
     * @param {number} accessTokenTTL
     * @returns {Promise<any>}
     */
    respondToAccessTokenRequest(request: AccessTokenRequestI, accessTokenTTL?: number): Promise<any>;
}
