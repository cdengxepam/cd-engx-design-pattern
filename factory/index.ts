// Define the interface for all toy factories
interface ToyFactory {
    // Each factory should be able to create a toy
    createToy(): Toy;
  }
  
  // Define the interface for all toys
  interface Toy {
    // Each toy should be able to be sold
    sell(): void;
  }
  
  // Toy car factory that implements the ToyFactory interface
  class ToyCarFactory implements ToyFactory {
    // Implement the createToy method to create ToyCar objects
    createToy(): Toy {
      return new ToyCar();
    }
  }
  
  // Toy car class that implements the Toy interface
  class ToyCar implements Toy {
    // Implement the sell method to sell ToyCar objects
    sell(): void {
      console.log("One Toy Car sold!");
    }
  }
  
  // Toy plane factory that implements the ToyFactory interface
  class ToyPlaneFactory implements ToyFactory {
    // Implement the createToy method to create ToyPlane objects
    createToy(): Toy {
      return new ToyPlane();
    }
  }
  
  // Toy plane class that implements the Toy interface
  class ToyPlane implements Toy {
    // Implement the sell method to sell ToyPlane objects
    sell(): void {
      console.log("One Toy Plane sold!");
    }
  }
  
  // Barbie doll factory that implements the ToyFactory interface
  class BarbieDollFactory implements ToyFactory {
    // Implement the createToy method to create BarbieDoll objects
    createToy(): Toy {
      return new BarbieDoll();
    }
  }
  
  // Barbie doll class that implements the Toy interface
  class BarbieDoll implements Toy {
    // Implement the sell method to sell BarbieDoll objects
    sell(): void {
      console.log("One Barbie Doll sold!");
    }
  }
  
  // Construction toy factory that implements the ToyFactory interface
  class ConstructionToyFactory implements ToyFactory {
    // Implement the createToy method to create ConstructionToy objects
    createToy(): Toy {
      return new ConstructionToy();
    }
  }
  
  // Construction toy class that implements the Toy interface
  class ConstructionToy implements Toy {
    // Implement the sell method to sell ConstructionToy objects
    sell(): void {
      console.log("One Construction Toy sold!");
    }
  }
  
  // Sample usage of the factory pattern
  const toyFactories: ToyFactory[] = [
    new ToyCarFactory(),
    new ToyPlaneFactory(),
    new BarbieDollFactory(),
    new ConstructionToyFactory()
  ];
  
  for (const factory of toyFactories) {
    // Create a toy using the factory
    const toy: Toy = factory.createToy();
    
    // Sell the toy
    toy.sell();
  }