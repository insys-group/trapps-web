#!/bin/sh

cp trapps-web-source/index.html package-output/index.html
cp trapps-web-source/index.html package-output/index2.html
cp trapps-web-source/index.html package-output/index3.html
cd package-output
ls -ll
cd ..
ls -ll

echo "Done packaging"
exit 0