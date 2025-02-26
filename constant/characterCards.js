function createCharacterCard(name, price, attack, hitPoints, icon) {
  return {
    name: name,
    price: price,
    attack: attack,
    hitPoints: hitPoints,
    icon: icon,
  };
}

const mite = createCharacterCard("Mite", 1, 1, 1, "Mite");
const spider = createCharacterCard("Spider", 1, 1, 2, "Spider");
const axolotl = createCharacterCard("Axolotl", 2, 1, 3, "Axolotl");
const pangolin = createCharacterCard("Pangolin", 1, 2, 1, "Pangolin");
const pegasus = createCharacterCard("Pegasus", 3, 2, 4, "Pegasus");
const bat = createCharacterCard("Bat", 0, 1, 1, "Bat");
const bear = createCharacterCard("Bear", 3, 3, 4, "Bear");
const bull = createCharacterCard("Bull", 3, 4, 3, "Bull");
const cricket = createCharacterCard("Cricket", 0, 1, 1, "Cricket");
const eagle = createCharacterCard("Eagle", 1, 2, 1, "Eagle");
const elephant = createCharacterCard("Elephant", 2, 2, 5, "Elephant");
const squid = createCharacterCard("Squid", 2, 3, 2, "Squid");
const gorilla = createCharacterCard("Gorilla", 2, 2, 4, "Gorilla");
const griffin = createCharacterCard("Griffin", 3, 3, 4, "Griffin");
const lynx = createCharacterCard("Lynx", 2, 2, 2, "Lynx");
const mantaRay = createCharacterCard("MantaRay", 1, 1, 2, "MantaRay");
const mantis = createCharacterCard("Mantis", 1, 2, 2, "Mantis");
const rhino = createCharacterCard("Rhino", 3, 3, 4, "Rhino");
const shark = createCharacterCard("Shark", 2, 3, 2, "Shark");
const tiger = createCharacterCard("Tiger", 2, 2, 2, "Tiger");
const crocJaws = createCharacterCard("CrocJaws", 3, 5, 1, "CrocJaws");
const lion = createCharacterCard("Lion", 2, 2, 2, "Lion");
const scorpion = createCharacterCard("Scorpion", 1, 1, 2, "Scorpion");
const serpent = createCharacterCard("Serpent", 2, 3, 2, "Serpent");
const werewolf = createCharacterCard("Werewolf", 2, 2, 3, "Werewolf");
const wolf = createCharacterCard("Wolf", 3, 4, 2, "Wolf");
const minotaur = createCharacterCard("Minotaur", 3, 2, 5, "Minotaur");
const angler = createCharacterCard("Angler", 1, 1, 2, "Angler");
const dinosaur = createCharacterCard("Dinosaur", 3, 2, 5, "Dinosaur");
const snake = createCharacterCard("Snake", 1, 2, 1, "Snake");
const rat = createCharacterCard("Rat", 0, 1, 1, "Rat");
const bee = createCharacterCard("Bee", 0, 1, 1, "Bee");
const crab = createCharacterCard("Crab", 0, 1, 1, "Crab");
const turtle = createCharacterCard("Turtle", 2, 1, 6, "Turtle");
const rock = createCharacterCard("Rock", 1, 0, 6, "Rock");
const stoneWall = createCharacterCard("StoneWall", 0, 0, 4, "StoneWall");
const fence = createCharacterCard("Fence", 0, 0, 3, "Fence");

const characterCards = [
  mite,
  spider,
  axolotl,
  pangolin,
  pegasus,
  bat,
  bear,
  bull,
  cricket,
  eagle,
  elephant,
  squid,
  gorilla,
  griffin,
  lynx,
  mantaRay,
  mantis,
  rhino,
  shark,
  tiger,
  crocJaws,
  lion,
  scorpion,
  serpent,
  werewolf,
  wolf,
  minotaur,
  angler,
  dinosaur,
  snake,
  rat,
  bee,
  crab,
  turtle,
  rock,
  stoneWall,
  fence,
];
