import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources(
    [
      './value-converters/time-format',
      './value-converters/two-digits'
    ]
  );
}
