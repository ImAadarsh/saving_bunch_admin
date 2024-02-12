import React from 'react';
import { useState, useEffect } from 'react';
import useMain from '../../hooks/useMain';
import Spinner from '../../Util/Spinner';
import ReactQuill from 'react-quill';
import { MultiSelect } from "react-multi-select-component"
import 'react-quill/dist/quill.snow.css'
import 'quill/dist/quill.core.css'; // Import the Quill core styles
import { useNavigate, useParams } from 'react-router-dom';

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

const StoreDetails = (props) => {
  const { updateStore, getStores, getCategorys } = useMain();
  const [stores, setstores] = useState([]);
  const [category, setCategory] = useState([]);
  const [value, setValue] = useState({
    title: '',
    seoTitle: '',
    pageTitle: '',
    invalidLink: '',
    subHeading: '',
    desc: '',
    file: '',
    isFeatured: '',
    priority: '',
    storeOverview: '',
    status: '',
    similarStore: [],
    category: []
  });
  const [storeOverview, setStoreOverview] = useState('');
  const [loadFlag, setLoadFlag] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getStore();
  }, [id]);

  // useEffect(() => {
  //   getData();
  // }, []);

  const getStore = async () => {
    setLoadFlag(true);
    const ans = await getStores(id);
    console.log(ans.data[0]);
    if (value?.title === "") {
      setValue({
        title: ans.data[0]?.title,
        seoTitle: ans.data[0]?.seoTitle,
        pageTitle: ans.data[0]?.pageTitle,
        invalidLink: ans.data[0]?.invalidLink,
        subHeading: ans.data[0]?.subHeading,
        desc: ans.data[0]?.desc,
        file: ans.data[0]?.file,
        isFeatured: ans.data[0]?.isFeatured,
        priority: ans.data[0]?.priority,
        _id: ans.data[0]?._id,
        // storeOverview: ans.data[0]?.storeOverview,
        status: '',
        similarStore: ans.data[0].similarStores.map(x=>{return {label: x.title, value: x._id}}),
        category: ans.data[0].category.map(x=>{return {label: x.title, value: x._id}})
      });

      setStoreOverview(ans.data[0].storeOverview);
    }

    const ans2 = await getStores();
    console.log(ans2);
    setstores(ans2.data);
    const ans1 = await getCategorys();
    console.log(ans1);
    setCategory(ans1.data);
    setLoadFlag(false);
  };

  // const getData = async () => {

  // };

  const qtc = (content, delta, source, editor) => {
    setStoreOverview(editor.getHTML());
    setValue({ ...value, storeOverview: editor.getHTML() });
  };

  const handleChange = (e) => {
    console.log(e.target);
    if (e.target.name === 'file') {
      setValue({ ...value, [e.target.name]: e.target.files[0] });
    } else if (e.target.name === 'category') {
      // Handle MultiSelect for category
      setValue({ ...value, [e.target.name]: e.target.value.map(option => option.value) });
    } else if (e.target.name === 'similarStore') {
      // Handle MultiSelect for similarStore
      setValue({ ...value, [e.target.name]: e.target.value.map(option => option.value) });
    } else {
      setValue({ ...value, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(value);

    const ans = await updateStore(value);
    console.log(ans);

    if (ans.message) {
      setValue({
        title: '',
        seoTitle: '',
        pageTitle: '',
        invalidLink: '',
        subHeading: '',
        desc: '',
        file: '',
        isFeatured: '',
        priority: '',
        storeOverview: '',
        status: '',
        similarStore: [],
        category: []
      });

      props.notify('success', ans.message);
      // props.setRefreshFlag(!props.refreshFlag);
      // document.getElementById('editStoreModal').classList.toggle('hidden');
      navigate('/store');
    }
    else {
      props.notify('error', ans.message);
    }
  };

  return (
    <>
      <div className="p-6 space-y-6">
        <form onSubmit={handleSubmit}>
          {!loadFlag ? <div className="bus-form">
            <h4 className="text-xl text-center mb-4 font-bold">Enter Store details</h4>
            <div id="loadFlagModal" className='hidden flex justify-center'>
              <Spinner />
            </div>

            <div className="grid gap-6 px-0.5 py-0.5 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">title</label>
                <input type="text" id="title" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter title .." onChange={handleChange} value={value.title} required />
              </div>

              <div>
                <label htmlFor="seoTitle" className="block mb-2 text-sm font-medium text-gray-900 ">Seo Title</label>
                <input type="text" id="seoTitle" name="seoTitle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter seoTitle .." onChange={handleChange} value={value.seoTitle} required />
              </div>
              <div>
                <label htmlFor="pageTitle" className="block mb-2 text-sm font-medium text-gray-900 ">Page Title</label>
                <input type="text" id="pageTitle" name="pageTitle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter pageTitle .." onChange={handleChange} value={value.pageTitle} required />
              </div>

              <div>
                <label htmlFor="invalidLink" className="block mb-2 text-sm font-medium text-gray-900 ">Invaild Link</label>
                <input type="text" id="invalidLink" name="invalidLink" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter invalidLink .." onChange={handleChange} value={value.invalidLink} required />
              </div>

              <div>
                <label htmlFor="subHeading" className="block mb-2 text-sm font-medium text-gray-900 ">sub Heading</label>
                <input type="text" id="subHeading" name="subHeading" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter subHeading .." onChange={handleChange} value={value.subHeading} required />
              </div>
              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Categories</label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <MultiSelect value={value.category} options={
                    category.map((e, index) => { return { label: e.title, value: e._id } })
                  } onChange={(data) => { setValue({ ...value, ['category']: data }) }} />
                </div>
              </div>

              <div>
                <label htmlFor="store" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Stores</label>
                <div className='className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"'>
                  <MultiSelect value={value.similarStore} options={
                    stores.map((e, index) => { return { label: e.title, value: e._id } })
                  } onChange={(data) => {
                    setValue({ ...value, ['similarStore']: data }); console.log(data);
                  }} />
                </div>
              </div>

              <div>
                <label htmlFor="priority" className="block mb-2 text-sm font-medium text-gray-900 ">priority</label>
                <input type="number" id="priority" name="priority" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter priority .." onChange={handleChange} value={value.priority} required />
              </div>
              <div>
                <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                <textarea id="desc" rows="4" name='desc' onChange={handleChange} value={value.desc} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write here..."></textarea>
              </div>
              <div>
                <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 ">file</label>
                <input type="file" id="file" name="file" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter file .." onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="isFeatured" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Make featured?</label>
                <select id="isFeatured" name="isFeatured" value={value.isFeatured} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Choose </option>
                  <option value="true">Featured</option>
                  <option value="false">Unfeatured</option>
                </select>
              </div>
              <div>
                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Visible On Website</label>
                <select id="status" name="status" value={value.status} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected value="true">Visible</option>
                  <option value="false">Not Visible</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 ">Store Overview</label>
              {/* <textarea id="desc" rows="4" name='desc' onChange={handleChange} value={value.desc} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write here..."></textarea> */}
              <ReactQuill name="storeOverview" value={storeOverview} theme="snow" onChange={qtc} modules={{ toolbar: toolbarOptions }} />
            </div>

            <div className='text-right'>
              <button type="submit" className="text-white btn-hover bg-blue-600 focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center "><span>Submit</span></button>
            </div>
          </div> : 'Loading ..'}
        </form>
      </div>
    </>
  );
};

export default StoreDetails;

{/* <ReactQuill value={storeOverview} theme="snow" onChange={(text) => {
                setValue({ ...value, storeOverview: text });
              }} modules={{ toolbar: toolbarOptions }} /> */}