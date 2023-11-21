import Realm, { ObjectSchema } from "realm";
import { RawImageModel } from "./rawImage.model";
import { Procedure } from "../../domain/surgery";

export class SurgeryModel extends Realm.Object<SurgeryModel> implements Procedure {

    id!: string; // uuidv4()
    caseNumber!: number
    patientName!: string
    urIdentifier!: string
    date!: Date
    surgeon!: string
    hospital!: string;
    indication?: string
    images?: RawImageModel[]

    static schema: ObjectSchema = {
        name: 'Surgery',
        properties: {
            id: {
                type: 'string',
                indexed: true,
              },
            caseNumber: 'int',
            patientName: 'string',
            urIdentifier: 'string',
            date: 'date',
            surgeon: 'string',
            hospital: 'string',
            indication: {
                type: 'string',
                optional: true,
              },
               // A manufacturer's related LinkedCar objects
            images: 'RawImage[]',
        },
        primaryKey: 'id',
    };
}