// 获取当前标签页的文章内容
function getPageContent() {
  return document.body.innerText;
}

// 向插件的popup.js发送消息
function sendMessageToPopup(content) {
  chrome.runtime.sendMessage({action: 'sendArticleContent', content: content });
}

// 监听来自popup.js的请求
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getArticleContent') {
    const content = getPageContent();
    sendMessageToPopup(content);
  }
});