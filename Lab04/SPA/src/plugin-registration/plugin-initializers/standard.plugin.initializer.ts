import { Container } from 'inversify/dts/container/container';

import { PluginRegistration } from 'plugin-registration/plugin.registrator.interface';

export const initializePlugins = (container: Container, plugins: PluginRegistration[]): void => {
  //this is to ensure that plugins are loaded in proper order
  plugins.sort((a, b) => a.bindingPriority - b.bindingPriority);

  //register DI dependencies
  const pluginBindings = plugins.map(dr => dr.pluginBindings).flat();
  pluginBindings.forEach(mb => container.load(mb));
};