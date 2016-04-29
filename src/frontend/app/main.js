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
                    // https://en.wikipedia.org/wiki/Piano_key_frequencies
                    this.keys = [
                        { 'name': 'C1', 'frequency': 32.7032, 'class': 'key-white' },
                        { 'name': 'C#1', 'frequency': 34.6478, 'class': 'key-black' },
                        { 'name': 'D1', 'frequency': 36.7081, 'class': 'key-white' },
                        { 'name': 'D#1', 'frequency': 38.8909, 'class': 'key-black' },
                        { 'name': 'E1', 'frequency': 41.2034, 'class': 'key-white' },
                        { 'name': 'F1', 'frequency': 43.6535, 'class': 'key-white' },
                        { 'name': 'F#1', 'frequency': 46.2493, 'class': 'key-black' },
                        { 'name': 'G1', 'frequency': 48.9994, 'class': 'key-white' },
                        { 'name': 'G#1', 'frequency': 51.9131, 'class': 'key-black' },
                        { 'name': 'A1', 'frequency': 55.0000, 'class': 'key-white' },
                        { 'name': 'A#1', 'frequency': 58.2705, 'class': 'key-black' },
                        { 'name': 'B1', 'frequency': 61.7354, 'class': 'key-white' },
                    ];
                    /*
                    G7 	3135.96
                    82 	f♯′′′′/g♭′′′′ 	F♯7/G♭7 	2959.96
                    81 	f′′′′ 	F7 	2793.83
                    80 	e′′′′ 	E7 	2637.02
                    79 	d♯′′′′/e♭′′′′ 	D♯7/E♭7 	2489.02
                    78 	d′′′′ 	D7 	2349.32
                    77 	c♯′′′′/d♭′′′′ 	C♯7/D♭7 	2217.46
                    76 	c′′′′ 4-line octave 	C7 Double high C 	2093.00
                    75 	b′′′ 	B6 	1975.53
                    74 	a♯′′′/b♭′′′ 	A♯6/B♭6 	1864.66
                    73 	a′′′ 	A6 	1760.00
                    72 	g♯′′′/a♭′′′ 	G♯6/A♭6 	1661.22
                    71 	g′′′ 	G6 	1567.98
                    70 	f♯′′′/g♭′′′ 	F♯6/G♭6 	1479.98
                    69 	f′′′ 	F6 	1396.91
                    68 	e′′′ 	E6 	1318.51
                    67 	d♯′′′/e♭′′′ 	D♯6/E♭6 	1244.51
                    66 	d′′′ 	D6 	1174.66
                    65 	c♯′′′/d♭′′′ 	C♯6/D♭6 	1108.73
                    64 	c′′′ 3-line octave 	C6 Soprano C (High C) 	1046.50
                    63 	b′′ 	B5 	987.767
                    62 	a♯′′/b♭′′ 	A♯5/B♭5 	932.328
                    61 	a′′ 	A5 	880.000
                    60 	g♯′′/a♭′′ 	G♯5/A♭5 	830.609
                    59 	g′′ 	G5 	783.991
                    58 	f♯′′/g♭′′ 	F♯5/G♭5 	739.989
                    57 	f′′ 	F5 	698.456
                    56 	e′′ 	E5 	659.255 	E
                    55 	d♯′′/e♭′′ 	D♯5/E♭5 	622.254
                    54 	d′′ 	D5 	587.330
                    53 	c♯′′/d♭′′ 	C♯5/D♭5 	554.365
                    52 	c′′ 2-line octave 	C5 Tenor C 	523.251
                    51 	b′ 	B4 	493.883
                    50 	a♯′/b♭′ 	A♯4/B♭4 	466.164
                    49 	a′ 	A4 A440 	440.000 	A 	A 			High A (Optional)
                    48 	g♯′/a♭′ 	G♯4/A♭4 	415.305
                    47 	g′ 	G4 	391.995
                    46 	f♯′/g♭′ 	F♯4/G♭4 	369.994
                    45 	f′ 	F4 	349.228
                    44 	e′ 	E4 	329.628 					High E
                    43 	d♯′/e♭′ 	D♯4/E♭4 	311.127
                    42 	d′ 	D4 	293.665 	D 	D
                    41 	c♯′/d♭′ 	C♯4/D♭4 	277.183
                    40 	c′ 1-line octave 	C4 Middle C 	261.626
                    39 	b 	B3 	246.942 					B
                    38 	a♯/b♭ 	A♯3/B♭3 	233.082
                    37 	a 	A3 	220.000 			A
                    36 	g♯/a♭ 	G♯3/A♭3 	207.652
                    35 	g 	G3 	195.998 	G 	G 			G
                    34 	f♯/g♭ 	F♯3/G♭3 	184.997
                    33 	f 	F3 	174.614 				F (7 string)
                    32 	e 	E3 	164.814
                    31 	d♯/e♭ 	D♯3/E♭3 	155.563
                    30 	d 	D3 	146.832 			D 		D
                    29 	c♯/d♭ 	C♯3/D♭3 	138.591
                    28 	c small octave 	C3 	130.813 	C (5 string) 	C 		C (6 string)
                    27 	B 	B2 	123.471
                    26 	A♯/B♭ 	A♯2/B♭2 	116.541
                    25 	A 	A2 	110.000 					A
                    24 	G♯/A♭ 	G♯2/A♭2 	103.826
                    23 	G 	G2 	97.9989 			G 	G
                    22 	F♯/G♭ 	F♯2/G♭2 	92.4986
                    21 	F 	F2 	87.3071 	F (6 string)
                    20 	E 	E2 	82.4069 					Low E
                    19 	D♯/E♭ 	D♯2/E♭2 	77.7817
                    18 	D 	D2 	73.4162 				D
                    17 	C♯/D♭ 	C♯2/D♭2 	69.2957
                    16 	C great octave 	C2 Deep C 	65.4064 			C
                    15 	B͵ 	B1 	61.7354 					B (7 string)
                    14 	A♯͵/B♭͵ 	A♯1/B♭1 	58.2705 	B♭ (7 string)
                    13 	A͵ 	A1 	55.0000 				A
                    12 	G♯͵/A♭͵ 	G♯1/A♭1 	51.9131
                    11 	G͵ 	G1 	48.9994
                    10 	F♯͵/G♭͵ 	F♯1/G♭1 	46.2493
                
                    */
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