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

  function getChildren(elementName) {
    var elements = filter(obj.types, function(type) {
      return type.superClass ? type.superClass.indexOf(elementName) !== -1 : false;
    });

    var children = pluck(elements, 'name');

    if(children.length !== 0) {
      console.log(elementName +": "+ children);
    }

    for (var i=0; i<elements.length; i++) {
      getChildren(elements[i].name);
    }

    return pluck(elements, 'name');
  }

  getChildren(elementName);
});
