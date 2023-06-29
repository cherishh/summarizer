import './style.scss'
import { Readability } from "@mozilla/readability";
import Browser from 'webextension-polyfill'


async function init() {
  const article = new Readability(document).parse();
  Browser.runtime.sendMessage({ action: 'readability', article });
}