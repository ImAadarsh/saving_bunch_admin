import React from 'react';
import { deleteRequest, getRequest, postRequest, putRequest } from '../Api/Api';
import MainContext from './MainContext';

const baseUrl = 'http://localhost:5000';

const MainState = (props) => {
    const getBanners = async (query) => {
        try {
            let data = await getRequest(`${baseUrl}/banner/getBanners`, false, props);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const postBanner = async ({ file, sequence, text, buttonLink, subText, buttonText }) => {
        try {
            let formdata = new FormData();
            formdata.append('file', file);
            formdata.append('sequence', sequence);
            formdata.append('text', text);
            formdata.append('buttonLink', buttonLink);
            formdata.append('subText', subText);
            formdata.append('buttonText', buttonText);

            let data = await postRequest(`${baseUrl}/banner/postBanner`, formdata, false, props, true);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const updateBanner = async ({ _id, file, sequence, text, buttonLink, subText, buttonText }) => {
        try {
            let formdata = new FormData();
            formdata.append('file', file);
            formdata.append('sequence', sequence);
            formdata.append('text', text);
            formdata.append('buttonLink', buttonLink);
            formdata.append('subText', subText);
            formdata.append('buttonText', buttonText);

            let data = await putRequest(`${baseUrl}/banner/updateBanner/${_id}`, formdata, false, props, true);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const deleteBanner = async (id) => {
        try {
            let data = await deleteRequest(`${baseUrl}/banner/deleteBanner/${id}`, {}, false, props);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const getCoupans = async (query) => {
        try {
            let data = await getRequest(`${baseUrl}/coupan/getCoupans`, false, props);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const postCoupan = async ({ store, category, title, coupanCode, link, expiryDate, is_coupan, is_popular, is_exclusive, file, desc, subText, sideLine }) => {
        try {
            let formdata = new FormData();
            formdata.append('store', JSON.stringify(store));
            formdata.append('category', JSON.stringify(category));
            formdata.append('title', title);
            formdata.append('coupanCode', coupanCode);
            formdata.append('link', link);
            formdata.append('expiryDate', expiryDate);
            formdata.append('is_coupan', is_coupan);
            formdata.append('is_popular', is_popular);
            formdata.append('is_exclusive', is_exclusive);
            formdata.append('file', file);
            formdata.append('desc', desc);
            formdata.append('subText', subText);
            formdata.append('sideLine', sideLine);

            let data = await postRequest(`${baseUrl}/coupan/postCoupan`, formdata, false, props, true);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const updateCoupan = async ({ _id, store, category, title, coupanCode, link, expiryDate, is_coupan, is_popular, is_exclusive, file, desc, subText, sideLine }) => {
        try {
            let formdata = new FormData();
            formdata.append('store', JSON.stringify(store));
            formdata.append('category', JSON.stringify(category));
            formdata.append('title', title);
            formdata.append('coupanCode', coupanCode);
            formdata.append('link', link);
            formdata.append('expiryDate', expiryDate);
            formdata.append('is_coupan', is_coupan);
            formdata.append('is_popular', is_popular);
            formdata.append('is_exclusive', is_exclusive);
            formdata.append('file', file);
            formdata.append('desc', desc);
            formdata.append('subText', subText);
            formdata.append('sideLine', sideLine);

            let data = await putRequest(`${baseUrl}/coupan/updateCoupan/${_id}`, formdata, false, props, true);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const deleteCoupan = async (id) => {
        try {
            let data = await deleteRequest(`${baseUrl}/coupan/deleteCoupan/${id}`, {}, false, props);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const getEmails = async (query) => {
        try {
            let data = await getRequest(`${baseUrl}/email/getEmails`, false, props);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const postEmail = async ({ email }) => {
        try {
            let data = await postRequest(`${baseUrl}/email/postEmail`, { email }, false, props, false);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const updateEmail = async ({ _id, email }) => {
        try {
            let data = await putRequest(`${baseUrl}/email/updateEmail/${_id}`, { email }, false, props, false);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const deleteEmail = async (id) => {
        try {
            let data = await deleteRequest(`${baseUrl}/email/deleteEmail/${id}`, {}, false, props);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const getStores = async (query) => {
        try {
            let data = await getRequest(`${baseUrl}/store/getStores`, false, props);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const postStore = async ({ title, file, subHeading, desc, isFeatured }) => {
        try {
            let formdata = new FormData();
            formdata.append('title', title);
            formdata.append('subHeading', subHeading);
            formdata.append('file', file);
            formdata.append('desc', desc);
            formdata.append('isFeatured', isFeatured);

            let data = await postRequest(`${baseUrl}/store/postStore`, formdata, false, props, true);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const updateStore = async ({ _id, title, subHeading, file, desc, isFeatured }) => {
        try {
            let formdata = new FormData();
            formdata.append('title', title);
            formdata.append('subHeading', subHeading);
            formdata.append('file', file);
            formdata.append('desc', desc);
            formdata.append('isFeatured', isFeatured);

            let data = await putRequest(`${baseUrl}/store/updateStore/${_id}`, formdata, false, props, true);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const deleteStore = async (id) => {
        try {
            let data = await deleteRequest(`${baseUrl}/store/deleteStore/${id}`, {}, false, props);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const getCategorys = async (query) => {
        try {
            let data = await getRequest(`${baseUrl}/category/getCategorys`, false, props);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const postCategory = async ({ title, file, desc }) => {
        try {
            let formdata = new FormData();
            formdata.append('title', title);
            formdata.append('file', file);
            formdata.append('desc', desc);

            const data = await postRequest(`${baseUrl}/category/postCategory`, formdata, false, props, true);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const updateCategory = async ({ _id, title, file, desc }) => {
        try {
            let formdata = new FormData();
            formdata.append('title', title);
            formdata.append('file', file);
            formdata.append('desc', desc);

            let data = await putRequest(`${baseUrl}/Category/updateCategory/${_id}`, formdata, false, props, true);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const deleteCategory = async (id) => {
        try {
            let data = await deleteRequest(`${baseUrl}/Category/deleteCategory/${id}`, {}, false, props);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <MainContext.Provider value={{ getBanners, postBanner, updateBanner, deleteBanner, getCoupans, postCoupan, updateCoupan, deleteCoupan, getEmails, postEmail, updateEmail, deleteEmail, getStores, postStore, updateStore, deleteStore, getCategorys, postCategory, updateCategory, deleteCategory }}>
                {props.children}
            </MainContext.Provider>
        </>
    );
};

export default MainState;
