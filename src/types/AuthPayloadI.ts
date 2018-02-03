export interface AuthPayloadI {
    /**
     * This will be the username of the client
     * @type {string}
     */
    username: string;

    /**
     * This will be the ID of the client
     * @type {number|string}
     */
    owner_id: number|string;

    /**
     * This will be the type of client
     * @type {number|string}
     */
    owner_type: number|string;
}
