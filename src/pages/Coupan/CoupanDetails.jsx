import React, { useEffect } from 'react';
import { useState } from 'react';
import useMain from '../../hooks/useMain';
import Spinner from '../../Util/Spinner';
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css";
import { MultiSelect } from "react-multi-select-component"
import { useNavigate, useParams } from 'react-router-dom';

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
// const quillModules = {
//   toolbar: {
//     container: [
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       ['bold', 'italic', 'underline', 'strike'],
//       [{ color: [] }, { background: [] }],
//       [{ align: [] }],
//       ['link', 'image', 'video'],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       ['blockquote', 'code-block'],
//       ['table'], // Added table option
//       ['clean']
//     ],
//   },
// };

// // Quill formats
// const quillFormats = [
//   'header',
//   'bold', 'italic', 'underline', 'strike',
//   'color', 'background',
//   'align',
//   'link', 'image', 'video',
//   'list', 'bullet',
//   'blockquote', 'code-block',
//   'table', // Added table format
// ];

var toolbarOptions = {
  container: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    ['link', 'image'],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'align': [] }],
    ['clean']
  ]
};

const CoupanDetail = (props) => {
  const { updateCoupan, getStores, getCategorys, getCoupans } = useMain();
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
    priority: '',
    subText: '',
    sideLine: '',
  });
  const [loadFlag, setLoadFlag] = useState(true);
  const [desc, setDesc] = useState("");

  const { id } = useParams();
  const navigate=useNavigate();

  // useEffect(() => {
  //   if (props.data1 && Object.keys(props.data1).length > 0) {
  //     // setValue({ ...props.data1, category: props.data1.category._id, store: props.data1.store._id });
  //     if (value?.title === "") {
  //       setValue({
  //         title: props.data1.title,
  //         coupanCode: props.data1.coupanCode,
  //         link: props.data1.link,
  //         expiryDate: props.data1.expiryDate,
  //         is_coupan: props.data1.is_coupan,
  //         is_popular: props.data1.is_popular,
  //         is_exclusive: props.data1.is_exclusive,
  //         priority: props.data1.priority,
  //         category: props.data1.category._id,
  //         store: props.data1.store._id
  //       });

  //       setDesc(props.data1.desc);
  //     }
  //   }
  // }, [props.data1]);

  useEffect(() => {
    getCoupan();
  }, [id]);

  const getCoupan = async () => {
    setLoadFlag(true);
    const ans = await getCoupans(id);
    console.log(ans.data[0]);
    if (value?.title === "") {
      setValue({
        title: ans.data[0].title,
        coupanCode: ans.data[0].coupanCode,
        link: ans.data[0].link,
        expiryDate: ans.data[0].expiryDate,
        is_coupan: ans.data[0].is_coupan,
        is_popular: ans.data[0].is_popular,
        is_exclusive: ans.data[0].is_exclusive,
        priority: ans.data[0].priority,
        category: ans.data[0].category.map(x=>{return {label: x.title, value: x._id}}),
        store: ans.data[0].store._id,
        subText: ans.data[0].subText,
        sideLine: ans.data[0].sideLine,
      });

      setDesc(ans.data[0].desc);
    }

    const ans2 = await getStores();
    // console.log(ans);
    setstores(ans2.data);
    const ans1 = await getCategorys();
    // console.log(ans);
    setCategory(ans1.data);
    setLoadFlag(false);
  };

  // const getData = async () => {
  //   const ans = await getStores();
  //   // console.log(ans);
  //   setstores(ans.data);
  //   const ans1 = await getCategorys();
  //   // console.log(ans);
  //   setCategory(ans1.data);
  // };

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
    setDesc(editor.getHTML());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ ...value, desc });
    const ans = await updateCoupan({ ...value, desc });
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
        priority: '',
        subText: '',
        sideLine: '',
      });
      setDesc("");

      props.notify('success', ans.message);
      navigate('/coupan');
      // props.setRefreshFlag(!props.refreshFlag);
      // document.getElementById('editCoupanModal').classList.toggle('hidden');
    }
    else {
      props.notify('error', ans.message);
    }
  };

  return (
    <>
      {loadFlag ? 'Loading ..' : <div className="p-6 space-y-6">
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
                <input type="text" id="coupanCode" name="coupanCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter Code .." onChange={handleChange} value={value.coupanCode} />
              </div>
              <div>
                <label htmlFor="subText" className="block mb-2 text-sm font-medium text-gray-900 ">Sub Text</label>
                <input type="text" id="subText" name="subText" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter sub Text .." onChange={handleChange} value={value.subText} required />
              </div>
              <div>
                <label htmlFor="sideLine" className="block mb-2 text-sm font-medium text-gray-900 ">Side Line</label>
                <input type="text" id="sideLine" name="sideLine" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter sideLine .." onChange={handleChange} value={value.sideLine} required />
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
              <ReactQuill modules={{ toolbar: toolbarOptions }} value={desc} theme="snow" onChange={qte} ></ReactQuill>
            </div>
            <div className='text-right'>
              <button type="submit" className="text-white btn-hover bg-blue-600 focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center "><span>Submit</span></button>
            </div>
          </div>
        </form>
      </div>}
    </>
  );
};

export default CoupanDetail;
