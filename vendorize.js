var packages = require('./vendors');

var origModSearch = Duktape.modSearch;
Duktape.modSearch = function(id, require, exports, module) {
	if (!packages[id]) return origModSearch(id, require, exports, module);
	module.exports = packages[id];
};
