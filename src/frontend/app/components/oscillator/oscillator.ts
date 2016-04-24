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
  protected waveform: string; // osc waveform
  protected gain: number;
  //protected ENV: any; // osc ADSR

  @Input() ac: AudioContext;
  @Input() id: string;
  @ViewChild(Envelope) ENV:Envelope;


  construct() {
    console.log('osc constructed');
  }

  ngOnInit() {
    this.waveform = "2";
    this.gain = 1; // @TODO should be 1/nb osc-comp
    // is this the true ADSR schema ? I doubt

    

  }

  getWaveformFromNumber(value) {
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
  }

  updateWaveform(event) {
    console.log('update waveform');
    if (this.osc) {
      this.osc.type = this.getWaveformFromNumber(this.waveform);
    }
  }

  updateVolume() {
    console.log('update volume');
    if (this.vca) {
      this.vca.gain.setValueAtTime(this.gain, this.ac.currentTime);
    }
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
    this.vca.gain.cancelScheduledValues(this.ac.currentTime);

    // ATTACK
    this.vca.gain.linearRampToValueAtTime(this.gain, this.ac.currentTime + this.ENV.attack);

    let now = this.ac.currentTime + this.ENV.attack;

    // SUSTAIN
    //this.vca.gain.cancelScheduledValues(this.ac.currentTime);
    // once attack linear ramp is terminated (if time = this.ac.currentTime + this.ENV.attack + this.ENV.sustain) go to sustain gain -> but does not work...
    this.vca.gain.linearRampToValueAtTime(this.gain * this.ENV.sustain, now + this.ENV.decay);

    this.osc.connect(this.vca);

  }

  stop(output:GainNode) {

    console.log('stop');

    // Clear previous envelope values -> make the RELEASE unefficient if i use the SUSTAIN linearRampToValueAtTime
    this.vca.gain.cancelScheduledValues(this.ac.currentTime);

    // RELEASE
    console.log(this.ac.currentTime + this.ENV.release);
    console.log(this.ac.currentTime);
    console.log(this.ENV.release);
    this.vca.gain.linearRampToValueAtTime(0, this.ac.currentTime + this.ENV.release);
    // Terminate after release
    window.setTimeout(function() {
      console.log(this.vca.gain.value);
      // Stop oscillator
      this.vca.gain.value = 0.0;
      this.osc.stop(0);

      /* disconnection */
      this.osc.disconnect(this.vca);
      this.vca.disconnect(output);
      console.log('stop... for real');

    }.bind(this), this.ENV.release * 1000);
  }
}
