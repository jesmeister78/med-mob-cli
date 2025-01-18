import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import { Procedure } from '../../domain/procedure';
import { useAppDispatch } from '../../hooks';
import { procedureUpdated } from '../../store/procedureSlice';
import { procedureService } from '../../services/procedureService';

interface DropDownItem {
  label: string;
  value: string;
}

interface ProcedureDropDownProps {
  procedureId: string;
  fieldName: keyof Procedure;
  label: string;
  value: string | undefined;
  list: DropDownItem[];
  multiselect?: boolean;
}

export const ProcedureDetailsDropDown: React.FC<ProcedureDropDownProps> = ({
  procedureId,
  fieldName,
  label,
  value,
  list,
  multiselect = false
}) => {
  const dispatch = useAppDispatch();
  const [showDropDown, setShowDropDown] = useState(false);

  const handleValueChange = (newValue: string) => {
    dispatch(
      procedureUpdated({
        id: procedureId,
        changes: {
          [fieldName]: newValue
        }
      })
    );

    procedureService.updateProcedureAsync({
      id: procedureId,
      changes: {
        [fieldName]: newValue
      }
    });
  };

  return (
    <DropDown
      label={label}
      mode="outlined"
      visible={showDropDown}
      showDropDown={() => setShowDropDown(true)}
      onDismiss={() => setShowDropDown(false)}
      value={value}
      setValue={handleValueChange}
      list={list}
      multiSelect={multiselect}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    marginBottom: 8,
    width: '100%'
  }
});

export default ProcedureDetailsDropDown;