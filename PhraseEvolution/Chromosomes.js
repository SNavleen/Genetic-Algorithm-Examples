function randomChar() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .,?!";
  text = possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
function rand(lo, hi) {
  var value = Math.random() * (hi - lo) + lo;
  return value;
}

class Chromosomes{
  constructor(chromosomesLength) {
    this.genes = [];
    this.fitness = 0;
    for (let i = 0; i < chromosomesLength; i++) {
      this.genes[i] = randomChar()
    }
    // console.log(this.genes);
  }

  calculateFitness(expected) {
    var score = 0;
    for (let i = 0; i < this.genes.length; i++) {
      score += (this.genes[i] === expected.charAt(i)) ? 1 : 0;
    }
    // console.log(score / expected.length);
    this.fitness = score / expected.length;
  }

  crossover(parent) {
    // Create a child (aka offspring)
    let child1 = new Chromosomes(this.genes.length);
    let child2 = new Chromosomes(this.genes.length);

    // Find a random mid point of the first parent
    let mid = Math.round(rand(0, this.genes.length));
    // console.log(mid);

    for(let i = 0; i < this.genes.length; i++){
      if (i < mid) {
        child1.genes[i] = this.genes[i];
        child2.genes[i] = parent.genes[i];
      } else {
        child1.genes[i] = parent.genes[i];
        child2.genes[i] = this.genes[i];
      }
    }

    // console.log(child1.genes);
    // console.log(child2.genes);
    return {child1: child1, child2: child2};
  }

  // Based on a mutation probability, picks a new random character
  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      this.genes[i] = (Math.random(1) < mutationRate) ? randomChar() : this.genes[i];
    }
  }

  print() {
    // console.log(this.genes);
    return this.genes.join("");
  }
}