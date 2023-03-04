import { expect } from "chai";
import ObjectInfo from '../../queries/object-info';
import QueryProviders from '../../queries/query-provider';

suite('QueryProviders', () => {
  suite('MSSQL', () => {
    suite('getReferencingViewsQuery', () => {
      test('returns the correct query string', () => {
        const object = new ObjectInfo('dbo.view1');
        const query = QueryProviders['MSSQL'].getReferencingViewsQuery(object);
        expect(query).contain(`WHERE [referenced_object].[name] = '${object.name}'`);
        expect(query).contain(`AND [referenced_schema].[name] = '${object.schema}'`);
      });
    });
  });
});