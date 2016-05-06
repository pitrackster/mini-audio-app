
export class Envelope  {

  public attack:number; // seconds
  public decay:number; // seconds after decay time sustain gain level will be applied
  public sustain:number; // gain value (0 <= value <= 1)
  public release:number;

  constructor(){
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
