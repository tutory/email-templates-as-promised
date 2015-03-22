'use strict';

var emailTemplates = require('email-templates');
var Promise = require('promise');

var parsedTemplates = {};
function init(templatesDir, options) {
  if (parsedTemplates[templatesDir]) {
    return Promise.resolve(parsedTemplates[templatesDir]);
  }
  return new Promise(function(resolve, reject) {
    emailTemplates(templatesDir, options, function(err, template) {
      if (err) {
        return reject(err);
      }
      parsedTemplates[templatesDir] = template;
      resolve(template);
    });
  });
}

function render(templatesDir, options, templateName, locals) {
  return init(templatesDir, options).then(function(template) {
    return new Promise(function(resolve, reject) {
      template(templateName, locals, function(err, html, text) {
        if (err) {
          return reject(err);
        }
        resolve({
          html: html,
          text: text
        });
      });
    });
  });
}

module.exports = function(templatesDir, options) {
  return function(templateName, locals) {
    return render(templatesDir, options || {}, templateName, locals);
  };
};
