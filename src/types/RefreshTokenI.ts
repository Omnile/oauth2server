export default interface RefreshTokenI{
    client_id: string | number,
    refresh_token_id: string,
    access_token_id: string,
    user_id: string | number,
    expire_time: string
}