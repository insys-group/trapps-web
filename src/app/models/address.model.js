"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var rest_model_1 = require('./rest.model');
var Address = (function (_super) {
    __extends(Address, _super);
    function Address() {
        _super.apply(this, arguments);
    }
    //version: number;
    Address.getInstance = function () {
        var _address = new Address();
        _address.id = null;
        _address.address1 = '';
        _address.address2 = '';
        _address.city = '';
        _address.state = '';
        _address.zipCode = '';
        _address.country = '';
        return _address;
    };
    return Address;
}(rest_model_1.RestResource));
exports.Address = Address;
