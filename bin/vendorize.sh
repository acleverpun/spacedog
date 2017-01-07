#!/usr/bin/env bash

file="./vendors.js"

echo "module.exports = {" > $file

sed -r -n -e '/dependencies/,/devDependencies/ p' package.json \
	| head -2 \
	| tail -1 \
	| sed -r 's;\s*"(.*)": "(.*)",?;\t"\1": require("\1"),;' \
	>> $file

echo "};" >> $file
