import { ObjectExplorerContext, IConnectionProfile } from 'azdata';
import ConnectionProfileFactory from './connection-profile-factory';


export default class ObjectExplorerContextFactory {
    static CreateValid = (): ObjectExplorerContext => {
        return {
            connectionProfile: ConnectionProfileFactory.CreateValid(),
            nodeInfo: { label: 'MyDatabase', nodePath: '', nodeType: '', isLeaf: false },
            isConnectionNode: true
        };
    };

    static CreateWithUndefinedConnectionProfile = (): ObjectExplorerContext => {
        return {
            connectionProfile: undefined,
            nodeInfo: { label: 'MyDatabase', nodePath: '', nodeType: '', isLeaf: false },
            isConnectionNode: true
        };
    };

    static CreateWithUndefinedNodeInfo = (): ObjectExplorerContext => {
        return {
            connectionProfile: ConnectionProfileFactory.CreateValid(),
            nodeInfo: undefined,
            isConnectionNode: true
        };
    };

    static CreateWithInvalidProvider = (): ObjectExplorerContext => {
        return {
            connectionProfile: ConnectionProfileFactory.CreateWithInvalidProvider(),
            nodeInfo: { label: 'MyDatabase', nodePath: '', nodeType: '', isLeaf: false },
            isConnectionNode: true
        };
    };
}