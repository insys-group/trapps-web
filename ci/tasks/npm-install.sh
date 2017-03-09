#!/bin/sh

cd trapps-web-source
npm install
npm install -g angular-cli
ng build --target=development --environment=dev
ls -ll
mv dist ../../dist
cd ..
cd ..
mkdir put
mv dist put/dist