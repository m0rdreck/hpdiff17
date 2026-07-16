import * as migration_20260716_162129_initial from './20260716_162129_initial';

export const migrations = [
  {
    up: migration_20260716_162129_initial.up,
    down: migration_20260716_162129_initial.down,
    name: '20260716_162129_initial'
  },
];
