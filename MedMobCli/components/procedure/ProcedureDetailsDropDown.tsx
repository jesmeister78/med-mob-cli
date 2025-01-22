import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, ScrollView, Pressable } from 'react-native';
import { Portal, Modal, TextInput, Checkbox, Text, Button, Surface, RadioButton } from 'react-native-paper';
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
  multiselect = false,
}) => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(
    multiselect ? value?.split(',').filter(Boolean) || [] : value ? [value] : []
  );

  useEffect(() => {
    const newValues = multiselect 
      ? value?.split(',').filter(Boolean) || []
      : value ? [value] : [];
    if (JSON.stringify(newValues) !== JSON.stringify(selectedValues)) {
      setSelectedValues(newValues);
    }
  }, [value, multiselect]);

  const handleValueChange = (newValue: string | undefined) => {
    if (newValue === value || newValue === undefined) return;

    dispatch(
      procedureUpdated({
        id: procedureId,
        changes: {
          [fieldName]: newValue,
        },
      }),
    );

    procedureService.updateProcedureAsync({
      id: procedureId,
      changes: {
        [fieldName]: newValue,
      },
    });
  };

  const toggleSelection = (itemValue: string) => {
    let newValues: string[];
    
    if (multiselect) {
      newValues = selectedValues.includes(itemValue)
        ? selectedValues.filter(v => v !== itemValue)
        : [...selectedValues, itemValue];
      handleValueChange(newValues.join(','));
    } else {
      newValues = [itemValue];
      handleValueChange(itemValue);
      setVisible(false);
    }
    
    setSelectedValues(newValues);
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return '';
    const selectedLabels = selectedValues
      .map(val => list.find(item => item.value === val)?.label || '')
      .filter(Boolean);
    return selectedLabels.join(', ');
  };

  return (
    <View>
      <Pressable onPress={() => setVisible(true)}>
        <View pointerEvents="none">
          <TextInput
            mode="outlined"
            label={label}
            placeholder={label}
            value={getDisplayText()}
            editable={false}
            right={<TextInput.Icon icon={visible ? 'chevron-up' : 'chevron-down'} />}
          />
        </View>
      </Pressable>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Surface style={styles.modalSurface}>
            <View style={styles.modalContent}>
              <Text variant="titleLarge" style={styles.modalTitle}>{label}</Text>
              
              <ScrollView style={styles.optionsContainer}>
                <View>
                  {list.map((item) => {
                    const isSelected = selectedValues.includes(item.value);
                    return (
                      <Pressable
                        key={item.value}
                        onPress={() => toggleSelection(item.value)}
                        style={[
                          styles.optionItem,
                          isSelected && styles.selectedOptionItem
                        ]}
                      >
                        <View style={styles.optionContent}>
                          {multiselect ? (
                            <Checkbox
                              status={isSelected ? 'checked' : 'unchecked'}
                              onPress={() => toggleSelection(item.value)}
                            />
                          ) : (
                            <RadioButton
                              value={item.value}
                              status={isSelected ? 'checked' : 'unchecked'}
                              onPress={() => toggleSelection(item.value)}
                            />
                          )}
                          <Text style={styles.optionLabel}>{item.label}</Text>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              </ScrollView>

              {(multiselect || Platform.OS === 'ios') && (
                <View style={styles.modalFooter}>
                  <Button
                    mode="text"
                    onPress={() => setVisible(false)}
                    textColor="#007AFF"
                  >
                    {multiselect ? 'Done' : 'Cancel'}
                  </Button>
                </View>
              )}
            </View>
          </Surface>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 16,
  },
  modalSurface: {
    borderRadius: 14,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalContent: {
    borderRadius: 14,
    backgroundColor: 'white',
  },
  modalTitle: {
    textAlign: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f8f8f8',
  },
  optionsContainer: {
    maxHeight: 300,
  },
  optionItem: {
    paddingHorizontal: 16,
  },
  selectedOptionItem: {
    backgroundColor: Platform.select({
      ios: '#f0f0f0',
      android: 'rgba(98, 0, 238, 0.08)',
    }),
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    minHeight: 44,
  },
  optionLabel: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
  },
  modalFooter: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    padding: 8,
    alignItems: 'center',
  },
});

export default ProcedureDetailsDropDown;