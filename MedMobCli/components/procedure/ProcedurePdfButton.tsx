// PDFButton.tsx
import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, IconButton, MD3Colors} from 'react-native-paper';
import Share from 'react-native-share';
import {generatePDF} from '../../services/pdfService';
import {Procedure} from '../../domain/procedure';
import { useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { selectProcedureById } from '../../store/procedureSlice';

interface PDFButtonProps {
  procedureId: string;
  onSuccess?: (filePath: string) => void;
  onError?: (error: Error) => void;
}

const ProcedurePdfButton: React.FC<PDFButtonProps> = ({
  procedureId,
  onSuccess,
  onError,
}) => {
  const procedure = useAppSelector((state: RootState) =>
    selectProcedureById(state, procedureId),
  );

  const handleGeneratePDF = async () => {
    try {
      const filePath = procedure && await generatePDF(procedure);

      if (onSuccess) {
        onSuccess(filePath!);
      }

      // Share the generated PDF
      await Share.open({
        url: `file://${filePath}`,
        type: 'application/pdf',
        title: `Procedure Report ${procedure?.caseNumber ?? ''}`,
      });
    } catch (error) {
      if (onError) {
        onError(
          error instanceof Error ? error : new Error('Unknown error occurred'),
        );
      }
    }
  };

  return (
      <IconButton
        icon={'notebook'}
        mode="contained"
        iconColor={MD3Colors.tertiary70}
        onPress={handleGeneratePDF}
      />
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
  },
});

export default ProcedurePdfButton;
