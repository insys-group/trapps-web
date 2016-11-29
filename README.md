# trapps-web
Static web application based on angular 2 to support TRAPPS API's in browser.

Angular cli has been added to the application.

## Install npm
brew install npm

## Install angular cli 
npm install -g angular-cli

## Run application
ng serve --host 0.0.0.0 --port 4201 --live-reload-port 49153


This application will have following hierarchy for models, components and services.

### Compoenents
/app/components 
/app/components/businesses     
/app/components/roles  
/app/components/persons 
/app/components/addresses 

### Services
/app/services 
/app/services/person.service  
/app/services/address.service  
/app/services/business.service  

### Models
/app/models 
/app/models/person.model 
/app/models/business.model  
/app/models/address.model 

## Adding a new component
Go into the target component folder e.g. /app/components/roles  
Execute angular cli command <code>ng g component role-list</code>

## Adding a new service
Go into /app/services folder  
Create service class  
Add entry in the providers array in the file /app/app.module.ts  

## Adding a new model
Go into the folder /app/models  
Create the file containing the model classes(s)  

## Add a new route  
Add a route entry in the routes array in the file /app/app-routing.module.ts.  

