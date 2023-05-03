import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const DisplayFormData = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3300/api/forms')
      .then((res) => {
        setFormData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Age/Sex',
      selector: (row) => row.ageSex,
      sortable: true,
    },
    {
      name: 'Mobile',
      selector: (row) => row.mobile,
      sortable: true,
      cell: (row) => (row.mobile ? row.mobile : 'N/A'),
    },
    {
      name: 'Address',
      selector: (row) => row.address,
      sortable: true,
      cell: (row) => (row.address ? row.address : 'N/A'),
    },
    {
      name: 'Govt ID',
      selector: (row) => row.govtId,
      sortable: true,
      cell: (row) => (row.govtId ? row.govtId : 'N/A'),
    },
    {
      name: 'Guardian Details',
      selector: (row) => row.guardianDetails,
      sortable: true,
      cell: (row) => (row.guardianDetails ? row.guardianDetails : 'N/A'),
    },
    {
      name: 'Nationality',
      selector: (row) => row.nationality,
      sortable: true,
      cell: (row) => (row.nationality ? row.nationality : 'N/A'),
    },
  ];

  return (
    <div className="container">
      <h1>Form Data</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-right py-2 px-4 rounded"
        onClick={() => {
          window.location.href = '/';
        }}
      >
        Home
      </button>

      <DataTable data={formData} columns={columns} />
    </div>
  );
};

export default DisplayFormData;
