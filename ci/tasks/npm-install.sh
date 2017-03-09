#!/bin/sh

cd trapps-web-source
npm install
npm install -g angular-cli
ng build --target=development --environment=dev
cp dist ../dist

echo "Done packaging"
exit 0