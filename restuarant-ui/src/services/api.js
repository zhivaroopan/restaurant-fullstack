import axios from "axios";


const post = (url, params) => 
    axios({
        method: 'post',
        url: `http://localhost:3002/${url}`,
        data: params
    });

const get = (url, params) => 
    axios({
        method: 'get',
        url: `http://localhost:3002/${url}`,
        data: params
    });

const put = (url, params) => 
    axios({
        method: 'put',
        url: `http://localhost:3002/${url}`,
        data: params
    });

const deleteMethod = (url, params) => 
    axios({
        method: 'delete',
        url: `http://localhost:3002/${url}`,
        data: params
    });

export const apiService = {
    get,
    put,
    post,
    deleteMethod
}

export default apiService