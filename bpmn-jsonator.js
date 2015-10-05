var jsonfile = require('jsonfile');
var util = require('util');
var filter = require('lodash.filter');
var pluck = require('lodash.pluck');

if (!process.argv[2] || !process.argv[3]) {
  console.error('\nUsage: node bpmn-jsonator.js /path/to/bpmn.json element');
  return;
}

var file = process.argv[2];
var elementName = process.argv[3];

jsonfile.readFile(file, function(err, obj) {
  var types = obj.types;

  var elements = filter(types, function(type) {
    if (type.superClass) {
      return type.superClass.indexOf(elementName) !== -1;
    } else {
      return false;
    }
  });
  console.log(pluck(elements, 'name'));
});
