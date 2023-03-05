import { expect } from 'chai';
import { isConnectionCorrect } from '../../helpers/helpers';
import ObjectExplorerContextFactory from '../framework/object-explorer-context-factory';

suite('isConnectionCorrect', function () {
    test('should return true when given a valid ObjectExplorerContext', function () {
        const context = ObjectExplorerContextFactory.CreateValid();
        const result = isConnectionCorrect(context);
        expect(result).to.be.true;
    });

    test('should return false when given an ObjectExplorerContext with an undefined connectionProfile', function () {
        const context = ObjectExplorerContextFactory.CreateWithUndefinedConnectionProfile();
        const result = isConnectionCorrect(context);
        expect(result).to.be.false;
    });

    test('should return false when given an ObjectExplorerContext with an undefined nodeInfo', function () {
        const context = ObjectExplorerContextFactory.CreateWithUndefinedNodeInfo();
        const result = isConnectionCorrect(context);
        expect(result).to.be.false;
    });

    test('should return false when given an ObjectExplorerContext with an invalid providerName', function () {
        const context = ObjectExplorerContextFactory.CreateWithInvalidProvider();
        const result = isConnectionCorrect(context);
        expect(result).to.be.false;
    });
});