interface Round {
    getRadius(): number;
  }
  
  class RoundHole {
    constructor(private radius: number) {}
  
    getRadius(): number {
      return this.radius;
    }
  
    fits(peg: Round): boolean {
      return this.getRadius() >= peg.getRadius();
    }
  }
  
  class RoundPeg implements Round {
    constructor(private radius: number) {}
  
    getRadius(): number {
      return this.radius;
    }
  }
  
  class SquarePeg {
    constructor(private width: number) {}
  
    getWidth(): number {
      return this.width;
    }
  }
  
  class SquarePegAdapter extends RoundPeg {
    private peg: SquarePeg;
  
    constructor(peg: SquarePeg) {
      super(peg.getWidth());
      this.peg = peg;
    }
  
    getRadius(): number {
      return this.peg.getWidth() * Math.sqrt(2) / 2;
    }
  }
  
  const hole: RoundHole = new RoundHole(5);
  const rpeg: Round = new RoundPeg(5);
  hole.fits(rpeg); // true
  
  const smallSqpeg = new SquarePeg(5);
  const largeSqpeg = new SquarePeg(10);
  // This will not compile.
  // hole.fits(smallSqpeg);
  
  const smallSqpegAdapter: Round = new SquarePegAdapter(new SquarePeg(5));
  const largeSqpegAdapter: Round = new SquarePegAdapter(new SquarePeg(10));
  hole.fits(smallSqpegAdapter); // true
  hole.fits(largeSqpegAdapter); // false
  