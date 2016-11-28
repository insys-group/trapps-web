# trapps-web
Static web application based on angular 2 to support TRAPPS API's in browser.

Angular cli has been added to the application.

## Install npm
brew install npm

## Install angular cli 
npm install -g angular-cli

## Run application
ng serve --host 0.0.0.0 --port 4201 --live-reload-port 49153

## Add new component
ng g component component_name

This application will have components for each domain and these components will go inside its own folder under app,

/app
/app/business    
/app/opportunity  
/app/person

