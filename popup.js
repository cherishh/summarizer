document.getElementById('summarize').addEventListener('click', function() {
  // 向content.js发送获取文章内容的请求
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getArticleContent' });
  });
});

// 向服务器发送文章内容并获取总结
function sendArticleContent(content) {
  fetch('YOUR_SUMMARIZATION_API_URL', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content: content })
  })
    .then(response => response.json())
    .then(data => {
      // 在这里处理服务器返回的总结结果
      // ...
      document.getElementById('summary').innerText = data;
    })
    .catch(error => {
      // 处理错误情况
      console.error('Error:', error);
    });
}

// 监听来自content.js的响应
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'sendArticleContent') {
    const articleContent = request.content;
    sendArticleContent(articleContent);
  }
});
