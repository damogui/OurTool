var LuiDropDownList = require('../js/dropdownlist');
var LuiCheckBox = require('../js/checkbox');
var LuiWordSpeak = require("../js/wordspeak");
var LuiWordSpeak1 = require("../js/wordspeak1");
var LuiGuide=require("../js/guide");

function Lui() {
    //this.checkBox = null;
    // this.initWordSpeak();
};

Lui.prototype = {
    constructor: Lui,
    initTree: function (p) {
        var t = new LuiTree();
        return t.init(p);
    },
    initDropDownList: function (p) {
        var d = new LuiDropDownList();
        return d.init(p);
    },
    initCheckBox: function (p) {
        //声明一个适用于全局的checkbox对象
        if (!this.checkBox) {
            this.checkBox = new LuiCheckBox();
        }
        var c = new LuiCheckBox();
        return c.init(p);

    },
    initWordSpeak: function (p) {
        //声明一个适用于全局的wordspeak对象
        if (!this.wordspeak) {
            this.wordspeak = new LuiWordSpeak();
        }
        var c = new LuiWordSpeak();
        return c.init(p);
    },
    initWordSpeak1: function (p) {
        //声明一个适用于全局的wordspeak对象
        if (!this.wordspeak1) {
            this.wordspeak1 = new LuiWordSpeak1();
        }
        return this.wordspeak1.init(p);
    },
    initGuide:function(p){
        //声明一个适用于全局的checkbox对象
        if (!this.guide) {
            this.guide = new LuiGuide();
        }
        var c = new LuiGuide();
        return c.init();
    }
};

module.exports = Lui;
