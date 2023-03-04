import RequiredBy from '../utility-types/required-by';
import { AvailableProviders } from './../queries/query-provider';
import * as azdata from 'azdata';

export type SafeContext = RequiredBy<azdata.ObjectExplorerContext, 'connectionProfile' | 'nodeInfo'>
    & { connectionProfile: azdata.IConnectionProfile & { providerName: AvailableProviders } };