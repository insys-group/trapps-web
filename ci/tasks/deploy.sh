#!/bin/sh

cd trapps-web-source
mkdir dist
cp index.html dist/index.html
ls -ll
pwd
mv dist ../../dist
cd ..
cd ..
mkdir put
mv dist put/dist
pwd
ls -ll