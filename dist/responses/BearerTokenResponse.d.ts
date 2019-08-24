import AbstractTokenResponse from "./AbstractTokenResponse";
import TokenResponseI from "./TokenResponseI";
import TokenResponseEntityI from "./TokenResponseEntityI";
export default class BearerTokenResponse extends AbstractTokenResponse implements TokenResponseI {
    getTokenResponseEntity(): TokenResponseEntityI;
    getRefreshToken(): string;
}
