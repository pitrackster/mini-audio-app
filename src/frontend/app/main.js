System.register(['angular2/platform/browser', 'angular2/core', './components/simple-synth/simple-synth'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, core_1, simple_synth_1;
    var Main;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (simple_synth_1_1) {
                simple_synth_1 = simple_synth_1_1;
            }],
        execute: function() {
            Main = (function () {
                function Main() {
                    console.log('main constructor');
                    this.ac = new AudioContext();
                }
                Main.prototype.ngAfterViewInit = function () {
                    // viewChild is set
                    // this.synth.playNote(880);
                };
                __decorate([
                    core_1.ViewChild(simple_synth_1.SimpleSynth), 
                    __metadata('design:type', simple_synth_1.SimpleSynth)
                ], Main.prototype, "synth", void 0);
                Main = __decorate([
                    core_1.Component({
                        selector: 'main-app',
                        templateUrl: './app/main.html',
                        directives: [
                            simple_synth_1.SimpleSynth
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], Main);
                return Main;
            }());
            browser_1.bootstrap(Main, []);
        }
    }
});
//# sourceMappingURL=main.js.map