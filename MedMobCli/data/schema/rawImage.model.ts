// export interface RawImage {
//     id: string // uuidv4()
//     dateCaptured: Date
//     data: Uint8Array // this is the rendered image BEFORE processing
// }

import Realm, { ObjectSchema } from "realm";
import { RawImage } from "../../domain/rawImage";
import { SurgeryModel } from "./surgery.model";

export class RawImageModel extends Realm.Object<RawImageModel> implements RawImage {
    _id!: Realm.BSON.ObjectId;
    id!: string // uuidv4()
    timestamp!: Date
    data!: Uint8Array // this is the rendered image BEFORE processing
    surgery?: SurgeryModel

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
              surgery: {
                type: 'linkingObjects',
                objectType: 'Surgery',
                property: 'images',
              },
           
        },
        primaryKey: '_id',
    };
}