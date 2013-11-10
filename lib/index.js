var treeify = require('treeify');
var bowerJson = require('bower-json');
var fs = require('fs');
var _ = require('underscore');
var npmLicense = require('npm-license');
var path = require('path');

var output = {};
exports.init = function(options, callback){
    options = _.extend({}, options, {directory: 'bower_components'});
    // read .bowerrc
    if (fs.existsSync('.bowerrc')){
        try {options = JSON.parse(fs.readFileSync('.bowerrc'))}
        catch(e){}
    }
    // check each bower package recursively
    var packages = fs.readdirSync(options.directory);
    packages.forEach(function(package){
        bowerJson.find(path.resolve(options.directory, package), function(err, filename){
            bowerJson.read(filename, function(err, json){
                output[json.name + '@' + json.version] = {license: json.license};
                // todo: enhance the results with npm-license license detection
                if (Object.keys(output).length === packages.length){
                    callback(output);
                }
            });
        });
    });
}
exports.print = function(sorted){
    console.log(treeify.asTree(sorted, true));
}
