export default interface TokenResponseEntityI{
    access_token: string,
    expires_at: string,
    token_type: string,
    refresh_token?: string
}