var jsonfile = require('jsonfile');
var filter = require('lodash.filter');
var pluck = require('lodash.pluck');

var args = process.argv;

if (!args[2] || !args[3]) {
  console.error('\nUsage: node bpmn-jsonator.js /path/to/bpmn.json element');
  return;
}

var file = args[2];
var elementName = args[3];

jsonfile.readFile(file, function(err, obj) {
  var elements = filter(obj.types, function(type) {
    if (type.superClass) {
      return type.superClass.indexOf(elementName) !== -1;
    } else {
      return false;
    }
  });
  console.log(pluck(elements, 'name'));
});
