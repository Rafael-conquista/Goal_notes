
function get_api_url(){
    let apiUrl = '';
    if (process.env.REACT_APP_USE_PROD === 'true') {
        apiUrl = process.env.REACT_APP_PROD_API;
    } else {
        apiUrl = "http://127.0.0.1:5000/";
    }
    return apiUrl
}

export default get_api_url;
