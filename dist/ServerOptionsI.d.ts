import ClientRepositoryI from "./repositories/ClientRepositoryI";
import TokenRepositoryI from "./repositories/TokenRepositoryI";
import UserRepositoryI from "./repositories/UserRepositoryI";
export default interface ServerOptionsI {
    clientRepository?: ClientRepositoryI;
    tokenRepository?: TokenRepositoryI;
    userRepository?: UserRepositoryI;
    privateKey?: string;
    tokenExpiryMins?: number;
    encryptionKey?: string;
}
