import {
    API_BASEURL,
    API_TOKEN_CODE,
    API_TOKEN,
    API_REFERER_CODE,
    API_REFERER,
    API_VERSION_CODE,
    API_VERSION
} from './params';

const http = ({
    url,
    method = 'GET',
    data = {},
    tips = '加载中'
}) => {
    //登录后拿到token值
    let header = {
        'x-app-refer': API_REFERER,
        'x-app-version': API_VERSION
    };
    if (wx.getStorageSync('token')) {
        header['x-app-token'] = wx.getStorageSync('token');
    }
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: tips,
        })
        wx.request({
            url: url.substring(0, 1) === '/' ? `${API_BASEURL}${url}` : `${url}`, // 兼容baseUrl不同的情况，可以通过填写完整路径
            method,
            data,
            header,
            success: res => {
                resolve(res)
            },
            fail: err => {
                reject(err)
            },
            complete: () => {
                wx.hideLoading()
            }
        })
    })
}
//export default http;

class Request {
    constructor(options) {
        this.baseURL = options.baseURL
        this.loading = options.loading || false
        this.loadingTips = options.loadingTips || '正在加载中...'

        let header = {
            [API_REFERER_CODE]: API_REFERER,
            [API_VERSION_CODE]: API_VERSION
        };
        if (wx.getStorageSync(API_TOKEN)) {
            header[API_TOKEN_CODE] = wx.getStorageSync(API_TOKEN);
        }
        this.header = header;
    }
    get(url, data) {
        console.log(this.header);
        
        return this.request('GET', url, data, this.header)
    }
    post(url, data) {
        return this.request('POST', url, data, this.header)
    }
    postForm(url, data) {
        let header = {};
        Object.assign(header, this.header, {
            'content-type': 'application/x-www-form-urlencoded'
        });
        return this.request('POST', url, data, header)
    }
    put(url, data) {
        return this.request('PUT', url, data, this.header)
    }
    putForm(url, data) {
        let header = {};
        Object.assign(header, this.header, {
            'content-type': 'application/x-www-form-urlencoded'
        });
        return this.request('PUT', url, data, header)
    }
    DELETE(url, data) {
        return this.request('DELETE', url, data, this.header)
    }
    request(method, url, data, header = {}) {
        const that = this
        return new Promise((resolve, reject) => {
            if (that.loading) {
                wx.showLoading({
                    title: that.loadingTips,
                })
            }
            wx.request({
                // 兼容baseUrl不同的情况，可以通过填写完整路径
                url: url.substring(0, 1) === '/' ? `${that.baseURL}${url}` : `${url}`,
                data,
                method,
                header,
                success: res => {
                    resolve(res)
                },
                fail: err => {
                    reject(res)
                },
                complete: (res) => {
                    if (that.loading) {
                        wx.hideLoading()
                    }
                }
            })
        })
    }
}
const request = new Request({
    baseURL: API_BASEURL,
    loading: true,
    loadingTips: '正在加载中...'
})
export default request