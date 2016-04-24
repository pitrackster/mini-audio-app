import {bootstrap}    from 'angular2/platform/browser';
import {Component, Input, ViewChildren, OnInit, QueryList} from 'angular2/core';
import {Oscillator} from '../oscillator/oscillator';

@Component({
  selector: 'simple-synth-comp',
  templateUrl: './app/components/simple-synth/simple-synth.html',
  directives: [
    Oscillator
  ]
})

export class SimpleSynth implements OnInit {


  @Input()
  ac: AudioContext;

  @ViewChildren(Oscillator)
  oscComponents: QueryList<Oscillator>;


  protected notes: Array<any>;
  protected master:GainNode;

  ngOnInit() {
    this.notes = Array();
    // create master output vca / gain
    this.master = this.ac.createGain();
    this.master.connect(this.ac.destination);
  }

  ngAfterViewInit() {
    //console.log(this.oscComponents.length);
    //console.log(this.osc);
  }

  noteOn(note: any) {
    console.log('simple synth play note called ' + note);
    console.log(this.notes);



    for (let osc of this.oscComponents.toArray()) {
      osc.start(note, this.master);
    }
  }

  noteOff(){
    console.log('simple synth note off called ');
    for (let osc of this.oscComponents.toArray()) {
      console.log('simple synth note off stop osc ');
      osc.stop(this.master);
    }
  }


}
