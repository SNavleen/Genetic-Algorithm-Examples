let population;
var pressed = 0;
var finsihed = false;
var defaultPhrase = "This is the default phrase!";

function setup () {
  noLoop();
}

function draw () {
  // Get the new generation
  if(population.best == null || population.getBestFitness() != 1) {
    finsihed = false;
    // console.log(population.getBest().print());
    population.newGeneration();

    // Draw the generation
    // console.log(population.print());
    document.getElementById("best").innerHTML = population.getBest().print();
    document.getElementById("averageFitness").innerHTML = Math.ceil(population.getAverageFitness() * 100) + " %";
    document.getElementById("population").innerHTML = population.print();
    document.getElementById("currentGeneration").innerHTML = population.getGenerations();
  } else {
    // console.log(population.getGenerations());
    finsihed = true;
    noLoop();
  }
}

function mousePressed(){
  if(finsihed) {
    start();
  }

  if(pressed % 2 == 0) {
    noLoop();
  } else {
    loop();
  }
  pressed ++;
}

function start() {
  var phrase = prompt("Please enter a phrase.", defaultPhrase);
  // var mutationRate = prompt("Please enter a mutation rate.", 0.1);
  // var populationSize = prompt("Please enter a population size.", 100);

  if (defaultPhrase != null) {
    defaultPhrase = phrase;
  }

  population = new Population(defaultPhrase, 0.01, 1000);
  loop();
}