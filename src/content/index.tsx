import './style.scss'
import { Readability } from "@mozilla/readability";
import Browser from 'webextension-polyfill'


document.addEventListener("DOMContentLoaded", function() {
  async function init() {
    const article = new Readability(document).parse();
    Browser.runtime.sendMessage({ action: 'readability', article });
  }
  
  init();
});
