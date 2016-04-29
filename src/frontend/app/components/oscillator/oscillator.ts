import {bootstrap}    from 'angular2/platform/browser';
import {Component, Input, OnInit, ViewChild} from 'angular2/core';
import {Envelope} from '../envelope/envelope';

@Component({
  selector: 'osc-comp',
  templateUrl: './app/components/oscillator/oscillator.html',
  directives: [
    Envelope
  ]
})

export class Oscillator implements OnInit {

  protected vca: GainNode; //osc output gain
  protected osc: any; // osc node
  protected waveform: number; // osc waveform
  protected gain: number;

  @Input() ac: AudioContext;
  @Input() id: string;
  @ViewChild(Envelope) ENV:Envelope;


  construct() {
    console.log('osc constructed');
  }

  ngOnInit() {
    this.waveform = 2;
    this.gain = 1; // @TODO should be 1/nb osc-comp
    this.osc = null;
  }

  getWaveformFromNumber(value) {
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
  }

  updateWaveform(event) {
    console.log('update waveform');
    this.waveform = +this.waveform;

  }

  updateVolume() {
    console.log('update volume');
    this.gain = +this.gain;
  }

  start(freq, output:GainNode) {
    console.log('start pressed');
    // create a new oscillator
    this.osc = this.ac.createOscillator();
    this.vca = this.ac.createGain();
    this.vca.connect(output);
    this.osc.frequency.value = freq;
    this.osc.type = this.getWaveformFromNumber(this.waveform);
    this.osc.start(this.ac.currentTime);
    // Silence oscillator gain
    this.vca.gain.setValueAtTime(0, this.ac.currentTime);
    // ATTACK
    this.vca.gain.linearRampToValueAtTime(this.gain, this.ac.currentTime + this.ENV.attack);
    // SUSTAIN
    this.vca.gain.linearRampToValueAtTime(this.gain * this.ENV.sustain, this.ac.currentTime + this.ENV.attack + this.ENV.decay);
    this.osc.connect(this.vca);
  }

  stop(output:GainNode) {

    console.log('stop');
    // Clear previous envelope values
    this.vca.gain.cancelScheduledValues(this.ac.currentTime);
    // set osc gain to sustain value
    // this.vca.gain.setValueAtTime(this.gain * this.ENV.sustain, this.ac.currentTime);
    // RELEASE
    this.vca.gain.linearRampToValueAtTime(0, this.ac.currentTime + this.ENV.release);
    // Terminate after release
    window.setTimeout(function() {
      // Stop oscillator
      this.vca.gain.value = 0.0;
      if(this.osc) {
        this.osc.stop(0);
        this.osc.disconnect(this.vca);
        this.osc = null;
      }

      this.vca.disconnect(output);
      console.log('stop... for real');

    }.bind(this), this.ENV.release * 1000);
  }
}
