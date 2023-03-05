import { IConnectionProfile } from "azdata";

export default class ConnectionProfileFactory {
    static CreateValid = (): IConnectionProfile => {
        return {
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
    };

    static CreateWithInvalidProvider = (): IConnectionProfile => {
        return {
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
    };
}