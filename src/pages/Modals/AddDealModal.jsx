import React, { useEffect } from 'react';
import { useState } from 'react';
import useMain from '../../hooks/useMain';
import Spinner from '../../Util/Spinner';

const AddDealModal = (props) => {
  const { postDeal, getStores } = useMain();

  const [value, setValue] = useState({
    text: '',
    subText: '',
    storeId: '',
    file: '',
    isExclusive: '',
    buttonLink: ''
  });
  const [stores, setStores] = useState([]);

  useEffect(()=>{
    getStores1();
  },[]);

  const getStores1=async()=>{
    const data=await getStores();
    setStores(data.data);
  };

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setValue({ ...value, [e.target.name]: e.target.files[0] });
    }
    else {
      setValue({ ...value, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(value);

    const ans = await postDeal(value);
    console.log(ans);
    if (ans.status) {
      setValue({
        text: '',
        subText: '',
        storeId: '',
        file: '',
        isExclusive: '',
        buttonLink: ''
      });

      props.notify('success', ans.message);
      props.setRefreshFlag(!props.refreshFlag);
      document.getElementById('addDealModal').classList.toggle('hidden');
    }
    else {
      props.notify('error', ans.message);
    }
  };

  return (
    <>
      <div id="addDealModal" tabIndex="-1" className="fixed cus-modal top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="cus-modal1 relative w-full h-full max-w-7xl md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-5 border-b rounded-t ">
              <h3 className="text-xl font-medium text-gray-900 ">
                Add new deal
              </h3>
              <button type="button" onClick={() => {
                document.getElementById('addDealModal').classList.toggle('hidden');
              }} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center ">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <form onSubmit={handleSubmit}>
                <div className="bus-form">
                  <h4 className="text-xl text-center mb-4 font-bold">Enter Deal details</h4>
                  <div id="loadFlagModal" className='hidden flex justify-center'>
                    <Spinner />
                  </div>

                  <div className="grid gap-6 px-0.5 py-0.5 mb-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 ">Text</label>
                      <input type="text" id="text" name="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter text .." onChange={handleChange} value={value.text} required />
                    </div>
                    <div>
                      <label htmlFor="subText" className="block mb-2 text-sm font-medium text-gray-900 ">Sub Text</label>
                      <input type="text" id="subText" name="subText" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter subText .." onChange={handleChange} value={value.subText} required />
                    </div>
                    <div>
                      <label htmlFor="buttonLink" className="block mb-2 text-sm font-medium text-gray-900 ">Button Link</label>
                      <input type="text" id="buttonLink" name="buttonLink" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter Button Link .." onChange={handleChange} value={value.buttonLink} required />
                    </div>
                    <div>
                      <label htmlFor="storeId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an store</label>
                      <select id="storeId" name="storeId" value={value.storeId} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose a store</option>
                        {stores.map((e,index)=>{
                          return <option key={index} value={e._id}>{e.title}</option>
                        })}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 ">File</label>
                      <input type="file" id="file" name="file" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter file .." onChange={handleChange} required />
                    </div>
                    <div>
                      <label htmlFor="isExclusive" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Is Exclusive?</label>
                      <select id="isExclusive" name="isExclusive" value={value.isExclusive} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose </option>
                        <option value="true">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>

                  <div className='text-right'>
                    <button type="submit" className="text-white btn-hover bg-blue-600 focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center "><span>Submit</span></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDealModal;
