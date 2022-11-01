const cardlist = document.getElementsByClassName("card-item");
const ul = document.getElementById("card-ul");
let tS = [];

function addListItem() {
  const text = document.getElementById("text-input");

  // check if the item is already in the list and not empty
  // tS.forEach((element) => {
  //   if (text.value != element || text.value != "") {
  //     console.log("is not in ");
  //   } else {
  //     console.log("is in ");
  //   }
  // });
  if (text.value != "") {
    generateItem(text.value);
    addlocalStorage(tS);
    text.value = "";
  } else {
    alert("please enter a name for the item");
  }
}

function generateItem(text) {
  const li = document.createElement("li");
  let button = document.createElement("button");
  button.innerHTML = "X";
  button.onclick = function () {
    cardButtonClick(li);
    deleteItem(this);
  };
  li.classList.add("card-item");
  li.textContent = text;
  li.appendChild(button);
  ul.appendChild(li);
  tS.push(text);
}

let removeElement = (array, n) => {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== n) {
      newArray.push(array[i]);
    }
  }
  return newArray;
};

function cardButtonClick(item) {
  const stritem = item.textContent.slice(0, -1);
  const newArraytS = removeElement(tS, stritem);
  addlocalStorage(newArraytS);
}

function deleteItem(e) {
  e.parentNode.parentNode.removeChild(e.parentNode);
}

function addlocalStorage(allCards) {
  localStorage.clear();
  localStorage.setItem("allCards", JSON.stringify(allCards));
}

function getlocalStorage(allCards) {
  var retrievedObject = JSON.parse(localStorage.getItem(allCards));
  if (retrievedObject == null || retrievedObject == "") {
    alert("no local storage");
  } else {
    retrievedObject.forEach((element) => {
      generateItem(element);
    });
  }
}
