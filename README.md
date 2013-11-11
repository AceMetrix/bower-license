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
