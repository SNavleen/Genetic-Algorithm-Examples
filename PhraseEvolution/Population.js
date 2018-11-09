function rand(lo, hi) {
  var value = Math.random() * (hi - lo) + lo;
  return value;
}

class Population {
  constructor(answer, mutationRate = 0.1, populationSize = 1024) {
    this.mutationRate = mutationRate;
    this.answer = answer;
    this.populationSize = populationSize;

    this.generation = 0;
    this.best = null;

    this.population = [];
    for (let i = 0; i < populationSize; i++){
      this.population[i] = new Chromosomes(this.answer.length);
    }

    this.calculateFitness();
  }

  calculateFitness () {
    for (let i = 0; i < this.populationSize; i++) {
      this.population[i].calculateFitness(this.answer);
    }
    // console.log(this.population);
  }

  tournamentSelection(kParents) {
    var best = null;
    var bestIndex = 0;
    for (let i = 0; i < kParents; i++){
      var index = Math.round(rand(0, this.populationSize - 1));
      var individual = this.population[index];
      // console.log(individual);
      if ((best == null) || (individual.fitness > best.fitness)) {
        best = individual;
      }
    }
    // console.log(best);
    this.best = best;
    return best;
  }

  newGeneration() {
    var childrens = [];
    while (childrens.length != this.populationSize) {
      var parent1 = this.tournamentSelection(32);
      var parent2 = this.tournamentSelection(32);

      var children = parent1.crossover(parent2);
      // console.log(children);

      var child1 = children.child1;
      var child2 = children.child2;

      child1.mutate(this.mutationRate);
      child2.mutate(this.mutationRate);

      child1.calculateFitness(this.answer);
      child2.calculateFitness(this.answer);

      childrens.push(child1);
      childrens.push(child2);
    }
    this.population = childrens;
    this.generation ++;
    // console.log(this.generation);
    // console.log(this.population);
  }

  getBest() {
    return this.best;
  }
  getGenerations() {
    return this.generation;
  }
  getAverageFitness() {
    let total = 0;
    for (let i = 0; i < this.populationSize; i++) {
      total += this.population[i].fitness;
    }
    return total / (this.populationSize);
  }
  getBestFitness() {
    // console.log(this.best.fitness);
    return this.best.fitness;
  }

  print() {
    var populationOutput = "";

    for(let i = 0; i < this.populationSize; i++){
      populationOutput += this.population[i].print() + " <br>";
    }
    return populationOutput;
  }
  // finsihed(){
  //   return this.finsihed;
  // }
}