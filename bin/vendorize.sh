#!/usr/bin/env bash

file="./vendors.js"

# TODO: handle flipped `dependencies` and `devDependencies`
packages=$(
	sed -r -n -e '/dependencies/,/devDependencies/ p' package.json \
		| head -2 \
		| tail -1 \
		| sed -r 's;\s*"(.*)": "(.*)",?;\t"\1": require("\1"),;'
)

echo "module.exports = {" > $file
echo "$packages" >> $file
echo "};" >> $file
