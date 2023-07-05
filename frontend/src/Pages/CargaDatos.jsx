import React, { useState } from "react";
import Papa from 'papaparse';

function CsvUpload() {
  const [csvFile, setCsvFile] = useState();

  const processCSV = (array) => {
    const headers = array[0];
    const rows = array.slice(1);

    const jsonArray = [];
    for(const row of rows) {
      if(row) {
        let jsonValue = {};
        for(const [i, header] of headers.entries()) {
          jsonValue[header] = row[i];
        }
        jsonArray.push(jsonValue);
      }
    }

    return jsonArray;
  }

  const handleFileRead = (data) => {
    const result = processCSV(data);
    console.log(result);
  }

  const handleFileUpload = () => {
    Papa.parse(csvFile, {
      download: true,
      complete: (results) => {
        handleFileRead(results.data);
      }
    });
  }

  const handleDownload = () => {
    const downloadUrl = `${process.env.PUBLIC_URL}/resources/plantilla.csv`;
  
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'plantilla.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div>
      <h3>Upload your CSV file:</h3>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          setCsvFile(e.target.files[0]);
        }}
      />
      <br/>
      <button onClick={handleFileUpload}>Upload</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}

export default CsvUpload;