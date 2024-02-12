import React, { useEffect } from 'react';
import { useState } from 'react';
import useMain from '../../hooks/useMain';
import Spinner from '../../Util/Spinner';
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css";
import { MultiSelect } from "react-multi-select-component"

// const makeid = (length) => {
//   let result = '';
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const charactersLength = characters.length;
//   let counter = 0;
//   while (counter < length) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     counter += 1;
//   }
//   return result;
// };

// Quill options with added table module
const quillModules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['table'], // Added table option
      ['clean']
    ],
  },
};

// Quill formats
const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'align',
  'link', 'image', 'video',
  'list', 'bullet',
  'blockquote', 'code-block',
  'table', // Added table format
];

const EditCoupanModal = (props) => {
  const { updateCoupan, getStores, getCategorys } = useMain();
  const [stores, setstores] = useState([]);
  const [category, setCategory] = useState([]);
  const [value, setValue] = useState({
    store: '',
    category: [],
    title: '',
    coupanCode: '',
    link: '',
    expiryDate: '',
    desc: '',
    is_coupan: '',
    is_popular: '',
    is_exclusive: '',
    priority: ''
  });
  const [loadFlag, setLoadFlag] = useState(true);

  useEffect(() => {
    if (props.data1 && Object.keys(props.data1).length > 0) {
      setValue({ ...props.data1, category: props.data1.category._id, store: props.data1.store._id });
    }
  }, [props.data1]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const ans = await getStores();
    // console.log(ans);
    setstores(ans.data);
    const ans1 = await getCategorys();
    // console.log(ans);
    setCategory(ans1.data);
  };

  const handleChange = (e) => {
    if (e.target.name === 'category') {
      // Handle MultiSelect for category
      setValue({ ...value, [e.target.name]: e.target.value.map(option => option.value) });
    }
    else {
      setValue({ ...value, [e.target.name]: e.target.value });
    }
  };

  const qte = (content, delta, source, editor) => {
    // setStoreOverview(editor.getHTML());
    setValue({...value, desc: editor.getHTML()});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

console.log(value);
    const ans = await updateCoupan(value);
    console.log(ans);
    if (ans.status) {
      setValue({
        store: '',
        category: [],
        title: '',
        coupanCode: '',
        link: '',
        expiryDate: '',
        desc: '',
        is_coupan: '',
        is_popular: '',
        is_exclusive: '',
        priority: ''
      });

      props.notify('success', ans.message);
      props.setRefreshFlag(!props.refreshFlag);
      document.getElementById('editCoupanModal').classList.toggle('hidden');
    }
    else {
      props.notify('error', ans.message);
    }
  };


  return (
    <>
      <div id="editCoupanModal" tabIndex="-1" className="fixed cus-modal top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="cus-modal1 relative w-full h-full max-w-7xl md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-5 border-b rounded-t ">
              <h3 className="text-xl font-medium text-gray-900 ">
                Update coupon
              </h3>
              <button type="button" onClick={() => {
                document.getElementById('editCoupanModal').classList.toggle('hidden');
              }} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center ">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <form onSubmit={handleSubmit}>
                <div className="bus-form">
                  <h4 className="text-xl text-center mb-4 font-bold">Enter Coupon details</h4>
                  <div id="loadFlagModal" className='hidden flex justify-center'>
                    <Spinner />
                  </div>
                  <div className="grid gap-6 px-0.5 py-0.5 mb-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">title</label>
                      <input type="text" id="title" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter title .." onChange={handleChange} value={value.title} required />
                    </div>
                    <div>
                      <label htmlFor="priority" className="block mb-2 text-sm font-medium text-gray-900 ">priority</label>
                      <input type="number" id="priority" name="priority" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter priority .." onChange={handleChange} value={value.priority} required />
                    </div>
                    <div>
                      <label htmlFor="coupanCode" className="block mb-2 text-sm font-medium text-gray-900 ">Coupon Code</label>
                      <input type="text" id="coupanCode" name="coupanCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter Code .." onChange={handleChange} value={value.coupanCode}  />
                    </div>
                    <div>
                      <label htmlFor="link" className="block mb-2 text-sm font-medium text-gray-900 ">Link</label>
                      <input type="text" id="link" name="link" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter link .." onChange={handleChange} value={value.link} required />
                    </div>
                    <div>
                      <label htmlFor="expiryDate" className="block mb-2 text-sm font-medium text-gray-900 ">Expiry Date</label>
                      <input type="date" id="expiryDate" name="expiryDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter Expiry Date .." onChange={handleChange} value={value.expiryDate} required />
                    </div>
                    <div>
                      <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an category</label>
                      <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <MultiSelect value={value.category ? value.category : []} options={
                          category.map((e, index) => { return { label: e.name, value: e._id } })
                        } onChange={(data) => { setValue({ ...value, ['category']: data }) }} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="store" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a store</label>
                      <select id="store" name="store" value={value.store} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose a store</option>
                        {stores.map((e, index) => {
                          return <option key={index} value={e._id}>{e.title}</option>
                        })}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="is_coupan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">is coupon?</label>
                      <select id="is_coupan" name="is_coupan" value={value.is_coupan} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose </option>
                        <option value="true">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="is_exclusive" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">is exclusive?</label>
                      <select id="is_exclusive" name="is_exclusive" value={value.is_exclusive} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose </option>
                        <option value="true">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="is_popular" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">is popular?</label>
                      <select id="is_popular" name="is_popular" value={value.is_popular} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose </option>
                        <option value="true">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Visible On Website</label>
                      <select id="status" name="status" value={value.status} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected value="true">Availiable</option>
                        <option value="false">Unavailiable</option>
                      </select>
                    </div>

                  </div>
                  <div>
                    <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                    {/* <textarea id="desc" rows="4" name='desc' onChange={handleChange} value={value.desc} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write here..."></textarea> */}
                    <ReactQuill modules={quillModules}
                      formats={quillFormats} value={value.desc} theme="snow" onChange={qte} ></ReactQuill>
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

export default EditCoupanModal;
