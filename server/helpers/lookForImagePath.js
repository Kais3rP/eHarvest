module.exports = function lookForImagePath(obj) {
    let picName = obj.productName.toLowerCase().replace(/\s/g, '_');
    let fileNames = [];
    let type = obj.type;
    let imgPath = type === 'Vegetables' ?
      '/vegs-pics' + '/' + picName + '.png' :
      '/fruit-pics' + '/' + picName + '.png';
  
    return imgPath;
  }