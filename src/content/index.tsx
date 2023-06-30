import './style.scss'
import { Readability } from "@mozilla/readability";
import Browser from 'webextension-polyfill'


console.log(123);

document.addEventListener("DOMContentLoaded", function() {
  async function init() {
    const article = new Readability(document).parse();
    Browser.runtime.sendMessage({ action: 'readability', article });

    Browser.runtime.onMessage.addListener((message) => {
      if (message.action === 'test') {
        console.log(message.msg, 'msg');
      }
    });
  }
  
  init();
});
