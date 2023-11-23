import { RawImageModel } from "./schema/rawImage.model";
import { ProcedureModel } from "./schema/procedure.model";
import {createRealmContext} from '@realm/react';

// Create a configuration object
export const realmConfig: Realm.Configuration = {
    schema: [ProcedureModel, RawImageModel],
  };
  // Create a realm context
  export const {RealmProvider, useRealm, useObject, useQuery} =
    createRealmContext(realmConfig);
  