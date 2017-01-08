#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const pkg = require(path.resolve(__dirname, '../package.json'));

const outputFile = path.resolve(__dirname, '../vendors.js');

let packages = Object.keys(pkg.dependencies)
	.map((name) => {
		return `\t'${name}': require('${name}')`;
	});

const contents = `module.exports = {
${packages.join(',\n')}
};
`;

fs.writeFile(outputFile, contents, () => {});
