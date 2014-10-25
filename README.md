Bower License
===================

Show a project's bower dependencies and their licenses

#Installation

```
npm install -g bower-license 

```
#Usage
Bower license comes in both command line and as an npm library:

```
bower-license

├─ highlight
│  └─ licenses: UNKNOWN
├─ bootstrap-daterangepicker@1.2.0
│  └─ licenses: MIT*
├─ js-signals@1.0.0
│  ├─ licenses: MIT*
│  └─ homepage: http://millermedeiros.github.com/js-signals/
├─ moment@2.4.0
│  └─ licenses: MIT*
├─ highcharts.com@3.0.7
│  ├─ licenses: UNKNOWN
│  └─ homepage: https://github.com/highslide-software/highcharts.com
├─ hasher@1.1.3
│  ├─ licenses: MIT*
│  └─ homepage: https://github.com/millermedeiros/Hasher
├─ jquery-throttle-debounce@undefined
│  ├─ licenses: MIT*
│  └─ homepage: https://github.com/cowboy/jquery-throttle-debounce
├─ jquery-deparam@0.2.0
│  ├─ licenses: MIT*
│  └─ repository: https://github.com/AceMetrix/jquery-deparam
├─ modernizr@2.6.2
│  ├─ licenses: MIT*
│  └─ homepage: https://github.com/Modernizr/Modernizr
├─ raphael@2.1.2
│  ├─ licenses: MIT*
│  └─ homepage: https://github.com/DmitryBaranovskiy/raphael
├─ es5-shim@2.1.0
│  ├─ licenses: MIT*
│  ├─ homepage: https://github.com/kriskowal/es5-shim
│  └─ repository: http://github.com/kriskowal/es5-shim
├─ jstree@2.0.0-alpha
│  ├─ licenses: MIT*
│  ├─ homepage: https://github.com/vakata/jstree
│  └─ repository: https://github.com/vakata/jstree
├─ meld@1.3.0
│  ├─ licenses
│  │  └─ 0: MIT
│  ├─ homepage: https://github.com/cujojs/meld
│  └─ repository: https://github.com/cujojs/meld
├─ keymaster@undefined
│  ├─ licenses: MIT*
│  ├─ homepage: https://github.com/madrobby/keymaster
│  └─ repository: https://github.com/madrobby/keymaster
├─ knockoutjs@2.3.0
│  ├─ licenses: MIT*
│  ├─ homepage: https://github.com/knockout/knockout
│  └─ repository: https://github.com/SteveSanderson/knockout
├─ jquery@1.8.3
│  └─ licenses
│     └─ 0: MIT
└─ sass-bootstrap@2.2.2
   ├─ licenses: Apache*
   └─ repository: https://github.com/twitter/bootstrap
```

Export options:

```
bower-license -e json
```

Used as a library:

```
var license = require('bower-license');
license.init('/path/to/package', function(licenseMap){
    console.log(licenseMap);
});
```


   
#Notes
Any asterisks (*) after a license value were implictly discovered/detected by their README or LICENSE file and may not be truly reliable.
