#!/bin/sh

cd trapps-web-source
npm install
npm install -g angular-cli
ng build --target=development --environment=dev
ls -ll
mv dist ../../put/trapps-web-source/dist