import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Inputs} from '../../styles';
import {Procedure} from '../../domain/procedure';
import {useAppDispatch} from '../../hooks';
import {procedureUpdated} from '../../store/procedureSlice';
import {procedureService} from '../../services/procedureService';

interface ProcedureDetailsTextInputProps {
  procedureId: string;
  fieldName: keyof Procedure;
  label: string;
  value: string | number;
}

const ProcedureDetailsTextInput = (props: ProcedureDetailsTextInputProps) => {
  const dispatch = useAppDispatch();

  const handleChange = (text: string) => {
    // Convert to number if the field is caseNumber
    const newValue = props.fieldName === 'caseNumber' ? +text : text;

    dispatch(
      procedureUpdated({
        id: props.procedureId,
        changes: {
          [props.fieldName]: newValue,
        },
      }),
    );

    procedureService.updateProcedureAsync({
      id: props.procedureId,
      changes: {
        [props.fieldName]: newValue,
      },
    });
  };

  return (
    <TextInput
      style={styles.procTextInput}
      label={props.label}
      value={props.value.toString()}
      mode="outlined"
      onChangeText={handleChange}
    />
  );
};

const styles = StyleSheet.create({
  procTextInput: {...Inputs.form.text},
});

export default ProcedureDetailsTextInput;
