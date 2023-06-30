import Browser from 'webextension-polyfill';

let article: any = null;
console.log('background script loaded');

Browser.runtime.onConnect.addListener((port) => {
  console.log(port, 'port');
  port.onMessage.addListener(async (msg) => {
    console.debug('received msg', msg);
  });
});

Browser.runtime.onMessage.addListener((message) => {
  if (message.action === 'readability') {
    console.debug('readability', message);
    article = message.article;
  }
});

// Browser.browserAction.onClicked.addListener(() => {
//   Browser.runtime.sendMessage({ action: 'test', msg: 'ok' });
// });
