import './style.scss'
import { Readability } from "@mozilla/readability";
import Browser from 'webextension-polyfill'


console.log(123);
console.log(document, 'document');

const port = Browser.runtime.connect()

port.onMessage.addListener((msg) => {
  console.log(msg.msg, 'content get');
})

// Browser.runtime.sendMessage({ action: 'doc', msg: 'content send to bg', document})


window.addEventListener("load", function() {
  console.log('window loaded');
  const newDocument = document.implementation.createHTMLDocument();
  newDocument.documentElement.innerHTML = document.documentElement.innerHTML;
  const article = new Readability(newDocument).parse();
  // const article = new Readability(document).parse();
  port.postMessage({ action: 'doc', msg: 'content send to bg', content: article})
});
