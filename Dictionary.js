const  path = require('path');

class Dictionary {

  static fetchAll(){
    return Object.keys(this.links).map(key => {
      return {key,URL:this.links[key].URL,mappedURL:this.links[key].mappedURL}
    });
  }
  static getShortenLinkFromURL(targetKey){
    const item = this.fetchAll().find(url => url.key === targetKey);
    return item ? item : null;
  }

  static isExists(url) {
    return this.fetchAll()
            .find(item => item.URL === url);
  }

  static generateUniqueKey() {
    const uniqueKey = `${Math.random().toString().substr(2,8)}_${new Date().getTime()}`;
    if(Object.keys(this.links).find(key => key === uniqueKey)){
      this.generateUniqueKey();
    }
    return uniqueKey;
  }

  static addItem(url){
    if(!this.isExists(url)){
        const key = this.generateUniqueKey();
        this.links[key] = {
          key,
          URL:url,
          mappedURL:`/hu.dir/${key}`
        };
        return this.links[key];
    }
    return false;
  }

}
Dictionary.links = {};
module.exports =  Dictionary;
