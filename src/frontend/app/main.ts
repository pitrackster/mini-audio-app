import {bootstrap}    from 'angular2/platform/browser';
import {Component, ViewChild} from 'angular2/core';

import {SimpleSynth} from './components/simple-synth/simple-synth';

@Component({
  selector: 'main-app',
  templateUrl: './app/main.html',
  directives: [
    SimpleSynth
  ]
})

class Main {

  @ViewChild(SimpleSynth) synth:SimpleSynth;

  protected ac: AudioContext;

  constructor() {

    console.log('main constructor');
    this.ac = new AudioContext();
  }

  
  ngAfterViewInit() {
    // viewChild is set
    // this.synth.playNote(880);
  }



}

bootstrap(Main, []);
