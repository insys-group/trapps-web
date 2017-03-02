"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var rest_model_1 = require("../models/rest.model");
var PersontrainingService = (function () {
    function PersontrainingService(restService) {
        this.restService = restService;
    }
    PersontrainingService.prototype.getPersonTrainings = function () {
        return this.restService.getAll(rest_model_1.Locations.PERSON_TRAINING_URL);
    };
    PersontrainingService.prototype.getPersonTraining = function (id) {
        return this.restService.getOne("" + rest_model_1.Locations.PERSON_TRAINING_URL + id);
    };
    PersontrainingService.prototype.save = function (personTraining) {
        return this.restService.create(rest_model_1.Locations.PERSON_TRAINING_URL, personTraining);
    };
    PersontrainingService.prototype.remove = function (personTraining, person) {
        var index = person.personTrainings.indexOf(personTraining, 0);
        console.log("Index is " + index);
        if (index > -1) {
            person.personTrainings.splice(index, 1);
        }
        console.log("Person training length  is " + person.personTrainings.length);
        return this.updatePerson(person);
    };
    PersontrainingService.prototype.updatePerson = function (person) {
        return this.restService.put("" + rest_model_1.Locations.PERSON_UPDATE_URL + person.id, person);
    };
    PersontrainingService = __decorate([
        core_1.Injectable()
    ], PersontrainingService);
    return PersontrainingService;
}());
exports.PersontrainingService = PersontrainingService;
