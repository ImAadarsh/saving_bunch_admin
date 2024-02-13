import React from 'react';
import mongoose from 'mongoose';
import { deleteRequest, getRequest, postRequest, putRequest } from '../Api/Api';
import MainContext from './MainContext';

const baseUrl = 'https://savingbunch.endeavourdigital.in';

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

    const getExBanners = async (query) => {
        try {
            let data = await getRequest(`${baseUrl}/exclusivebanner/getBanners`, false, props);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const postExBanner = async ({ file, sequence, text, buttonLink, subText, buttonText }) => {
        try {
            let formdata = new FormData();
            formdata.append('file', file);
            formdata.append('sequence', sequence);
            formdata.append('text', text);
            formdata.append('buttonLink', buttonLink);
            formdata.append('subText', subText);
            formdata.append('buttonText', buttonText);

            let data = await postRequest(`${baseUrl}/exclusivebanner/postBanner`, formdata, false, props, true);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const updateExBanner = async ({ _id, file, sequence, text, buttonLink, subText, buttonText }) => {
        try {
            let formdata = new FormData();
            formdata.append('file', file);
            formdata.append('sequence', sequence);
            formdata.append('text', text);
            formdata.append('buttonLink', buttonLink);
            formdata.append('subText', subText);
            formdata.append('buttonText', buttonText);

            let data = await putRequest(`${baseUrl}/exclusivebanner/updateBanner/${_id}`, formdata, false, props, true);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const deleteExBanner = async (id) => {
        try {
            let data = await deleteRequest(`${baseUrl}/exclusivebanner/deleteBanner/${id}`, {}, false, props);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const getCoupans = async (id) => {
        try {
            let str="";
            if(id && id!=="")
            {
                str+=`?id=${id}`;
            }

            let data = await getRequest(`${baseUrl}/coupan/getCoupans${str}`, false, props);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const postCoupan = async ({ store, category, title, coupanCode, link, expiryDate, is_coupan, is_popular, is_exclusive, desc, subText, sideLine, priority }) => {
        try {
            let formdata = new FormData();
            let modifiedCategory = [];
            for(let i=0;i<category.length;++i){
                modifiedCategory.push(category[i].value);
            }
            formdata.append('store', JSON.stringify(store));
            formdata.append('category', JSON.stringify(modifiedCategory));
            formdata.append('title', title);
            formdata.append('coupanCode', coupanCode);
            formdata.append('link', link);
            formdata.append('expiryDate', expiryDate);
            formdata.append('is_coupan', is_coupan);
            formdata.append('is_popular', is_popular);
            formdata.append('is_exclusive', is_exclusive);
            formdata.append('desc', desc);
            formdata.append('status', true);
            formdata.append('subText', subText);
            formdata.append('sideLine', sideLine);
            formdata.append('priority', priority);

            let data = await postRequest(`${baseUrl}/coupan/postCoupan`, formdata, false, props, true);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const updateCoupan = async ({ _id, store, category, title, coupanCode, link, expiryDate, is_coupan, is_popular, is_exclusive, desc, subText, sideLine, priority,visible }) => {
        try {
            let formdata = new FormData();
            if(category){
                let modifiedCategory = [];
                for(let i=0;i<category.length;++i){
                    modifiedCategory.push(category[i].value);
                }
                formdata.append('category', JSON.stringify(modifiedCategory));
            }
            if(store){
                formdata.append('store', JSON.stringify(store));
            }
            
            if(visible){
                formdata.append('status',visible);
            }
            formdata.append('title', title);
            formdata.append('coupanCode', coupanCode);
            formdata.append('link', link);
            formdata.append('expiryDate', expiryDate);
            formdata.append('is_coupan', is_coupan);
            formdata.append('is_popular', is_popular);
            formdata.append('is_exclusive', is_exclusive);
            formdata.append('desc', desc);
            formdata.append('subText', subText);
            formdata.append('sideLine', sideLine);
            formdata.append('priority', priority);

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

    const getStores = async (id) => {
        try {
            let str="";
            if(id && id!=="")
            {
                str+=`?id=${id}`;
            }
         
            let data = await getRequest(`${baseUrl}/store/getStores${str}`, false, props);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const postStore = async ({ title, seoTitle, pageTitle,invalidLink, storeOverview,similarStore, category, file, subHeading, desc, isFeatured, priority, status }) => {
        try {
            let formdata = new FormData();

            let modifiedStore = [];
            let modifiedCategory = [];
            for(let i=0;i<similarStore.length;++i){
                modifiedStore.push(similarStore[i].value);
            }
            for(let i=0;i<category.length;++i){
                modifiedCategory.push(category[i].value);
            }
            console.log(modifiedCategory)
            formdata.append('title', title);
            formdata.append('subHeading', subHeading);
            formdata.append('file', file);
            formdata.append('desc', desc);
            formdata.append('isFeatured', isFeatured);
            formdata.append('priority', priority);
            formdata.append('seoTitle', seoTitle);
            formdata.append('pageTitle', pageTitle);
            formdata.append('invalidLink', invalidLink);
            formdata.append('storeOverview', storeOverview);
             formdata.append('similarStore', JSON.stringify(modifiedStore))
            formdata.append('category',JSON.stringify(modifiedCategory));
             console.log(formdata)

            let data = await postRequest(`${baseUrl}/store/postStore`, formdata, false, props, true);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const updateStore = async ({ _id, title, seoTitle, pageTitle,invalidLink,similarStore, storeOverview,category, file, subHeading, desc, isFeatured, priority, status }) => {
        try {
            let formdata = new FormData();
            let modifiedStore = [];
            let modifiedCategory = [];
            for(let i=0;i<similarStore.length;++i){
                modifiedStore.push(similarStore[i].value);
            }
            for(let i=0;i<category.length;++i){
                modifiedCategory.push(category[i].value);
            }
            formdata.append('title', title);
            formdata.append('subHeading', subHeading);
            formdata.append('file', file);
            formdata.append('desc', desc);
            formdata.append('status', status);
            formdata.append('isFeatured', isFeatured);
            formdata.append('priority', priority);
            formdata.append('seoTitle', seoTitle);
            formdata.append('pageTitle', pageTitle);
            formdata.append('invalidLink', invalidLink);
            formdata.append('storeOverview', storeOverview);
            formdata.append('similarStore', JSON.stringify(modifiedStore))
            formdata.append('category',JSON.stringify(modifiedCategory));

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

    const getDeals = async (query) => {
        try {
            let data = await getRequest(`${baseUrl}/deals/getDeals`, false, props);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const postDeal = async ({ text, file, subText, buttonLink, storeId, isExclusive }) => {
        try {
            let formdata = new FormData();
            formdata.append('text', text);
            formdata.append('subText', subText);
            formdata.append('buttonLink', buttonLink);
            formdata.append('file', file);
            formdata.append('storeId', storeId);
            formdata.append('isExclusive', isExclusive);

            let data = await postRequest(`${baseUrl}/deals/postDeals`, formdata, false, props, true);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const updateDeal = async ({ _id, text, file, subText, buttonLink, storeId, isExclusive }) => {
        try {
            let formdata = new FormData();
            formdata.append('text', text);
            formdata.append('subText', subText);
            formdata.append('buttonLink', buttonLink);
            formdata.append('file', file);
            formdata.append('storeId', storeId);
            formdata.append('isExclusive', isExclusive);


            let data = await putRequest(`${baseUrl}/deals/updateDeal/${_id}`, formdata, false, props, true);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const deleteDeal = async (id) => {
        try {
            let data = await deleteRequest(`${baseUrl}/deals/deleteDeal/${id}`, {}, false, props);
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
    const postCategory = async ({ title, file, desc, priority, seoTitle, name, pageTitle }) => {
        try {
            let formdata = new FormData();
            formdata.append('title', title);
            formdata.append('file', file);
            formdata.append('desc', desc);
            formdata.append('priority', priority);
            formdata.append('name', name);
            formdata.append('seoTitle', seoTitle);
            formdata.append('pageTitle', pageTitle);

            const data = await postRequest(`${baseUrl}/category/postCategory`, formdata, false, props, true);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const updateCategory = async ({ _id, title, file, desc, priority, seoTitle, pageTitle, name, status }) => {
        try {
            let formdata = new FormData();
            formdata.append('title', title);
            formdata.append('file', file);
            formdata.append('desc', desc);
            formdata.append('priority', priority);
            formdata.append('seoTitle', seoTitle);
            formdata.append('pageTitle', pageTitle);
            formdata.append('name', name);
            formdata.append('status', status);

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

    const getAllBrands = async (query) => {
        try {
            let data = await getRequest(`${baseUrl}/brands/getAllBrands`, false, props);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <MainContext.Provider value={{ getBanners, postBanner, updateBanner, deleteBanner, getCoupans, postCoupan, updateCoupan, deleteCoupan, getEmails, postEmail, updateEmail, deleteEmail, getStores, postStore, updateStore, deleteStore, getCategorys, postCategory, updateCategory, deleteCategory, getAllBrands, getDeals, postDeal, updateDeal, deleteDeal, getExBanners, postExBanner, updateExBanner, deleteExBanner }}>
                {props.children}
            </MainContext.Provider>
        </>
    );
};

export default MainState;
