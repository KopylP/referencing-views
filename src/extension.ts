'use strict';

import * as vscode from 'vscode';
import * as azdata from 'azdata';
import QueryProviders, { AvailableProviders, checkIsValidAvailableProvider as checkIsAvailableProvider } from './queries/query-provider';
import ObjectInfo from './queries/object-info';
import RequiredBy from './utility-types/required-by';

type ContextSave = RequiredBy<azdata.ObjectExplorerContext, 'connectionProfile' | 'nodeInfo'>
    & { connectionProfile: azdata.IConnectionProfile & { providerName: AvailableProviders } };

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('referencing-views.show', async (context: azdata.ObjectExplorerContext) => {
        try {
            if (isConnectionCorrect(context)) {
                runReferencingViewsQuery(context);
            } else {
                showErrorMessage();
            }
        } catch (err) {
            showErrorMessage();
        }
    }));
}

export const isConnectionCorrect = (context: azdata.ObjectExplorerContext): context is ContextSave =>
    typeof context?.connectionProfile?.providerName !== 'undefined'
    && typeof context?.nodeInfo?.label !== 'undefined'
    && checkIsAvailableProvider(context.connectionProfile.providerName);

const runReferencingViewsQuery = async (context: ContextSave): Promise<void> => {
    const query = QueryProviders[context.connectionProfile.providerName]
        .getReferencingViewsQuery(new ObjectInfo(context.nodeInfo.label));
    const document = await azdata.queryeditor.openQueryDocument({ content: query });
    await azdata.queryeditor.connect(document.uri, context.connectionProfile.id);
    azdata.queryeditor.runQuery(document.uri, undefined, true);
};

const showErrorMessage = () => {
    vscode.window.showErrorMessage("Oops! Something went wrong with your database connection. Please check your connection settings and try again.");
}

export function deactivate() {
}
