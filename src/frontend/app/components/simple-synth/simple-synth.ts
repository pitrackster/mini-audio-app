import {bootstrap}    from 'angular2/platform/browser';
import {Component, Input, ViewChildren, OnInit, QueryList} from 'angular2/core';
import {Oscillator} from '../oscillator/oscillator';
import {Keyboard} from '../keyboard/keyboard';
import {Voice} from '../../models/Voice';
//import {Note} from '../keyboard/models/Note';

@Component({
    selector: 'simple-synth-comp',
    templateUrl: './app/components/simple-synth/simple-synth.html',
    directives: [
        Oscillator,
        Keyboard
    ]
})

export class SimpleSynth implements OnInit {


    @Input()
    ac: AudioContext;

    //@ViewChildren(Oscillator)
    //oscComponents: QueryList<Oscillator>;

    protected voices: Array<Voice>;
    protected master: GainNode;
    //protected voice:Voice;

    ngOnInit() {

        this.voices = new Array<Voice>();
        // create master output vca / gain
        this.master = this.ac.createGain();
        this.master.connect(this.ac.destination);


    }

    ngAfterViewInit() {

    }

    noteOn(freq: number) {
        //console.log('simple synth play note at frequency called ' + freq);
        //console.log(this.notes);
        let voice = new Voice(this.ac, this.master);
        voice.start(freq);
        this.voices.push(voice);
    }

    noteOff(frequency) {
        console.log('simple synth note off called ');
        let toKeep = new Array<Voice>();

        for (var i = 0; i < this.voices.length; i++) {
            if (Math.round(this.voices[i].OSC1.frequency.value) === Math.round(frequency)) {
                this.voices[i].stop();
            } else {
                toKeep.push(this.voices[i]);
            }
        }
        this.voices = toKeep;
    }




}
