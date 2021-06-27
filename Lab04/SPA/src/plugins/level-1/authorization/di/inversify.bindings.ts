import { ContainerModule } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { PluginRegistrationTypes } from 'plugin-registration/di/inversify.types';
import { PluginRegistration } from 'plugin-registration/plugin.registrator.interface';

@provide(PluginRegistrationTypes.PluginRegistration)
export class AuthorizationPluginRegistration implements PluginRegistration {
  bindingPriority = 1.2;

  dependentPlugins = [];

  pluginBindings = new ContainerModule(bind => {
    bind('');
  });
};