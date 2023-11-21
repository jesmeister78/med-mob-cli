import { RawImageModel } from "./schema/rawImage.model";
import { SurgeryModel } from "./schema/surgery.model";
import {createRealmContext} from '@realm/react';

// Create a configuration object
export const realmConfig: Realm.Configuration = {
    schema: [SurgeryModel, RawImageModel],
  };
  // Create a realm context
  export const {RealmProvider, useRealm, useObject, useQuery} =
    createRealmContext(realmConfig);
  