System.register(['angular2/core', '../envelope/envelope'], function(exports_1, context_1) {
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
    var core_1, envelope_1;
    var Oscillator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (envelope_1_1) {
                envelope_1 = envelope_1_1;
            }],
        execute: function() {
            Oscillator = (function () {
                function Oscillator() {
                }
                Oscillator.prototype.ngOnInit = function () {
                    this.waveform = 2;
                    this.gain = 1; // @TODO should be 1/nb osc-comp
                    this.osc = null;
                    this.detune = 0;
                };
                Oscillator.prototype.getWaveformFromNumber = function (value) {
                    switch (value) {
                        case 1:
                            //console.log('must return a sine');
                            return "sine";
                        case 2:
                            //console.log('must return a square');
                            return "square";
                        case 3:
                            //console.log('must return a sawtooth');
                            return "sawtooth";
                        case 4:
                            //console.log('must return a triangle');
                            return "triangle";
                    }
                };
                Oscillator.prototype.updateWaveform = function ($event) {
                    console.log('update waveform');
                    this.waveform = +this.waveform;
                };
                Oscillator.prototype.updateVolume = function ($event) {
                    console.log('update volume');
                    this.gain = +this.gain;
                };
                Oscillator.prototype.updateTune = function ($event) {
                    console.log('update tune');
                    this.detune = +this.detune;
                };
                Oscillator.prototype.start = function (freq, output) {
                    console.log('start pressed');
                    // create a new oscillator
                    this.osc = this.ac.createOscillator();
                    this.vca = this.ac.createGain();
                    this.vca.connect(output);
                    this.osc.frequency.value = freq;
                    this.osc.type = this.getWaveformFromNumber(this.waveform);
                    this.osc.detune.value = this.detune;
                    this.osc.start();
                    // Silence oscillator gain
                    this.vca.gain.setValueAtTime(0, this.ac.currentTime);
                    // ATTACK
                    this.vca.gain.linearRampToValueAtTime(this.gain, this.ac.currentTime + this.ENV.attack);
                    // SUSTAIN
                    this.vca.gain.linearRampToValueAtTime(this.gain * this.ENV.sustain, this.ac.currentTime + this.ENV.attack + this.ENV.decay);
                    // connect
                    this.osc.connect(this.vca);
                };
                Oscillator.prototype.stop = function (output) {
                    console.log('stop');
                    // Clear previous envelope values
                    this.vca.gain.cancelScheduledValues(this.ac.currentTime);
                    // set osc gain to sustain value
                    // this.vca.gain.setValueAtTime(this.gain * this.ENV.sustain, this.ac.currentTime);
                    // RELEASE
                    this.vca.gain.linearRampToValueAtTime(0, this.ac.currentTime + this.ENV.release);
                    // Terminate after release
                    window.setTimeout(function () {
                        // Stop oscillator
                        this.vca.gain.value = 0.0;
                        if (this.osc) {
                            this.osc.stop(0);
                            this.osc.disconnect(this.vca);
                            this.osc = null;
                            this.vca.disconnect(output);
                        }
                        console.log('stop... for real');
                    }.bind(this), this.ENV.release * 1000);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AudioContext)
                ], Oscillator.prototype, "ac", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Oscillator.prototype, "id", void 0);
                __decorate([
                    core_1.ViewChild(envelope_1.Envelope), 
                    __metadata('design:type', envelope_1.Envelope)
                ], Oscillator.prototype, "ENV", void 0);
                Oscillator = __decorate([
                    core_1.Component({
                        selector: 'osc-comp',
                        templateUrl: './app/components/oscillator/oscillator.html',
                        //styleUrls: ['./css/app.min.css'],
                        directives: [
                            envelope_1.Envelope
                        ]
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