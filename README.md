Bower License
===================

Show a project's bower dependencies and their licenses

#Installation

```
npm install -g bower-license 

```
#Usage
Bower license comes in both command line and as a library:

```
var license = require('bower-license');
license.init('/path/to/package', function(licenseMap){
    console.log(licenseMap);
});
```
#Notes
Any asterisks (*) after a license value were implictly discovered/detected by their README or LICENSE file and may not be truly reliable.
