import { expect } from 'chai';
import ObjectInfo from '../../queries/object-info';

suite('ObjectInfo', function() {
    suite('constructor', function() {
    test('should split a valid object name into schema and name', function() {
      const objectName = 'dbo.MyTable';
      const objectInfo = new ObjectInfo(objectName);

      expect(objectInfo.schema).to.equal('dbo');
      expect(objectInfo.name).to.equal('MyTable');
    });

    test('should throw an error for an invalid object name', function() {
      const objectName = 'MyTable';
      expect(() => new ObjectInfo(objectName)).to.throw('Argument objectName is invalid.');
    });
  });
});