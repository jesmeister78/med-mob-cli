// PDFButton.tsx
import React from 'react';
import {StyleSheet} from 'react-native';
import {IconButton, MD3Colors} from 'react-native-paper';
import Share from 'react-native-share';
import { useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { selectProcedureById } from '../../store/procedureSlice';
import { pdfService } from '../../services/pdfService';
import { selectImagesByProcedureId } from '../../store/imageSlice';

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

  const images = useAppSelector(
    (state: RootState) => selectImagesByProcedureId(state, procedureId),
  );

  const handleGeneratePDF = async () => {
    try {
     
      // Generate the PDF using the pdfService
      const filePath = procedure && await pdfService.generatePDF(procedure, images);

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
