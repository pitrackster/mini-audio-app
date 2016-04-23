System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var Oscillator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Oscillator = (function () {
                function Oscillator() {
                }
                Oscillator.prototype.construct = function () {
                    console.log('osc constructed');
                };
                Oscillator.prototype.ngOnInit = function () {
                    this.waveform = "2";
                    this.gain = 1; // @TODO should be 1/nb osc-comp
                    // is this the true ADSR schema ? I doubt
                    this.ENV = {
                        attack: 2,
                        decay: 0.3,
                        sustain: 0,
                        release: 2 // seconds
                    };
                };
                Oscillator.prototype.getWaveformFromNumber = function (value) {
                    switch (value) {
                        case "1":
                            //console.log('must return a sine');
                            return "sine";
                        case "2":
                            //console.log('must return a square');
                            return "square";
                        case "3":
                            //console.log('must return a sawtooth');
                            return "sawtooth";
                        case "4":
                            //console.log('must return a triangle');
                            return "triangle";
                    }
                };
                Oscillator.prototype.updateWaveform = function (event) {
                    console.log('update waveform');
                    if (this.osc) {
                        this.osc.type = this.getWaveformFromNumber(this.waveform);
                    }
                };
                Oscillator.prototype.updateVolume = function () {
                    console.log('update volume');
                    if (this.vca) {
                        this.vca.gain.setValueAtTime(this.gain, this.ac.currentTime);
                    }
                };
                Oscillator.prototype.start = function (freq, output) {
                    console.log('start pressed');
                    // create a new oscillator
                    this.osc = this.ac.createOscillator();
                    this.vca = this.ac.createGain();
                    this.vca.connect(output);
                    this.osc.frequency.value = freq;
                    this.osc.type = this.getWaveformFromNumber(this.waveform);
                    this.osc.start(this.ac.currentTime);
                    this.osc.connect(this.vca);
                    // Silence oscillator gain
                    this.vca.gain.setValueAtTime(0, this.ac.currentTime);
                    // ATTACK
                    this.vca.gain.linearRampToValueAtTime(this.gain, this.ac.currentTime + this.ENV.attack);
                    // SUSTAIN
                    //this.vca.gain.cancelScheduledValues(this.ac.currentTime);
                    // once attack linear ramp is terminated (if time = this.ac.currentTime + this.ENV.attack + this.ENV.sustain) go to decay gain -> but does not work...
                    this.vca.gain.linearRampToValueAtTime(this.gain * this.ENV.decay, this.ac.currentTime + this.ENV.attack + this.ENV.sustain);
                };
                Oscillator.prototype.stop = function (output) {
                    console.log('stop');
                    // Clear previous envelope values -> make the RELEASE unefficient if i use the SUSTAIN linearRampToValueAtTime
                    // this.vca.gain.cancelScheduledValues(this.ac.currentTime);
                    // RELEASE
                    console.log(this.ac.currentTime + this.ENV.release);
                    console.log(this.ac.currentTime);
                    console.log(this.ENV.release);
                    this.vca.gain.linearRampToValueAtTime(0, this.ac.currentTime + this.ENV.release);
                    // Terminate after release
                    window.setTimeout(function () {
                        console.log(this.vca.gain.value);
                        // Stop oscillator
                        this.vca.gain.value = 0.0;
                        this.osc.stop(0);
                        /* disconnection */
                        this.osc.disconnect(this.vca);
                        this.vca.disconnect(output);
                        console.log('stop... for real');
                    }.bind(this), this.ENV.release * 1000);
                };
                __decorate([
                    // osc ADSR
                    core_1.Input(), 
                    __metadata('design:type', AudioContext)
                ], Oscillator.prototype, "ac", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Oscillator.prototype, "id", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', GainNode)
                ], Oscillator.prototype, "synthOut", void 0);
                Oscillator = __decorate([
                    core_1.Component({
                        selector: 'osc-comp',
                        templateUrl: './app/components/oscillator/oscillator.html',
                        directives: []
                    }), 
                    __metadata('design:paramtypes', [])
                ], Oscillator);
                return Oscillator;
            }());
            exports_1("Oscillator", Oscillator);
        }
    }
});
//# sourceMappingURL=oscillator.js.map