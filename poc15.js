(function() {
  const GET_DIGEST_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/Lists/TestXSS/AllItems.aspx'; // endpoint GET trả JSON

  var xhr = new XMLHttpRequest();
  xhr.open('GET', GET_DIGEST_URL, true);
  xhr.withCredentials = true; // gửi cookie kèm request nếu cần

  xhr.onload = function() {
    if (xhr.status === 200) {
      try {
        const json = JSON.parse(xhr.responseText);
        const digest = json.formDigestValue; // chỉ lấy formDigestValue
        console.log('FormDigestValue:', digest);
      } catch(e) {
        console.error('Cannot parse response', e);
      }
    } else {
      console.error('GET failed with status', xhr.status);
    }
  };

  xhr.onerror = function() {
    console.error('Request error');
  };

  xhr.send();
})();
