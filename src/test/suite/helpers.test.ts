import { expect } from 'chai';
import { ObjectExplorerContext, IConnectionProfile } from 'azdata';
import { isConnectionCorrect } from '../../helpers/helpers';

// Create a mock ConnectionProfile object for testing
const mockConnectionProfile: IConnectionProfile = {
    providerName: 'MSSQL',
    options: {},
    serverName: '',
    userName: '',
    password: '',
    authenticationType: '',
    savePassword: false,
    saveProfile: false,
    id: ''
};

suite('isConnectionCorrect', function () {
    test('should return true when given a valid ObjectExplorerContext', function () {
        const context: ObjectExplorerContext = {
            connectionProfile: mockConnectionProfile,
            nodeInfo: { label: 'MyDatabase', nodePath: '', nodeType: '', isLeaf: false },
            isConnectionNode: true
        };
        const result = isConnectionCorrect(context);

        expect(result).to.be.true;
    });

    test('should return false when given an ObjectExplorerContext with an undefined connectionProfile', function () {
        const context: ObjectExplorerContext = {
            connectionProfile: undefined,
            nodeInfo: { label: 'MyDatabase', nodePath: '', nodeType: '', isLeaf: false },
            isConnectionNode: true
        };
        const result = isConnectionCorrect(context);

        expect(result).to.be.false;
    });

    test('should return false when given an ObjectExplorerContext with an undefined nodeInfo', function () {
        const context: ObjectExplorerContext = {
            connectionProfile: mockConnectionProfile,
            nodeInfo: undefined,
            isConnectionNode: true
        };
        const result = isConnectionCorrect(context);

        expect(result).to.be.false;
    });

    test('should return false when given an ObjectExplorerContext with an invalid providerName', function () {
        const invalidConnectionProfile: IConnectionProfile = {
            providerName: 'InvalidProvider',
            options: {},
            serverName: '',
            userName: '',
            password: '',
            authenticationType: '',
            savePassword: false,
            saveProfile: false,
            id: ''
        };
        const context: ObjectExplorerContext = {
            connectionProfile: invalidConnectionProfile,
            nodeInfo: { label: 'MyDatabase', nodePath: '', nodeType: '', isLeaf: false },
            isConnectionNode: true
        };
        const result = isConnectionCorrect(context);

        expect(result).to.be.false;
    });
});