[![Build Status](https://travis-ci.org/tutory/email-templates-as-promised.svg)](https://travis-ci.org/tutory/email-templates-as-promised)

# email-templates-as-promised
Promisified version of
[email-templates](https://github.com/niftylettuce/node-email-templates)

Instead of ...

```javascript
emailTemplates(templatesDir, options, function(err, template) {
  var locals = { pasta: 'Spaghetti' };
  template('pasta-dinner', locals, function(err, html, text) {
    // rendered templates
  });
});
```

... just do

```javascript
render = emailTemplates(templatesDir, options);

var locals = { pasta: 'Spaghetti' };
pastaDiner = render('pasta-dinner', locals).then(function(res) {
  // rendered templates
  // res == {
  //   html: '',
  //   text: ''
  // }
});
```

Rendered templates are cached by `templateDir`.
