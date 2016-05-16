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
                    this.detune = 0;
                    this.voices = new Array();
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
                    this.waveform = $event.target.valueAsNumber;
                };
                Oscillator.prototype.updateTune = function ($event) {
                    console.log('update tune');
                    this.detune = $event.target.valueAsNumber;
                };
                Oscillator.prototype.start = function (freq, volume, output) {
                    console.log('start pressed');
                    // create a new oscillator
                    var osc = this.ac.createOscillator();
                    var vca = this.ac.createGain();
                    vca.connect(output);
                    osc.frequency.value = freq;
                    osc.type = this.getWaveformFromNumber(this.waveform);
                    osc.detune.value = this.detune;
                    osc.start();
                    // Silence oscillator gain
                    vca.gain.setValueAtTime(0, this.ac.currentTime);
                    // ATTACK
                    vca.gain.linearRampToValueAtTime(volume, this.ac.currentTime + this.ENV.attack);
                    // SUSTAIN
                    vca.gain.linearRampToValueAtTime(volume * this.ENV.sustain, this.ac.currentTime + this.ENV.attack + this.ENV.decay);
                    // connect
                    osc.connect(vca);
                    var voice = { osc: osc, vca: vca };
                    this.voices[freq] = voice;
                };
                Oscillator.prototype.stop = function (freq, output) {
                    console.log('stop');
                    var voice = this.voices[freq];
                    if (voice) {
                        var vca_1 = voice.vca;
                        var osc_1 = voice.osc;
                        // Clear previous envelope values
                        vca_1.gain.cancelScheduledValues(this.ac.currentTime);
                        // set osc gain to sustain value
                        var gain = vca_1.gain.value;
                        vca_1.gain.setValueAtTime(gain * this.ENV.sustain, this.ac.currentTime);
                        // RELEASE
                        vca_1.gain.linearRampToValueAtTime(0, this.ac.currentTime + this.ENV.release);
                        // Terminate after release
                        window.setTimeout(function () {
                            // Stop oscillator
                            vca_1.gain.value = 0.0;
                            osc_1.stop(0);
                            osc_1.disconnect(vca_1);
                            osc_1 = null;
                            vca_1.disconnect(output);
                            console.log('stop... for real');
                            delete this.voices[freq];
                            vca_1 = null;
                        }.bind(this), this.ENV.release * 1000);
                    }
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