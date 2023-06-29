import Browser from 'webextension-polyfill'


let article: any = null;
Browser.runtime.onMessage.addListener((message) => {
  if (message.action === 'readability') {
    article= message.article;
  }
});

Browser.browserAction.onClicked.addListener(() => {
  if (article) {
    setTimeout(() => {
      Browser.runtime.sendMessage({ action: 'getArticle', article });
    }, 100);
  }
});