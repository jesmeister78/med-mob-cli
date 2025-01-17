export const procedurePdfStyles = `
          body {
            font-family: 'Helvetica';
            padding: 20px;
            color: #333;
          }
          .header {
            font-size: 24px;
            text-align: center;
            margin-bottom: 30px;
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
          }
          .section {
            margin-bottom: 25px;
          }
          .section-title {
            font-size: 18px;
            color: #2980b9;
            margin-bottom: 15px;
            border-bottom: 1px solid #bdc3c7;
            padding-bottom: 5px;
          }
          .row {
            display: flex;
            margin-bottom: 10px;
            padding: 5px 0;
          }
          .label {
            width: 30%;
            font-weight: bold;
            color: #555;
          }
          .value {
            width: 70%;
          }
          .images-section {
            margin-top: 20px;
          }
          .image {
            max-width: 200px;
            margin: 10px;
          }
          @media print {
            body {
              font-size: 12px;
            }
            .header {
              font-size: 20px;
            }
            .section-title {
              font-size: 16px;
            }
          }`;