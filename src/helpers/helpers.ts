import { ContextSave } from './../types/types';
import * as azdata from "azdata";
import { checkIsValidAvailableProvider } from "../queries/query-provider";

export const isConnectionCorrect = (context: azdata.ObjectExplorerContext): context is ContextSave =>
    typeof context?.connectionProfile?.providerName !== 'undefined'
    && typeof context?.nodeInfo?.label !== 'undefined'
    && checkIsValidAvailableProvider(context.connectionProfile.providerName);