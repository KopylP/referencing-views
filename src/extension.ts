'use strict';

import * as vscode from 'vscode';
import * as azdata from 'azdata';
import QueryProviders from './queries/query-provider';
import ObjectInfo from './queries/object-info';
import { isConnectionCorrect } from './helpers/helpers';
import { SafeContext as SafeContext } from './types/types';

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
    
    const connection = await getConnection(context);
    
    const document = await azdata.queryeditor.openQueryDocument({ content: query });
    await document.connect(connection);
    
    azdata.queryeditor.runQuery(document.uri, undefined, true);
};

const getConnection= async (context: SafeContext): Promise<azdata.connection.ConnectionProfile> => {
    const connection = await azdata.connection.getConnection(await azdata.connection.getUriForConnection(context.connectionProfile.id));
    connection.databaseName = context.connectionProfile.databaseName ?? "";
    connection.options.dbname = context.connectionProfile.databaseName;
    connection.options.database = context.connectionProfile.databaseName;

    return connection;
}

const showErrorMessage = () => {
    vscode.window.showErrorMessage("Oops! Something went wrong with your database connection. Please check your connection settings and try again.");
};

export function deactivate() {
}
