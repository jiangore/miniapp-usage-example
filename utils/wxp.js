import {promisifyAll, promisify} from 'miniprogram-api-promise';
export const wxp = {};
promisifyAll(wx, wxp);