import ObjectInfo from "./object-info";

export type AvailableProviders = "MSSQL";

export function checkIsValidAvailableProvider(value: string): value is AvailableProviders {
    return value === "MSSQL";
}

interface QueryProvider {
    getReferencingViewsQuery(object: ObjectInfo): string;
}

const mssqlQuery = 
`SELECT [s].[name] [Schema], [o].[name] [View name]
FROM [sys].[sql_expression_dependencies] [d]
    INNER JOIN [sys].[objects] [o] ON [o].[object_id] = [d].[referencing_id] AND [o].[type_desc] = 'View'
    INNER JOIN [sys].[schemas] s ON [s].[schema_id] = [o].[schema_id]
    INNER JOIN [sys].[objects] [referenced_object] ON [referenced_object].[object_id] = [d].[referenced_id]
    INNER JOIN [sys].[schemas] [referenced_schema] ON [referenced_schema].[schema_id] = [referenced_object].[schema_id]
WHERE [referenced_object].[name] = '@name'
    AND [referenced_schema].[name] = '@schema'
ORDER BY [s].[name], [o].[name]`;

const QueryProviders: Record<AvailableProviders, QueryProvider> = {
    "MSSQL": {
        getReferencingViewsQuery: (object: ObjectInfo) => {
            return mssqlQuery
                .replace('@name', object.name)
                .replace('@schema', object.schema);
        }
    }
};



export default QueryProviders;