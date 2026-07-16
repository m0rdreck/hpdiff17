import * as migration_20260716_162129_initial from './20260716_162129_initial';
import * as migration_20260716_183954_site_settings from './20260716_183954_site_settings';
import * as migration_20260716_205643_service_areas from './20260716_205643_service_areas';
import * as migration_20260716_211715_service_details from './20260716_211715_service_details';
import * as migration_20260716_214314_pages from './20260716_214314_pages';
import * as migration_20260717_090000_guides_related_rel from './20260717_090000_guides_related_rel';

export const migrations = [
  {
    up: migration_20260716_162129_initial.up,
    down: migration_20260716_162129_initial.down,
    name: '20260716_162129_initial',
  },
  {
    up: migration_20260716_183954_site_settings.up,
    down: migration_20260716_183954_site_settings.down,
    name: '20260716_183954_site_settings',
  },
  {
    up: migration_20260716_205643_service_areas.up,
    down: migration_20260716_205643_service_areas.down,
    name: '20260716_205643_service_areas',
  },
  {
    up: migration_20260716_211715_service_details.up,
    down: migration_20260716_211715_service_details.down,
    name: '20260716_211715_service_details',
  },
  {
    up: migration_20260716_214314_pages.up,
    down: migration_20260716_214314_pages.down,
    name: '20260716_214314_pages'
  },
  {
    up: migration_20260717_090000_guides_related_rel.up,
    down: migration_20260717_090000_guides_related_rel.down,
    name: '20260717_090000_guides_related_rel'
  },
];
