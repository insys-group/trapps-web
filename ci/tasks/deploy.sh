#!/bin/sh

cd trapps-web-source
mkdir dist
cp index.html dist/index.html
cp index.html dist/index2.html
cp index.html dist/index3.html
cp dist ../dist

cd ..
cd dist
ls -ll

echo "Done packaging"
exit 0