// PDFButton.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Share from 'react-native-share';
import { generatePDF } from '../../services/pdfService';
import { Procedure } from '../../domain/procedure';


interface PDFButtonProps {
  procedure: Procedure;
  onSuccess?: (filePath: string) => void;
  onError?: (error: Error) => void;
}

const PDFButton: React.FC<PDFButtonProps> = ({ 
  procedure, 
  onSuccess, 
  onError 
}) => {
  const handleGeneratePDF = async () => {
    try {
      const filePath = await generatePDF(procedure);
      
      if (onSuccess) {
        onSuccess(filePath);
      }

      // Share the generated PDF
      await Share.open({
        url: `file://${filePath}`,
        type: 'application/pdf',
        title: `Procedure Report ${procedure.caseNumber}`,
      });
    } catch (error) {
      if (onError) {
        onError(error instanceof Error ? error : new Error('Unknown error occurred'));
      }
    }
  };

  return (
    <Button 
      mode="contained" 
      onPress={handleGeneratePDF}
      style={styles.button}
    >
      Generate PDF Report
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
  },
});

export default PDFButton;