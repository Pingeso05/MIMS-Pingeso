import React, { useState } from "react";
import Papa from 'papaparse';
import axios from 'axios';

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
    </div>
  );
}

export default CsvUpload;
