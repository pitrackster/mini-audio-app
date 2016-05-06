import {bootstrap}    from 'angular2/platform/browser';
import {Component, Input, OnInit, Output, EventEmitter} from 'angular2/core';
import {Note} from './models/Note';

@Component({
    selector: 'keyboard-comp',
    templateUrl: './app/components/keyboard/keyboard.html',
    styleUrls: ['./app/components/keyboard/keyboard.css'],
    directives: [

    ]
})

export class Keyboard {

    protected keys: Array<Note>;
    protected notes: Array<Note>;
    protected keysDown: Array<boolean>;

    @Output() noteOn: EventEmitter<any> = new EventEmitter();
    @Output() noteOff: EventEmitter<any> = new EventEmitter();


    /*
    // https://www.w3.org/2002/09/tests/keys.html
    // AZERTY
    'q' : 81 => C
    'z' : 90 => C#
    's' : 83 => D
    'e' : 69 => D#
    'd' : 68 => E
    'f' : 70 => F
    't' : 84 => F#
    'g' : 71 => G
    'y' : 89 => G#
    'h' : 72 => A
    'u' : 85 => A#
    'j' : 74 => B
    */
    constructor() {
        this.notes = [];
        this.keysDown = [];
        this.keys = [
          /*
            new Note('C1', 32.7032*3, 'key-white', 81),
            new Note('C#1', 34.6478*3, 'key-black', 90),
            new Note('D1', 36.7081*3, 'key-white', 83),
            new Note('D#1', 38.8909*3, 'key-black', 69),
            new Note('E1', 41.2034*3, 'key-white', 68),
            new Note('F1', 43.6535*3, 'key-white', 70),
            new Note('F#1', 46.2493*3, 'key-black', 84),
            new Note('G1', 48.9994*3, 'key-white', 71),
            new Note('G#1', 51.9131*3, 'key-black', 89),
            new Note('A1', 55.0000*3, 'key-white', 72),
            new Note('A#1', 58.2705*3, 'key-black', 85),
            new Note('B1', 61.7354*3, 'key-white', 74),

            new Note('C2', 32.7032*2, 'key-white', 81),
            new Note('C#2', 34.6478*2, 'key-black', 90),
            new Note('D2', 36.7081*2, 'key-white', 83),
            new Note('D#2', 38.8909*2, 'key-black', 69),
            new Note('E2', 41.2034*2, 'key-white', 68),
            new Note('F2', 43.6535*2, 'key-white', 70),
            new Note('F#2', 46.2493*2, 'key-black', 84),
            new Note('G2', 48.9994*2, 'key-white', 71),
            new Note('G#2', 51.9131*2, 'key-black', 89),
            new Note('A2', 55.0000*2, 'key-white', 72),
            new Note('A#2', 58.2705*2, 'key-black', 85),
            new Note('B2', 61.7354*2, 'key-white', 74),
*/

/*
            new Note('C3', 32.7032*3, 'key-white', 81),
            new Note('C#3', 34.6478*3, 'key-black', 90),
            new Note('D3', 36.7081*3, 'key-white', 83),
            new Note('D#3', 38.8909*3, 'key-black', 69),
            new Note('E3', 41.2034*3, 'key-white', 68),
            new Note('F3', 43.6535*3, 'key-white', 70),
            new Note('F#3', 46.2493*3, 'key-black', 84),
            new Note('G3', 48.9994*3, 'key-white', 71),
            new Note('G#3', 51.9131*3, 'key-black', 89),
            new Note('A3', 55.0000*3, 'key-white', 72),
            new Note('A#3', 58.2705*3, 'key-black', 85),
            new Note('B3', 61.7354*3, 'key-white', 74),
*/

            new Note('C4', 32.7032*4, 'key-white', 81),
            new Note('C#4', 34.6478*4, 'key-black', 90),
            new Note('D4', 36.7081*4, 'key-white', 83),
            new Note('D#4', 38.8909*4, 'key-black', 69),
            new Note('E4', 41.2034*4, 'key-white', 68),
            new Note('F4', 43.6535*4, 'key-white', 70),
            new Note('F#4', 46.2493*4, 'key-black', 84),
            new Note('G4', 48.9994*4, 'key-white', 71),
            new Note('G#4', 51.9131*4, 'key-black', 89),
            new Note('A4', 55.0000*4, 'key-white', 72),
            new Note('A#4', 58.2705*4, 'key-black', 85),
            new Note('B4', 61.7354*4, 'key-white', 74)
        ];
    }

    emitNoteOn(note: Note) {
        this.noteOn.next(note);
    }

    emitNoteOff(note: Note) {
        this.noteOff.next(note);
    }


    handleKeyDown($event) {

        if ($event.keyCode in this.keysDown) {
            return;
        }

        if (!$event.repeat) {
            this.keysDown[$event.keyCode] = true;
            let note = this.findNoteFromKeyCode($event.keyCode);
            if (note) this.noteOn.next(note);
        }
    }

    handleKeyUp($event) {
        let note = this.findNoteFromKeyCode($event.keyCode);
        if (note) this.noteOff.next(note);
        delete this.keysDown[$event.keyCode];
    }

    findNoteFromKeyCode(keyCode): Note {
        let note = this.keys.find(e => e.keyCode === keyCode);
        return note;
    }
}
