#!/bin/sh

cp trapps-web-source/index.html package-output/index.html
cd package-output
ls -ll
cd ..
ls -ll

echo "Done packaging"
exit 0