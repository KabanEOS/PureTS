import 'reflect-metadata';

import { Container } from 'inversify';

import { initializePlugins } from './plugin-initializers/standard.plugin.initializer';
import { loadStaticPlugins } from './plugin-loaders/static.plugin.loader';

export const initializeContainer = (): Container => {
  const container = new Container();

  const plugins = loadStaticPlugins(container);
  initializePlugins(container, plugins);

  return container;
};