import { useRealm } from "./realmProvider";
import { v4 as uuidv4 } from 'uuid';

const realm = useRealm();

// add data to realm
realm.write(() => {
  realm.create("Surgery", {
    "id": uuidv4(),
    "caseNumber": 1,
    "patientName": "jesse",
    "urIdentifier": "ur1",
    "date": new Date("2023-01-01"),
    "hospital": "Epworth",
    "surgeon": "Henry",
    "indication": "Routine"
  });
  realm.create("Surgery", {
    "id": uuidv4(),
    "caseNumber": 2,
    "patientName": "belinda",
    "urIdentifier": "ur2",
    "date": new Date("2023-02-02"),
    "hospital": "St. Vincent",
    "surgeon": "Katie",
    "indication": "Suspected choledocholithiasis"
  });
  realm.create("Surgery", {
    "id": uuidv4(),
    "caseNumber": 3,
    "patientName": "seb",
    "urIdentifier": "ur3",
    "date": new Date("2023-03-03"),
    "hospital": "Royal Melbourne",
    "surgeon": "Yuming",
    "indication": "Deranged LFTs"
  });
});
realm.close();