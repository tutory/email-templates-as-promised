'use strict';

var expect = require('expect.js');
var emailTemplates = require('./');
var templatePath = __dirname;

var template = emailTemplates(templatePath);

describe('email-templates-as-promised', function() {
  it('should render', function() {
    return template('test', {
      name: 'heinz'
    }).then(function(res) {
      expect(res.text).to.be('hello heinz\n');
      expect(res.html).to.be('hello heinz\n');
    });
  });
});
