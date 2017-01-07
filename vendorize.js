var packages = require('./vendors');

var debug = false;
var origModSearch = Duktape.modSearch;

Duktape.modSearch = function(id, require, exports, module) {
	if (packages[id]) {
		var result = packages[id];
		if (debug) console.log('Loading vendor module: ' + id);
		for (var mod in result) {
			if (debug) console.log('Mapping export: ' + mod);
			exports[mod] = result[mod];
		}
	} else {
		if (debug) console.log('Loading other module: ' + id);
		return origModSearch(id, require, exports, module);
	}
};
