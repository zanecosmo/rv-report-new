"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.extractForm = void 0;
var fs_1 = require("fs");
// UTILS
var extractForm = function (items, formType) {
    var categories = items.split("\r\n\r\n"); // entire category, including line-items and notes
    var categoriesArray = [];
    for (var i = 0; i < categories.length; i++) {
        var cat = categories[i];
        if (categories[i].split(" ")[0] === "**" && formType !== "motorhome")
            continue;
        var lineItems_1 = cat.split("\r\n"); // each line item, inlcuding title (first one) and notes
        if (lineItems_1.length === 0)
            continue;
        var category = lineItems_1.shift(); // title
        var rows = [];
        for (var i_1 = 0; i_1 < lineItems_1.length; i_1++) { // line-items and notes
            if (lineItems_1[i_1].split(" ")[0] === "--") {
                var notes = rows[rows.length - 1].notes;
                rows[rows.length - 1].notes = notes ? notes += " ".concat(lineItems_1[i_1]) : lineItems_1[i_1];
            }
            else {
                rows.push({
                    lineItem: lineItems_1[i_1],
                    pass: false,
                    fail: false,
                    notes: ""
                });
            }
            ;
        }
        ;
        categoriesArray.push({
            categoryName: category,
            rows: rows,
            notes: ""
        });
    }
    ;
    return categoriesArray;
};
exports.extractForm = extractForm;
// get file from line-items
var lineItems = fs_1["default"].readFileSync("../db/line-items.txt");
console.log(lineItems);
;
;
;
var isInputType = function (any) {
    return (typeof any === "string" || typeof any === "boolean" || any instanceof Date) ? true : false;
};
;
// TEST DATA
var testReport = {
    id: "",
    customerId: "",
    date: new Date(),
    form: [
        {
            categoryName: "electrical",
            rows: [
                {
                    lineItem: "plugs",
                    pass: false,
                    fail: false,
                    notes: ""
                },
                {
                    lineItem: "wires",
                    pass: false,
                    fail: false,
                    notes: ""
                }
            ],
            notes: ""
        },
        {
            categoryName: "hvac",
            rows: [
                {
                    lineItem: "vents",
                    pass: false,
                    fail: false,
                    notes: ""
                },
                {
                    lineItem: "duct-tape",
                    pass: false,
                    fail: false,
                    notes: ""
                }
            ],
            notes: ""
        }
    ]
};
// FUNCTIONS
var flatten = function (item, keyString) {
    var _a;
    if (keyString === void 0) { keyString = ""; }
    var result = {};
    if (Array.isArray(item)) {
        item.forEach(function (val, index) {
            var newKey = "".concat(keyString).concat(keyString === "" ? "" : ".").concat(index.toString());
            result = __assign(__assign({}, result), flatten(val, newKey));
        });
    }
    else if (typeof item === "object") { // 2
        var key = void 0;
        for (key in item) {
            var newKey = "".concat(keyString).concat(keyString === "" ? "" : ".").concat(key);
            result = __assign(__assign({}, result), flatten(item[key], newKey));
        }
        ;
    }
    else
        result = (_a = {}, _a[keyString] = item, _a);
    return result;
};
var embed = function (result, substrings, value) {
    var stringKey = substrings.shift();
    if (stringKey === undefined)
        return value;
    var position = parseInt(stringKey, 10);
    var isObject = isNaN(position);
    if (result === undefined)
        result = isObject ? {} : [];
    if (isObject) {
        result[stringKey] = embed(result[stringKey], substrings, value);
        return result;
    }
    else {
        result[position] = embed(result[position], substrings, value);
        return result;
    }
    ;
};
var unflatten = function (state) {
    var result = undefined;
    var key;
    for (key in state) {
        var value = state[key];
        var substrings = key.split(".");
        result = embed(result, substrings, value);
    }
    ;
    return result;
};
// console.log(flatten(testReport.form));
// TESTS
// const nested1 = [1, 2, 3, 4];
// const nested2 = [1, 2, {a: 1, b: 2}];
// const nested3 = {a: [{a: 1}, {a: 1}], b: 4};
// console.log(nested1);
// console.log(nested2);
// console.log(nested3);
// const flattened1 = flatten(nested1);
// const flattened2 = flatten(nested2);
// const flattened3 = flatten(nested3);
// console.log(flattened1); //   =>   { [0]: 1, [1]: 2, [2]: 3, [3]: 4 }
// console.log(flattened2); //   =>   { [0]: 1, [1]: 2, [2.a]: 1, [2.b]: 2 }
// console.log(flattened3); //   =>   { [a.0.a]: 1, [a.1.a]: 1, [b]: 4 }
// const unflattened1 = unflatten(flattened1);
// const unflattened2 = unflatten(flattened2);
// const unflattened3 = unflatten(flattened3);
// console.log(unflattened1);
// console.log(unflattened2);
// console.log(unflattened3);
