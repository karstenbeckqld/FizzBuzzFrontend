{
    "message": "Request failed with status code 400",
    "name": "AxiosError",
    "stack": "AxiosError: Request failed with status code 400\n    at settle (http://localhost:5173/node_modules/.vite/deps/axios.js?v=7fb697cc:1253:12)\n    at XMLHttpRequest.onloadend (http://localhost:5173/node_modules/.vite/deps/axios.js?v=7fb697cc:1585:7)\n    at Axios.request (http://localhost:5173/node_modules/.vite/deps/axios.js?v=7fb697cc:2143:41)\n    at async deleteRule (http://localhost:5173/src/pages/Admin.tsx?t=1756510899087:69:5)",
    "config": {
    "transitional": {
        "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
    },
    "adapter": [
        "xhr",
        "http",
        "fetch"
    ],
        "transformRequest": [
        null
    ],
        "transformResponse": [
        null
    ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
    "headers": {
        "Accept": "application/json, text/plain, */*"
    },
    "method": "delete",
        "url": "http://localhost:5165/api/rules/1",
        "allowAbsoluteUrls": true
},
    "code": "ERR_BAD_REQUEST",
    "status": 400
}