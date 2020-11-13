//  Global Variables
let dinoArray = [];
let output = '';
let human;

// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet; 
        this.where = where; 
        this.when = when; 
        this.fact = fact; 
        
        this.getOrigin = function () {
            return `Lived in ${this.where}`
        };
        this.getPeriod = function () {
            return `Lived in the ${this.when} time period`
        };
        this.getFact = function () {
            return `${this.fact}`
        }
}

// Create Dino Objects
const dino1 = new Dino("Triceratops",13000,114,"herbavor","North America","Late Cretaceous","First discovered in 1889 by Othniel Charles Marsh.");
const dino2 = new Dino("Tyrannosaurus Rex",11905,144,"carnivor","North America","Late Cretaceous","The largest known skull measures in at 5 feet long.");
const dino3 = new Dino("Anklyosaurus",10500,55,"herbavor","North America","Late Cretaceous","Anklyosaurus survived for approximately 135 million years.");
const dino4 = new Dino("Brachiosaurus",70000,372,"herbavor","North America","Late Jurasic","An asteroid was named 9954 Brachiosaurus in 1991");
const dino5 = new Dino("Stegosaurus",11600,79,"herbavor","North America, Europe, Asia","Late Jurasic to Early Cretaceous","The Stegosaurus had between 17 and 22 seperate places and flat spines.");
const dino6 = new Dino("Elasmosaurus",16000,59,"carnivor","North America","Late Cretaceous","Elasmosaurus was a marine reptile first discovered in Kansas.");
const dino7 = new Dino("Pteranodon",44,20,"carnivor","North America","Late Cretaceous","Actually a flying reptile, the Pteranodon is not a dinosaur.");
const dino8 = new Dino( "Pigeon",0.5,9,"herbavor","World Wide","Holocene","All birds are living dinosaurs.");

dinoArray.push(dino1,dino2,dino3,dino4,dino5,dino6,dino7,dino8);

// Create Human Object
function Human(species, weight, height, diet, fact) {
    Dino.call(this, species, weight, height, diet, fact);
}

Human.prototype = Object.create(Dino.prototype);
Human.prototype.constructor = Human;

// Dino Compare Method 1 Weight
Dino.prototype.compareWeight = function(human) {
    if(this.weight > human.weight) {
        return `${this.species} was ${this.weight - human.weight}lb heavier than you!`;
    } else if(this.weight === human.weight) {
        return `You weight the same as a ${this.species}!`;
    } else {
        return `You are heavier than a ${this.species}!`;
    }
};
    
// Dino Compare Method 2 Height
Dino.prototype.compareHeight = function(human) {
    if(this.height > human.height) {
        return `${this.species} was ${this.height - human.height} inches taller than you!`;
    } else if(this.height === human.height) {
        return `You are the same height as a ${this.species}.`;
    } else {
        return `You are taller than a ${this.species}!`;
    }
};
    
// Dino Compare Method 3 Diet
Dino.prototype.compareDiet = function(human) {
    if(this.diet === human.diet) {
        return `Looks like you have a similar diet to a ${this.species}. You are both happy ${this.diet}s.`;
    } else {
        return `${this.species} is a ${this.diet} you dont share a similar diet.`;
    }
}

// Create Random Fact to display
Dino.prototype.getRandomFact = function(human) {
    let randomNumber = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    let fact = "";
    if (this.species === "Pigeon") {
        return this.fact;
    }
    switch (randomNumber) {
        case 1:
            fact = this.compareWeight(human);
            break;
        case 2:
            fact = this.compareHeight(human);
            break;
        case 3:
            fact = this.compareDiet(human);
            break;
        case 4:
            fact = this.getOrigin();
            break;
        case 5:
            fact = this.getPeriod();
            break;
        case 6:
            fact = this.getFact();
            break;
    }
    return fact;
}

// Shuffle array helper function
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

// Take feet and inches and return a total inches amount helper function
const getHeightInInches = (feet, inches) => Number((feet * 12) + Number(inches));

// Hide form helper function
const removeForm = () => {
    document.getElementById("dino-compare").style.display = "none";
    document.getElementById("btn-refresh").style.display = "block";
}

// Page refresh helper function
const compareAgain = () =>  window.location.reload();

// Get form values
const compareFormData = () => {
    let name = document.querySelector('#name').value;
    let feet = document.querySelector('#feet').value;
    let inches = document.querySelector('#inches').value;  
    let getWeight = document.querySelector('#weight').value;
    let weight = Number(getWeight);
    let getDiet = document.querySelector('#diet').value;
    let diet = getDiet.toLowerCase();
    let height = getHeightInInches(feet, inches);    
    // Create human 
    human = new Human(name, weight, height, diet);
    // Generate HTML
    generateTiles(human);
    // Remove form from screen
    removeForm();
    return human;
};

// Generate Tiles
const generateTiles = (human) => {
    //Shuffle dino array 
    shuffle(dinoArray);
    // Place human in center
    dinoArray.splice(4, 0, human);
    // Loop through dinoArray and create HTML for dinos and human
    dinoArray.map(function (dinos) {
        if(dinos.constructor === Dino) {
            output += `
            <div class="grid-item">
                <h3>${dinos.species}</h3>
                <img src='images/${dinos.species.toLowerCase()}.png'>
                <p>${dinos.getRandomFact(human)}</p>
            </div> `
        } else if(dinos.constructor === Human) {
            output += `
            <div class="grid-item">
                <h3>Human</h3>
                <img src='images/human.png'>
                <p>${dinos.species}</p>
            </div>`   
        }
    });
    // Add tiles to DOM
    document.getElementById('grid').innerHTML = output;
}

// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click', compareFormData);

// Refresh Page to compare new human.
document.getElementById('btn-refresh').addEventListener('click', compareAgain);