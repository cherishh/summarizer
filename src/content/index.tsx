import './style.scss'
// import { Readability } from "@mozilla/readability";
import Browser from 'webextension-polyfill'


console.log(123);
console.log(document, 'document');

Browser.runtime.onMessage.addListener((msg) => {
  console.log(msg.msg, 'content get');
})

// Browser.runtime.sendMessage({ action: 'doc', msg: 'content send to bg', document})


window.addEventListener("load", function() {
  console.log('window loaded');
  Browser.runtime.sendMessage({ action: 'doc', msg: 'content send to bg', document})
});
