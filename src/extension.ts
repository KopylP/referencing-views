'use strict';

import * as vscode from 'vscode';
import * as azdata from 'azdata';
import QueryProviders from './queries/query-provider';
import ObjectInfo from './queries/object-info';
import { isConnectionCorrect } from './helpers/helpers';
import { ContextSave as SafeContext } from './types/types';

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

const runReferencingViewsQuery = async (context: SafeContext): Promise<void> => {
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
