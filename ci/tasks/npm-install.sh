#!/bin/sh

cd trapps-web-source
npm install
npm install -g angular-cli
ng build --target=development --environment=dev
cp -a dist/. ../dist/

echo "Done packaging"
exit 0