import { expect } from "chai";
import ObjectInfo from '../../queries/object-info';
import QueryProviders, { checkIsValidAvailableProvider } from '../../queries/query-provider';

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
    suite("checkIsValidAvailableProvider", () => {
      test("should return true when given 'MSSQL'", () => {
        expect(checkIsValidAvailableProvider("MSSQL")).to.be.true;
      });
    
      test("should return false when given an empty string", () => {
        expect(checkIsValidAvailableProvider("")).to.be.false;
      });
    
      test("should return false when given 'MySQL'", () => {
        expect(checkIsValidAvailableProvider("MySQL")).to.be.false;
      });
    });
  });
});