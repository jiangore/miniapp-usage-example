/**
 * 全局配置
 */
export const API_BASEURL = 'https://api.jiangore.com/v1';

export const API_TOKEN_CODE = 'x-app-token';
export const API_TOKEN = 'api_token';
export const API_REFERER_CODE = 'x-app-refer';
export const API_REFERER = 'wx-miniapp';
export const API_VERSION_CODE = 'x-app-version';
export const API_VERSION = '1.0';


/**
 * 背景音乐
 */
export const BGM = {
  title: '欢迎语',
  epname: '点选停车',
  singer: '点选停车',
  startTime: 0,
  coverImgUrl: 'http://www.szdlk.cn/park/logo.png',
  src: 'http://www.szdlk.cn/park/welcome.wav'
}


/**
 * 地图常量
 */
const map_key = '5DLBZ-M77W4-WG7U4-XNIXC-FRTCT-VZFHX';
export const QQMAP_KEY = map_key;
export const RADIUS = 500;
export const MAP_SETTING = {
  skew: 0,
  rotate: 0,
  showLocation: false,
  showScale: false,
  subKey: map_key,
  layerStyle: 1,
  enableZoom: true,
  enableScroll: true,
  enableRotate: false,
  showCompass: false,
  enable3D: false,
  enableOverlooking: false,
  enableSatellite: false,
  enableTraffic: false,
};


/**
 * 腾讯云对象存储配置
 */
export const COS = {
  url: 'http://localhost:8080/api/wx/cos/sts',
  bucket: 'parking-image-1300648105',
  region: 'ap-nanjing',
};