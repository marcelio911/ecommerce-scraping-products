/* eslint-disable @typescript-eslint/no-explicit-any */
document.body.style.backgroundColor = 'green';

let product = {};

const eventsToPrepareLoadObjects = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const clickElements = (elements) => {
    elements.forEach((el) => {
      if (el.nodeType === Node.ELEMENT_NODE) {
        try {
          document.getElementsByClassName(el.className)[0].click();
        } catch (error) {
          console.log('error', error);
        }
        console.log('el', el.className  )
        clickElements(el.childNodes);
      }
    });
  };

  const briefing = document.getElementsByClassName('product-briefing')[0];
  if (briefing) {
    clickElements(Array.from(briefing.childNodes));
  }

  await new Promise((resolve) => setTimeout(resolve, 1500));

}

const prepareSendMessageToExtension = async () => {
  // Enviar a URL para o listener na extensão
  const sendMessage = await chrome.runtime.sendMessage({ type: 'url', product });
  console.log('sendedMessage', sendMessage);
}

const getInfoProduct = () => {
}

const getShopeeImages = async () => {
  const { product } = require('./models/product.js');

  const innerModal = document.querySelector('#modal');
  if (!innerModal) {
    return;
  }
  const images = innerModal.querySelectorAll('img');
  for (const image of images) {
    const ext = image.src.split('.').pop();
    console.log('img ', image.src, + ' filename: '+ image.className + ext);
    // prepareSendMessageToExtension(image.src, image.className + image.ext);
    product.addImage(image.src, image.className + ext);
  }
}

const initializeGetShopeeProductInfoByPage = async () => {
  await eventsToPrepareLoadObjects();
  getShopeeImages();
  getInfoProduct();
  prepareSendMessageToExtension();
}


(async () => {
  console.log('Content script running');
  initializeGetShopeeProductInfoByPage();

  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    initializeGetShopeeProductInfoByPage();
  });

})();
