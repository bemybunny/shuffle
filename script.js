let error = 0;
let cardList = [
  "darkness",
  "double",
  "fairy",
  "fighting",
  "fire",
  "grass",
  "lightning",
  "metal",
  "water",
  "psychic",
];

let rows = 4;
let col = 5;

window.onload = function () {
  shuffleCard();
  startGame();
};

let cardSet;
function shuffleCard() {
  cardSet = cardList.concat(cardList);
  console.log(cardSet);
  for (let i = 0; i < cardSet.length; i++) {
    let j = Math.floor(Math.random() * cardSet.length);
    let temp = cardSet[i];
    cardSet[i] = cardSet[j];
    cardSet[j] = temp;
  }
  console.log(cardSet);
}
let board = [];
function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < col; c++) {
      let cardImg = cardSet.pop();
      row.push(cardImg);
      let card = document.createElement("img");
      card.id = r.toString() + "-" + c.toString();
      card.src = cardImg + ".jpg";
      card.classList.add("card");
      card.addEventListener("click", selectCard);
      document.getElementById("board").append(card);
    }
    board.push(row);
  }
  console.log(board);
  setTimeout(hideCard, 1000);
}
function hideCard() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < col; c++) {
      let card = document.getElementById(r.toString() + "-" + c.toString());
      card.src = "back.jpg";
    }
  }
}
var card1 = 0;
var card2 = 0;
function selectCard() {
  if (this.src.includes("back")) {
    if (!card1) {
      card1 = this;
      let coords = card1.id.split("-");
      let r=parseInt(coords[0]);
      let c=parseInt(coords[1]);
      card1.src=board[r][c]+".jpg";
    }
    else if(!card2 && this!=card1){
      card2=this;
      let coords=card2.id.split("-");
      let r=parseInt(coords[0]);
      let c=parseInt(coords[1]);
      card2.src=board[r][c]+".jpg";
      setTimeout(update,1000);
    }
  }
}
function update(){
  if(card1.src!=card2.src){
    card1.src="back.jpg";
    card2.src="back.jpg";
    error+=1;
    document.getElementById("error").innerText=error;
  }
  card1=0;
  card2=0;
  shuffleCard();
}
