import { weibo,qq,qqZone,douban,shareUrl,shareTitle } from "@/utils/env";
import * as mutils from "@/utils/mUtils";

function getParamsUrl(obj){
    let paramsUrl = '';
    for(let key in obj){
        paramsUrl += key+'='+obj[key]+'&'
    }
    return paramsUrl;
}

export function shareConfig(type,obj){
    let baseUrl = '';
    if(mutils.isEmpty(obj)){
        obj = {};
    }
    switch(type){
        case 'weibo':
            const weiboData = {
                'url':shareUrl, 
                'title':shareTitle,
                'pic':obj.pic || weibo.pic,
                'count':'y',
                'searchPic':true
            }
            baseUrl = weibo.weiboUrl+'?appkey='+weibo.weiboAppkey+getParamsUrl(weiboData);
            window.open(baseUrl,'_blank');
            break;
        case 'qq':
            const qqData = {
                'url':shareUrl,
                'title':shareTitle,
                'pics':obj.pic || qq.pic, 
                'source':obj.source || qq.source, 
                'desc':obj.desc || qq.desc, 
                'summary':obj.summary || qq.summary,
            }
            baseUrl = qq.baseUrl+'?'+getParamsUrl(qqData)
            window.open(baseUrl,'_blank');
            break;
        case 'qqZone':
            const qqZoneData = {
                'url':shareUrl,
                'title':shareTitle,
                'pics':obj.pic || (qqZone.pic).split(','), 
                'sharesource':obj.sharesource || qqZone.sharesource,
                'desc':obj.desc || qqZone.desc, 
                'summary':obj.summary || qqZone.summary,
            }
            baseUrl = qqZone.baseUrl+'?'+getParamsUrl(qqZoneData)
            window.open(baseUrl,'_blank');
            break;
        case 'douban':
            const doubanData = {
                'href':shareUrl,
                'name':shareTitle,
                'image':obj.pic || douban.pic,
            }
            baseUrl = douban.baseUrl+'?'+getParamsUrl(doubanData)
            window.open(baseUrl,'_blank');
            break;
    }
}