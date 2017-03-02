"use strict";
var environment_1 = require('../../environments/environment');
exports.Locations = {
    PERSON_URL: environment_1.environment.API_URL + 'persons/',
    PERSON_UPDATE_URL: environment_1.environment.API_URL + 'persons/put/',
    PERSON_DOCUMENT_URL: environment_1.environment.API_URL + 'persondocuments/',
    BUSINESS_URL: environment_1.environment.API_URL + 'businesses/',
    STATE_URL: environment_1.environment.API_URL + 'states/',
    INTERVIEW_URL: environment_1.environment.API_URL + 'interviews/',
    ROLE_URL: environment_1.environment.API_URL + 'roles/',
    TRAINING_URL: environment_1.environment.API_URL + 'trainings/',
    INTERVIEW_DETAILS_URL: environment_1.environment.API_URL + 'interview/',
    FEEDBACK_URL: environment_1.environment.API_URL + 'feedback/',
    INTERVIEW_TEMPLATE_URL: environment_1.environment.API_URL + 'interviewTemplates/'
};
var RestResource = (function () {
    function RestResource() {
    }
    return RestResource;
}());
exports.RestResource = RestResource;
var RestPageResource = (function () {
    function RestPageResource() {
    }
    return RestPageResource;
}());
exports.RestPageResource = RestPageResource;
var RestQuery = (function () {
    function RestQuery() {
    }
    return RestQuery;
}());
exports.RestQuery = RestQuery;
var Link = (function () {
    function Link() {
    }
    return Link;
}());
exports.Link = Link;
var UploadProgress = (function () {
    function UploadProgress() {
    }
    return UploadProgress;
}());
exports.UploadProgress = UploadProgress;
var ErrorResponse = (function () {
    function ErrorResponse(url, description, error) {
        this.url = url;
        this.description = description;
        this.error = error;
    }
    return ErrorResponse;
}());
exports.ErrorResponse = ErrorResponse;
/*
export class RestLocations {
  static PERSON_URL: string = 'http://localhost:8081/api/v1/persons/';
  static PERSON_UPDATE_URL: string = 'http://localhost:8081/api/v1/persons/put/';
  static PERSON_DOCUMENT_URL: string = 'http://localhost:8081/api/v1/persondocuments/';
  static BUSINESS_URL: string = 'http://localhost:8081/api/v1/businesses/';
}
*/
