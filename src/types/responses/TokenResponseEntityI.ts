export default interface TokenResponseEntityI{
    access_token: string,
    expires_at: string,
    refresh_token?: string
}