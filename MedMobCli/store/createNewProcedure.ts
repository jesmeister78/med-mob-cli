
import { v4 as uuidv4 } from 'uuid';
import { Procedure } from '../domain/procedure';


const createNewProcedure = (caseNumber: number) => {
    return {
        id: uuidv4(),
        caseNumber: caseNumber,
        patientName: '',
        urIdentifier: '',
        date: new Date().toISOString(),
        hospital: '',
        surgeon: '',
  
        surgeryType: '',
  
        indication: ''
      } as Procedure;
};

export default createNewProcedure;