import { assert }       from 'chai';

import PluginManager    from '@typhonjs-plugin/manager';

import { ColorLogger }  from '../../src/ColorLogger.js';
import logger           from '../../src/plugin.js';

// TODO: Add more tests!
describe('ColorLogger:', () =>
{
   // let oldConsole;

   // beforeEach(() => { oldConsole = console.log; });
   // afterEach(() => { console.log = oldConsole; });

   describe('Local logger:', () =>
   {
      it('warn:', () =>
      {
         const result = logger.warn('A warning!');

         assert.isTrue(result.startsWith('\u001b[33m[W]'));

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
         it('random:', () => assert.isFalse(logger.isValidLogLevel('random')));
         it('number:', () => assert.isFalse(logger.isValidLogLevel(2)));
         it('object:', () => assert.isFalse(logger.isValidLogLevel({})));
         it('array:', () => assert.isFalse(logger.isValidLogLevel([])));
      });

      describe('valid log levels:', () =>
      {
         it('off:', () => assert.isTrue(logger.isValidLogLevel('off')));
         it('fatal:', () => assert.isTrue(logger.isValidLogLevel('fatal')));
         it('error:', () => assert.isTrue(logger.isValidLogLevel('error')));
         it('warn:', () => assert.isTrue(logger.isValidLogLevel('warn')));
         it('info:', () => assert.isTrue(logger.isValidLogLevel('info')));
         it('verbose:', () => assert.isTrue(logger.isValidLogLevel('verbose')));
         it('debug:', () => assert.isTrue(logger.isValidLogLevel('debug')));
         it('trace:', () => assert.isTrue(logger.isValidLogLevel('trace')));
         it('all:', () => assert.isTrue(logger.isValidLogLevel('all')));
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
            instance: new ColorLogger()
         });

         eventbus.trigger('log:level:set', 'trace');
      });

      it('eventbus log:', () =>
      {
         eventbus.trigger('log:trace', 'An eventbus trace!');
      });
   });
});
