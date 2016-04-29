import {bootstrap}    from 'angular2/platform/browser';
import {Component, Input, OnInit} from 'angular2/core';

@Component({
  selector: 'env-comp',
  templateUrl: './app/components/envelope/envelope.html',
  directives: [
  ]
})

export class Envelope implements OnInit {

  public attack:number; // seconds
  public decay:number; // seconds after decay time sustain gain level will be applied
  public sustain:number; // gain value (0 <= value <= 1)
  public release:number;

  ngOnInit() {
    this.attack = 0;
    this.decay = 0;
    this.sustain = 1;
    this.release = 0;
  }

  toNumber(){
    this.attack = +this.attack;
    this.decay = +this.decay;
    this.sustain = +this.sustain;
    this.release = +this.release;
  }

}
