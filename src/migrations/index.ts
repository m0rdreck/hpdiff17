import * as migration_20260716_162129_initial from './20260716_162129_initial';
import * as migration_20260716_183954_site_settings from './20260716_183954_site_settings';

export const migrations = [
  {
    up: migration_20260716_162129_initial.up,
    down: migration_20260716_162129_initial.down,
    name: '20260716_162129_initial',
  },
  {
    up: migration_20260716_183954_site_settings.up,
    down: migration_20260716_183954_site_settings.down,
    name: '20260716_183954_site_settings'
  },
];
