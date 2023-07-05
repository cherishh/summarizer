import Browser from 'webextension-polyfill';

console.log('background script loaded');
let article = null;
Browser.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(async (message) => {
    console.log(message, 'bg get');
    article = message;

    Browser.runtime.sendMessage({
      action: 'article',
      article,
    })
  });

  // setTimeout(() => {
  //   port.postMessage({ action: 'click', msg: 'clicked icon' });
  // }, 5000);
});

console.log(234);


