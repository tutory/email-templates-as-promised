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
var render = emailTemplates(templatesDir, options);

var locals = { pasta: 'Spaghetti' };
var pastaDiner = render('pasta-dinner', locals).then(function(res) {
  // rendered templates
  // res == {
  //   html: '',
  //   text: ''
  // }
});
```

This way `render` function can easily be exported:

```javascript
//emails.js

var render = emailTemplates(templatesDir, options);

module.exports.pastaDinner = function(locals) {
  return render('pasta-dinner', locals);
};

// usage

var emails = require('./emails');

emails.pastaDiner({ pasta: 'Spagetti' }).then(function(res) {
  // do something
});
```

Rendered templates are also cached by `templatesDir`.
