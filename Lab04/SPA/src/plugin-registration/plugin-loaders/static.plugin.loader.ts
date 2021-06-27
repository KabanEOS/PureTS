import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';

import { PluginRegistrationTypes } from 'plugin-registration/di/inversify.types';
import { PluginRegistration } from 'plugin-registration/plugin.registrator.interface';

//level-1 plugins
import 'plugins/level-1/authorization/di/inversify.bindings';

export const loadStaticPlugins = (container: Container): PluginRegistration[] => {
  container.load(buildProviderModule());
  return container.getAll<PluginRegistration>(PluginRegistrationTypes.PluginRegistration);
};