#!/bin/sh

cd trapps-web-source
npm install
npm install angular-cli
ng build --target=development --environment=dev