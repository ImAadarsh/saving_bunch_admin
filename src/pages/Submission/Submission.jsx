import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import DataTable from 'react-data-table-component';
import { useState } from 'react';
import { useEffect } from 'react';
import DeleteModal from '../../Util/DeleteModal';
import useMain from '../../hooks/useMain';

const Submission = ({ notify }) => {
  const { getAllBrands } = useMain();

  const [data, setData] = useState([]);
  const [data1, setData1] = useState({});
  const [id, setId] = useState(0);
  const [msg, setMsg] = useState(0);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getData();
  }, [refreshFlag]);

  const columns = [
    {
      name: 'Brand Name',
      selector: row => row.brandName,
      sortable: true
    },
    {
      name: 'Store Website',
      selector: row => row.storeWebsite,
      sortable: true
    },
    {
      name: 'Full Name',
      selector: row => row.fullName,
      sortable: true
    },
    {
      name: 'Office Number',
      selector: row => row.officeNumber,
      sortable: true
    },
    {
      name: 'Mobile Number',
      selector: row => row.mobileNumber,
      sortable: true
    },
    {
      name: 'Email Address',
      selector: row => row.emailAddress,
      sortable: true
    },
    {
      name: 'Comments',
      selector: row => row.comments,
      sortable: true
    },

    // {
    //   name: "Actions",
    //   selector: row => <div className="flex justify-center">
    //     <div onClick={() => {
    //       setData1(row);
    //       document.getElementById('editCoupanModal').classList.toggle('hidden');
    //     }} className='mr-2 cursor-pointer'>
    //       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="update-icon bi bi-pencil-square" viewBox="0 0 16 16">
    //         <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
    //         <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
    //       </svg>
    //     </div>
    //     <div onClick={() => {
    //       setId(row._id);
    //       setMsg("Are you sure you want to delete selected coupan?");
    //       document.getElementById('deleteModal').classList.toggle('hidden');
    //     }} className='me-2 cursor-pointer'>
    //       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="delete-icon bi bi-x-square" viewBox="0 0 16 16">
    //         <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
    //         <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
    //       </svg>
    //     </div>
    //   </div>,
    //   grow: 0.5
    // }
  ];

  const getData = async () => {
    const ans = await getAllBrands();
    console.log(ans);
    setData(ans.data);
  };

  const handleDelete = async () => {
    // console.log(id);
    const ans = await deleteCoupan(id);

    // if (ans.status) {
      notify('success', ans.message);
      setRefreshFlag(!refreshFlag);
      document.getElementById('deleteModal').classList.toggle('hidden');
    // }
    // else {
    //   notify('error', ans.message);
    // }
  };

  return (
    <>
      <DefaultLayout>
        {/* <div className='text-right mb-3'>
          <button type="button" onClick={()=>{
             document.getElementById('addCoupanModal').classList.toggle('hidden');
          }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Coupans +</button>
        </div> */}
        
        <DataTable
          columns={columns}
          data={data}
          striped={true}
          title="Submissions"
          pagination
        />
      </DefaultLayout>
    </>
  );
};

export default Submission;
