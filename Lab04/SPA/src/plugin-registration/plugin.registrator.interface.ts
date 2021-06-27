
import { ContainerModule } from 'inversify';

/** Represents a standard module. */
export interface PluginRegistration {
  dependentPlugins: Record<string, unknown>[];
  bindingPriority: number;
  pluginBindings: ContainerModule;
}
