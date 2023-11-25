// export interface RawImage {
//     id: string // uuidv4()
//     dateCaptured: Date
//     data: Uint8Array // this is the rendered image BEFORE processing
// }

import Realm, { ObjectSchema } from "realm";
import { RawImage } from "../../domain/rawImage";
import { ProcedureModel } from "./procedure.model";

export class RawImageModel extends Realm.Object<RawImageModel> implements RawImage {
    _id!: Realm.BSON.ObjectId;
    id!: string // uuidv4()
    imageTimestamp!: Date
    imageData!: Uint8Array // this is the rendered image BEFORE processing
    surgery?: ProcedureModel

    static schema: ObjectSchema = {
        name: 'RawImage',
        properties: {
            _id: 'objectId',
            id: {
                type: 'string', // this will become uuid
                indexed: true,
              },
              timestamp: 'date',
              data: 'string',
              // relationships
              procedure: {
                type: 'linkingObjects',
                objectType: 'Procedure',
                property: 'images',
              },
           
        },
        primaryKey: '_id',
    };
}