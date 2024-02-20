import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import DataTable from 'react-data-table-component';
import { useState } from 'react';
import { useEffect } from 'react';
import AddBlogModal from '../Modals/AddSubscriptionModal';
import EditBlogModal from '../Modals/EditBlogModal';
import DeleteModal from '../../Util/DeleteModal';
import useMain from '../../hooks/useMain';

const Email = ({ notify }) => {
  const { getEmails, deleteEmails } = useMain();

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [id, setId] = useState(0);
  const [msg, setMsg] = useState('');
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getData();
  }, [refreshFlag]);

  const columns = [
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true
    }
  ];

  const getData = async () => {
    let ans = await getEmails(query);
    console.log(ans.data);
    setData(ans.data);
    setData2(ans.data);
  };

  const handleDelete = async () => {
    // console.log(id);
    const ans = await deleteEmails(id);
    console.log(ans);

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
      {/* <AddBlogModal setRefreshFlag={setRefreshFlag} refreshFlag={refreshFlag} notify={notify} />
      <EditBlogModal data={data1} setRefreshFlag={setRefreshFlag} refreshFlag={refreshFlag} notify={notify} />
      <DeleteModal msg={msg} handleDelete={handleDelete} /> */}

      <DefaultLayout>
        {/* <div className='text-right mb-3'>
          <button type="button" onClick={()=>{
             document.getElementById('addBlogModal').classList.toggle('hidden');
          }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Email +</button>
        </div> */}


        <div className="search">
          <form className="mb-4 search1" onSubmit={(e) => {
            e.preventDefault();
            // setRefreshFlag(!refreshFlag);
            // console.log(query);
            setData(()=>{
              if(query!=='')
              {
                return data2.filter(x=>(x.description.toLowerCase().includes(query.toLowerCase())) || (x.endDate.toLowerCase().includes(query.toLowerCase())) || (x.location.toLowerCase().includes(query.toLowerCase())) || (x.startDate.toLowerCase().includes(query.toLowerCase())));
              }
              else
              {
                return data2;
              }
            });
          }}>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search .." name="query" onChange={(e) => {
                setQuery(e.target.value);
              }} value={query} />
              <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
          </form>
        </div>

        <DataTable
          columns={columns}
          data={data}
          striped={true}
          title="Emails"
          pagination
        />
      </DefaultLayout>
    </>
  );
};

export default Email;
