"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var address_model_1 = require('./address.model');
var business_model_1 = require('./business.model');
var rest_model_1 = require('./rest.model');
var Person = (function (_super) {
    __extends(Person, _super);
    function Person() {
        _super.apply(this, arguments);
        this.business = new business_model_1.Business();
        this.address = new address_model_1.Address();
        this.personDocuments = [];
        this.personSkills = [];
        this.personTrainings = [];
    }
    return Person;
}(rest_model_1.RestResource));
exports.Person = Person;
var PersonSkill = (function (_super) {
    __extends(PersonSkill, _super);
    function PersonSkill() {
        _super.apply(this, arguments);
    }
    return PersonSkill;
}(rest_model_1.RestResource));
exports.PersonSkill = PersonSkill;
var PersonDocument = (function (_super) {
    __extends(PersonDocument, _super);
    function PersonDocument() {
        _super.apply(this, arguments);
    }
    return PersonDocument;
}(rest_model_1.RestResource));
exports.PersonDocument = PersonDocument;
var PersonType = (function () {
    function PersonType() {
    }
    PersonType.ALL = "All";
    PersonType.CLIENT = "Client";
    PersonType.EMPLOYEE = "Employee";
    PersonType.CANDIDATE = "Candidate";
    PersonType.PIVOTAL = "Pivotal";
    PersonType.PLABS = "Pivotal-Labs";
    PersonType.VENDOR = "Vendor";
    return PersonType;
}());
exports.PersonType = PersonType;
var PersonTraining = (function (_super) {
    __extends(PersonTraining, _super);
    function PersonTraining() {
        _super.apply(this, arguments);
        this.startDate = new Date().getDate();
        this.endDate = new Date().getDate();
        this.completedTasks = [];
    }
    return PersonTraining;
}(rest_model_1.RestResource));
exports.PersonTraining = PersonTraining;
var ProgressType = (function () {
    function ProgressType() {
    }
    ProgressType.NOT_STARTED = "NOT_STARTED";
    ProgressType.IN_PROGRESS = "IN_PROGRESS";
    ProgressType.COMPLETED = "COMPLETED";
    return ProgressType;
}());
exports.ProgressType = ProgressType;
