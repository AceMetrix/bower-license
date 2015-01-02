var treeify = require('treeify');
var bowerJson = require('bower-json');
var fs = require('fs');
var _ = require('underscore');
var npmLicense = require('npm-license');
var packageLicense = require('package-license');
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
    if (!fs.existsSync(options.directory)){
        throw 'Run bower install first';
    }
    var packages = fs.readdirSync(options.directory);
    packages.forEach(function(package){
        bowerJson.find(path.resolve(options.directory, package), function(err, filename){
            if (!filename){
                output[package] = {licenses: 'UNKNOWN'};
                return;
            }
            bowerJson.read(filename, function(err, bowerData){
                var moduleInfo = {licenses: []};
                if (bowerData.license) moduleInfo.licenses = moduleInfo.licenses.concat(bowerData.license);
                if (bowerData.repository) moduleInfo.repository = bowerData.repository
                if (bowerData.homepage) moduleInfo.homepage = bowerData.homepage;

                // enhance with npm-license
                npmLicense.init({start: path.resolve(options.directory, package)}, function(npmData){
                    output[bowerData.name + '@' + bowerData.version] = moduleInfo;

                    for (var packageName in npmData){
                        if (npmData[packageName].licenses && npmData[packageName].licenses !== 'UNKNOWN')
                            moduleInfo.licenses = moduleInfo.licenses.concat(npmData[packageName].licenses)
                        if (npmData[packageName].repository)
                            moduleInfo.repository = npmData[packageName].repository;
                    }

                    // enhance with package-license
                    var licenseFromFS = packageLicense(path.resolve(options.directory, package));
                    if (licenseFromFS) moduleInfo.licenses = moduleInfo.licenses.concat(licenseFromFS);

                    if (moduleInfo.licenses.length === 0){
                        moduleInfo.licenses = 'UNKNOWN';
                    } else {
                        // remove licenses with asterisk if the same license already exists
                        moduleInfo.licenses = _.filter(moduleInfo.licenses, function(license){
                            var iAsk =  license.indexOf('*');
                            return (
                                // return well defined licenses (without an asterisk)
                                iAsk == -1 ||  
                                // remove licenses with asterisk if the same license already exists
                                _.indexOf(moduleInfo.licenses, license.substring(0, iAsk)) < 0
                            ); 
                        });
                        
                        // remove duplicated licenses
                        moduleInfo.licenses = _.uniq(moduleInfo.licenses);
                    }
                    
                    // if licenses array only contains one license remove the array
                    if (_.isArray(moduleInfo.licenses) && moduleInfo.licenses.length === 1) 
                        moduleInfo.licenses = moduleInfo.licenses[0];

                    if (Object.keys(output).length === packages.length){
                        callback(output);
                    }
                });
            });
        });
    });
}
exports.printTree = function(sorted){
    console.log(treeify.asTree(sorted, true));
}
exports.printJson = function(sorted){
    console.log(JSON.stringify(sorted, null, 2));
}
