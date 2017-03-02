"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var rest_model_1 = require('./rest.model');
var Business = (function (_super) {
    __extends(Business, _super);
    function Business() {
        _super.apply(this, arguments);
    }
    return Business;
}(rest_model_1.RestResource));
exports.Business = Business;
var BusinessType = (function (_super) {
    __extends(BusinessType, _super);
    function BusinessType() {
        _super.apply(this, arguments);
    }
    BusinessType.ALL = "All";
    BusinessType.CLIENT = "Client";
    BusinessType.PLABS = "PivotalLabs";
    BusinessType.PIVOTAL = "Pivotal";
    BusinessType.VENDOR = "Vendor";
    BusinessType.INSYS = "INSYS";
    return BusinessType;
}(rest_model_1.RestResource));
exports.BusinessType = BusinessType;
