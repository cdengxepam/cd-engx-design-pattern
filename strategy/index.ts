export class Accountant {
    calculate(calculateSalary:( level:string) => number, level:string): number {
      return calculateSalary(level)
    }
  }
  
  const LevelBonus = new Map(
    [
      ["A",0],
      ["B",1000],
      ["C",3000],
    ]
  )
  
  export class Staff {
    baseSalary=0;
    calculateSalary = (level:string): number => {
      return this.baseSalary + LevelBonus.get(level)!
    }
  }
  
  export class Developer extends Staff{
    constructor(){
      super()
      this.baseSalary = 5000
    }
  }
  
  export class QA extends Staff{
    constructor(){
      super()
      this.baseSalary = 4000
    }
  }
  
  export class BA extends Staff{
    constructor(){
      super()
      this.baseSalary = 4500
    }
  }