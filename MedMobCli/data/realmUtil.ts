import { useQuery } from "@realm/react";
import { ProcedureModel } from "./schema/procedure.model"
import { Procedure } from "../domain/procedure";
import { useRealm } from "./realmProvider";
import { RawImageModel } from "./schema/rawImage.model";

export class realmUtil {

    public static fetchProcedures = () => {
        return new Promise((resolve, reject) => {
            try {
                //let db = useRealm();
                //db.objects(SurgeryModel)
                let procedures = useQuery(ProcedureModel); 

                resolve(procedures)
            } catch (e) {
                reject(e)
            }
        });
    }
    
    public static fetchImages = () => {
        return new Promise((resolve, reject) => {
            try {
                //let db = useRealm();
                //db.objects(SurgeryModel)
                let images = useQuery(RawImageModel); 

                resolve(images)
            } catch (e) {
                reject(e)
            }
        });
    }

    public static addProcedure = (procedure:Procedure) => {
        return new Promise((resolve, reject) => {
            try {
                let realm = useRealm();
                // db.objects(SurgeryModel)
                // let surgeries = useQuery(SurgeryModel); 
                realm.write(() => {
                    realm.create('Procedure', {
                        id: procedure.id, 
                        caseNumber: procedure.caseNumber, 
                        patientName: procedure.patientName,
                        urIdentifier: procedure.urIdentifier,
                        date: procedure.date,
                        surgeon: procedure.surgeon,
                        hospital: procedure.hospital,
                        indication: procedure.indication
                    });
                  });
                resolve(procedure)
            } catch (e) {
                reject(e)
            }
        });
    }

    
}