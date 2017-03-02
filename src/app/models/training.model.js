"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var rest_model_1 = require('./rest.model');
var address_model_1 = require('./address.model');
var Training = (function (_super) {
    __extends(Training, _super);
    function Training() {
        _super.apply(this, arguments);
        this.location = new address_model_1.Address();
        this.tasks = [];
        this.trainees = [];
    }
    return Training;
}(rest_model_1.RestResource));
exports.Training = Training;
var TrainingTask = (function (_super) {
    __extends(TrainingTask, _super);
    function TrainingTask() {
        _super.apply(this, arguments);
    }
    return TrainingTask;
}(rest_model_1.RestResource));
exports.TrainingTask = TrainingTask;
var Trainee = (function () {
    function Trainee() {
    }
    return Trainee;
}());
exports.Trainee = Trainee;
