export const injectTaobaoDetail = `
                if(document.querySelectorAll(".bar").length > 0){
                    document.querySelectorAll(".bar")[0].style.display = 'none';   
                }
                if(document.querySelectorAll(".sku.card .modal-btn-wrapper").length > 0){
                    document.querySelectorAll(".sku.card .modal-btn-wrapper")[0].style.display = 'none'
                }

                if(document.querySelectorAll("button").length > 0){
                    document.querySelectorAll("button").forEach((e)=> {
                        e?.innerText == '打开淘宝App';
                        e.style.display = 'none';
                    });
                }

                if(document.querySelectorAll(".price-tag").length > 0){
                    document.querySelectorAll(".price-tag").forEach((e)=> {
                        e.innerText = 'Đang khuyến mãi';
                    });
                }

                if(document.querySelectorAll(".month-sold").length > 0){
                    document.querySelectorAll(".month-sold")[0].childNodes[0].textContent = 'Bán mỗi tháng';
                }
            `

export const removeSearchBar = `
  const searchBar = document.getElementsByClassName('h6uuVRGLOTdw8OYi6zYMG');
  searchBar[0].style.display = 'none';
`

export const removeAppBar = `
  const appBar = document.getElementsByClassName('zebra-oversea-smartbanner');
  appBar[0].style.display = 'none';
`

// zebra-oversea-smartbanner

export const transTextBar = `
  const textElement = document.getElementsByClassName('_25ak-pf9qKST88rlFSaDMk');
  textElement[0].childNodes[0].childNodes[0].innerText = 'Tất cả';
  textElement[0].childNodes[1].childNodes[0].innerText = 'Tmall';
  const textShop = document.getElementsByClassName('_1Kx8x8s4S57kXVLKGgxt1f');
  textShop[0].innerText = 'Bán hàng';

  const textAutoSort = document.getElementsByClassName('_2Mu1YMGfjhXVsP0ghTN_ul');
  textAutoSort[0].innerText = 'Sắp xếp'
  
  const textFilter = document.getElementsByClassName('_1XI-cJ-k8WPfoNOMUAL107');
  textFilter[0].innerText = 'Lọc';
`

export const transTextTmall = `
  const textTmallElement = document.getElementsByClassName('_25ak-pf9qKST88rlFSaDMk');
  textTmallElement[0].innerText = 'Tmall';
`

export const closeTaobaoModal = `
  if(document.querySelectorAll(".modal-close-btn").length > 0){
      document.querySelectorAll(".modal-close-btn")[0].click();
  }
`

export const detailJS = {
  TAOBAO: `(() => {
    function getProductPropsData() {
      const getUrlParameter = (name, url) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(url);
        if (results) {
          return decodeURIComponent(results[1]);
        } else {
          return '';
        }
      };
      const removeUrlParameter = (key, sourceURL) => {
        var rtn = sourceURL.split('?')[0],
          param,
          params_arr = [],
          queryString =
            sourceURL.indexOf('?') !== -1 ? sourceURL.split('?')[1] : '';
        if (queryString !== '') {
          params_arr = queryString.split('&');
          for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split('=')[0];
            if (param === key) {
              params_arr.splice(i, 1);
            }
          }
          rtn = rtn + '?' + params_arr.join('&');
        }
        return rtn;
      };
  
      let arraySKuCont = (() => {
        let result = [];
        if (document.querySelectorAll('.split > .card.sku .modal-sku-content')) {
          result = Array.from(
            document.querySelectorAll('.split > .card.sku .modal-sku-content'),
          );
        }
        return result;
      })();
      let currentSKUArray = arraySKuCont.map((element) => {
        let result = '';
  
        let arrayProps = Array.from(
          element.querySelectorAll('.modal-sku-content-item'),
        ).map((item) => {
          let propValue = (() => {
            return item.dataset.vid;
          })();
          return {
            title: item.textContent,
            isSelected: item.className.includes('active'),
            value: propValue,
          };
        });
  
        result = {
          title: element.querySelector('.modal-sku-content-title').textContent,
          props: arrayProps,
        };
        return result;
      });
  
      let skuImg = () => {
        let el = document.querySelector('.modal-sku-image img');
        if (!el) el = document.querySelector('.sku-wrap .header .img-wrap img');
        if (!el) el = document.querySelector('.carousel img');
        return !!el ? el.src : '';
      };
      let skuPrice = () => {
        let els = document.querySelector('.modal-sku-title-price');
        if (!!els) return els.textContent.trim();
        els = document.querySelector('.price-wrap .price');
        if (!!els) return els.textContent.trim();
        return '';
      };
  
      let pdName = () => {
        let el = document.querySelector('.title-wrapper .title');
        if (!!el) return el.textContent.trim();
        el = document.querySelector('.main.cell');
        return !!el ? el.textContent.trim() : '';
      };
      let providerId = () => {
        let el = document.querySelector('.shop-link-item');
        if (el) return getUrlParameter('user_id', el.href);
        el = document.querySelector('.mui-shopactivity-item a');
        return !!el ? getUrlParameter('sellerId', el.href) : '';
      };

      let providerName = () => {
        if (document.querySelector('.shop-title-text'))
          return document.querySelector('.shop-title-text').textContent.trim();
        if (document.querySelector('.shop-name'))
          return document.querySelector('.shop-name').textContent.trim();
        return '';
      };

      let getShopId = () => {
        let shopId = '';

       if (document.querySelector('.prices')){
        shopId = document.querySelector('.prices').getAttribute('data-spm-anchor-id');
       }

        return shopId;
      };

      let quantity = () => {
        if (document.querySelector('.sku-number-edit'))
          return document.querySelector('.sku-number-edit').value;
  
        if (document.querySelector('#number'))
          return document.querySelector('#number').value;
  
        return '1';
      };
      let itemId = () => {
        return getUrlParameter('id', location.href);
      };
      let stock = () => {
        let returnValue = '';
        if (document.querySelector('.stock')) {
          returnValue = document.querySelector('.stock').textContent.trim();
        }
  
        if (document.querySelector('.modal-sku-title-quantity')) {
          returnValue = document
            .querySelector('.modal-sku-title-quantity')
            .textContent.trim();
        }
        //returnValue = returnValue.match(/\d+/g)[0];
  
        return returnValue;
      };
      let linkOrigin = () => {
        let result = '';
        result = location.href;
        if (result.includes('#modal=sku')) {
          result = result.split('#')[0];
        }
        return result;
      };
      let priceStep = () => {
        return '';
      };
  
      //sender data
      let inwebData = '';
      try {
        inwebData = {
          productMeta: {
            productName: pdName(),
            provider: {
              id: providerId(),
              name: providerName(),
              shopId: getShopId(),
            },
            quantity: quantity(),
            productId: itemId(),
            linkOrigin: linkOrigin(),
          },
          productSKU: {
            list: currentSKUArray,
            img: skuImg(),
            price: skuPrice(),
            priceStep: priceStep(),
            stock: stock(),
          },
        };
      } catch (error) {
        // inwebData = error;
      }
  
      let data = { action: 'GET_PRODUCT_PROPS_TB', data: inwebData };
      return data;
    }
  
    if (typeof getProductPropsData !== 'undefined') {
      window.ReactNativeWebView.postMessage(
        JSON.stringify(getProductPropsData()),
      );
    } else {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ action: 'GET_PRODUCT_PROPS_TB', data: '' }),
      );
    }
  })()`,

  1688: `(() => {

    function getProductPropsData() {
            let priceStep = () => {
              if (Array.from(document.querySelectorAll(".step-price-item")).length > 0) {
                let skuRangePrices = Array.from(document.querySelectorAll(".step-price-item"));
                let skuRangePricesString = skuRangePrices.map((item) => {
                  let _price = '';
                  let _unit = '';
                  _price = item.querySelector(".price-text").textContent.trim() || '';
                  _unit = item.querySelector(".unit-text").textContent.trim() || "";
                  return {
                    PriceText: _price,
                    unitText: _unit,
                  };
                });
                
                return skuRangePricesString;
              } else {
                let _price = document.querySelector(".price-text").textContent.trim();
                let _unit = document.querySelector(".unit-text").textContent.trim() || "";
                const data = [{
                  PriceText: _price,
                  unitText: _unit,
                }];
                return data;
              }
            };
      
      let priceStepData = () => {
        let rangeEls = document.querySelectorAll('.d-price-rangecount dd');
        let priceEls = document.querySelectorAll('.d-price-discount dd');
        rangeEls = Array.from(rangeEls).map((el) => {
          return el.textContent.trim();
        });
        priceEls = Array.from(priceEls).map((el) => {
          return el.textContent.trim();
        });
        if (rangeEls.length > 0 && priceEls.length > 0)
          return (
            rangeEls.toArray().toString() + '|' + priceEls.toArray().toString()
          );
  
        if (rangeEls.length == 0 && priceEls.length == 0) {
          let infoEls = document.querySelectorAll('.J_SkuPriceItem');
          if (infoEls.length > 0) {
            infoEls = Array.from(infoEls).map((el, i) => {
              if (
                !!el.querySelector('.price-num') &&
                !!!!el.querySelector('.price-beigin-amount')
              ) {
                let beginamountString = el
                  .querySelector('.price-beigin-amount')
                  .textContent.trim();
                beginamountString = beginamountString.replace(
                  /[^\x20-\x7E]/g,
                  '',
                );
                if (i === Array.from(infoEls).length - 1)
                  beginamountString = beginamountString + '-9999999';
                return (
                  beginamountString +
                  ':' +
                  el.querySelector('.price-num').textContent.trim()
                );
              }
              return '';
            });
            return infoEls.join('|');
          } else {
            let skuRangePrices = [
              ...GLOBAL_DATA.orderParamModel.orderParam.skuParam.skuRangePrices,
            ];
            let skuRangePricesString = skuRangePrices
              .map((item, index) => {
                if (index === skuRangePrices.length - 1) {
                  return item.beginAmount + '-9999999' + ':' + item.price;
                }
                return item.beginAmount != skuRangePrices[index + 1].beginAmount
                  ? item.beginAmount +
                      '-' +
                      (parseInt(skuRangePrices[index + 1].beginAmount) - 1) +
                      ':' +
                      item.price
                  : item.beginAmount + '-9999999' + ':' + item.price;
              }).join('|');
            return skuRangePricesString;
          }
        } else {
        } 
      };

      let linkOrigin = () => {
        let result = '';
        result = location.href;
        if (result.includes('#modal=sku')) {
          result = result.split('#')[0];
        }
        return result;
      };

      let pigetType = () => {
        let rangeEls = document.querySelectorAll('.colorSpec_hashTxtSelected');
        return rangeEls;
      };

      let extendInfo = document.querySelector(".unit-text").textContent.trim() || "";
      let data = { action: 'GET_PRODUCT_PROPS_1688',

      data: GLOBAL_DATA,
        pigetType: pigetType(),
        priceStep: priceStep(),
        extendInfo: extendInfo,
        linkOrigin: linkOrigin(),
        priceStepData: priceStepData(),
      };

      return data;
    }
  
    if (typeof getProductPropsData !== 'undefined') {
      window.ReactNativeWebView.postMessage(
        JSON.stringify(getProductPropsData()),
      );
    } else {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ action: 'GET_PRODUCT_PROPS_1688', data: '' }),
      );
    }
  })()`,

  TMALL: ``,
}

export const toggleOrder1688 = ``
