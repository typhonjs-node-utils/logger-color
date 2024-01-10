import { assert }          from 'chai';

import { PluginManager }   from '@typhonjs-plugin/manager';

import logger              from '../../src/plugin/index.js';

// TODO: Add more tests!
describe('ColorLogger Plugin:', () =>
{
   // let oldConsole;

   // beforeEach(() => { oldConsole = console.log; });
   // afterEach(() => { console.log = oldConsole; });

   describe('Local logger:', () =>
   {
      it('warn:', () =>
      {
         const result = logger.warn('A warning!');

         assert.isTrue(result.startsWith('\u001b[33m'));

         assert.strictEqual(logger.getLogLevel(), 'info');
      });

      it('trace:', () =>
      {
         logger.setLogLevel('trace');
         logger.trace('A trace!');
         assert.strictEqual(logger.getLogLevel(), 'trace');
      });

      describe('invalid log levels:', () =>
      {
         it('random:', () => assert.isFalse(logger.isValidLevel('random')));
         it('number:', () => assert.isFalse(logger.isValidLevel(2)));
         it('object:', () => assert.isFalse(logger.isValidLevel({})));
         it('array:', () => assert.isFalse(logger.isValidLevel([])));
      });

      describe('valid log levels:', () =>
      {
         it('off:', () => assert.isTrue(logger.isValidLevel('off')));
         it('fatal:', () => assert.isTrue(logger.isValidLevel('fatal')));
         it('error:', () => assert.isTrue(logger.isValidLevel('error')));
         it('warn:', () => assert.isTrue(logger.isValidLevel('warn')));
         it('info:', () => assert.isTrue(logger.isValidLevel('info')));
         it('verbose:', () => assert.isTrue(logger.isValidLevel('verbose')));
         it('debug:', () => assert.isTrue(logger.isValidLevel('debug')));
         it('trace:', () => assert.isTrue(logger.isValidLevel('trace')));
         it('all:', () => assert.isTrue(logger.isValidLevel('all')));
      });
   });

   describe('PluginManager:', () =>
   {
      let eventbus, pluginManager;

      beforeEach(async () =>
      {
         pluginManager = new PluginManager();
         eventbus = pluginManager.getEventbus();

         await pluginManager.add({
            name: '@typhonjs-utils/error-parser',
            options: {
               filterConfigs: [{
                  type: 'exclusive',
                  name: '@typhonjs-utils/logger-color',
                  filterString: 'src/ColorLogger.js'
               }]
            }
         });

         await pluginManager.add({
            name: '@typhonjs-utils/logger-color',
            instance: logger
         });

         eventbus.trigger('log:level:set', 'trace');
      });

      it('eventbus log:', () =>
      {
         eventbus.trigger('log:trace', 'An eventbus trace!');
      });
   });
});
