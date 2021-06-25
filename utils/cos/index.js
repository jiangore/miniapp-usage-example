let CosAuth = require('./cos-auth');
import {
    wxp
} from '../wxp';
import {
    COS
} from '../params';

// 请求用到的参数
let stsCache;
let prefix = 'https://' + COS.bucket + '.cos.' + COS.region + '.myqcloud.com/';

// 对更多字符编码的 url encode 格式
function camSafeUrlEncode(str) {
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
}

// 上传到COS操作
function uploadTask(filePath, authData) {
    let Key = filePath.substr(filePath.lastIndexOf('/') + 1);
    return new Promise((resolve, reject) => {
        let formData = {
            'key': Key,
            'success_action_status': 200,
            'Signature': CosAuth({
                SecretId: authData.tmpSecretId,
                SecretKey: authData.tmpSecretKey,
                Method: 'POST',
                Pathname: '/'
            }),
            'x-cos-security-token': authData.sessionToken,
            'Content-Type': '',
        }
        wxp.uploadFile({
            url: prefix,
            name: 'file',
            filePath: filePath,
            formData: formData
        }).then(res => {
            resolve({
                code: 200,
                message: '上传成功',
                cosUrl: prefix + camSafeUrlEncode(Key).replace(/%2F/g, '/'),
                tempPath: filePath
            });
        }).catch(err => {
            reject({
                code: 1,
                message: '上传失败',
                reason: JSON.stringify(err)
            })
        })
    })
}

module.exports = () => new Promise((resolve, reject) => {
    if (stsCache && Date.now() / 1000 + 30 < stsCache.expiredTime) {
        //callback(stsCache.credentials);
        resolve(stsCache.credentials);
    } else {
        wx.request({
            method: 'GET',
            url: COS.url,
            dataType: 'json',
            success: function (result) {
                var data = result.data;
                var credentials = data.credentials;
                if (credentials) {
                    stsCache = data
                    resolve(stsCache.credentials);
                } else {
                    reject({
                        code: 1,
                        message: '获取临时密钥失败',
                        reason: ''
                    })
                }
            },
            error: function (err) {
                reject({
                    code: 1,
                    message: '获取临时密钥失败',
                    reason: JSON.stringify(err)
                })
            }
        });
    }
}).then(data => {
    return new Promise((resolve, reject) => {
        let defaultOptions = {
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera']
        }
        wx.chooseImage({
            ...defaultOptions,
            success(res) {
                resolve({
                    files: res.tempFiles,
                    authData: data
                });
            },
            fail(res) {
                reject({
                    code: 1,
                    message: '选择图片失败',
                    reason: JSON.stringify(res)
                });
            }
        })
    })
}).then(({
    files,
    authData
}) => {
    return new Promise((resolve, reject) => {
        let taskQueue = [];
        files.forEach(item => {
            taskQueue.push(uploadTask(item.path, authData))
        });
        Promise.all(taskQueue)
            .then(values => {
                resolve(values);
            }).catch(err => {
                reject(err)
            });
    })
});