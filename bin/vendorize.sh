#!/usr/bin/env bash

file="./vendors.js"

# TODO: handle flipped `dependencies` and `devDependencies`
packages=$(
	sed -r -n -e '/dependencies/,/devDependencies/ p' package.json \
		| tail -n +2 \
		| head -n -2 \
		| sed -r 's;\s*"(.*)": "(.*)";\t"\1": require("\1");'
)

cat > $file << EOL
module.exports = {
$packages
};
EOL
