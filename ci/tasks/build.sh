#!/bin/sh

brew install npm
npm install angular-cli
npm install
cd trapps-web-source
ng build --target=development --environment=dev