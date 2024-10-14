
import { v4 as uuidv4 } from 'uuid';
import { Procedure } from '../domain/procedure';


const createNewProcedure = () => {
    return {
        id: uuidv4(),
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