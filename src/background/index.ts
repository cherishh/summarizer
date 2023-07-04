import Browser from 'webextension-polyfill';

console.log('background script loaded');

Browser.runtime.onMessage.addListener((message) => {
    console.log( message, 'bg get');
});
console.log(234);


setTimeout(() => {
  Browser.runtime.sendMessage({ action: 'click', msg: 'clicked icon' });
}, 10000);

