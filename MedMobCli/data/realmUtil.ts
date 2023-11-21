import { useQuery } from "@realm/react";
import { SurgeryModel } from "./schema/surgery.model"
import { Procedure } from "../domain/surgery";
import { useRealm } from "./realmProvider";

export class realmUtil {

    public static fetchSurgeries = () => {
        return new Promise((resolve, reject) => {
            try {
                //let db = useRealm();
                //db.objects(SurgeryModel)
                let surgeries = useQuery(SurgeryModel); 

                resolve(surgeries)
            } catch (e) {
                reject(e)
            }
        });
    }

    public static addSurgery = (surgery:Procedure) => {
        return new Promise((resolve, reject) => {
            try {
                let realm = useRealm();
                // db.objects(SurgeryModel)
                // let surgeries = useQuery(SurgeryModel); 
                realm.write(() => {
                    realm.create('Surgery', {
                        id: surgery.id, 
                        caseNumber: surgery.caseNumber, 
                        patientName: surgery.patientName,
                        urIdentifier: surgery.urIdentifier,
                        date: surgery.date,
                        surgeon: surgery.surgeon,
                        hospital: surgery.hospital,
                        indication: surgery.indication
                    });
                  });
                resolve(surgery)
            } catch (e) {
                reject(e)
            }
        });
    }

    
}