let state = JSON.parse(sessionStorage.getItem("state"));
let element = document.getElementsByClassName("inventoryContainer")[0];
let isTrue = false;

let items = document.createElement("p");
items.innerHTML = "Your inventory:<br>";

// Map variable names to formatteed text
let inventoryItems = {
  'davidJobInfo': "David's job information - David has lost his job",
  'divorceLetter': "Divorce letter - David must have had issues with his wife",
  'gunKey': "Key - A silver key, it must open something around here",
  'gun': "Gun - A pistol with ammunition which could come in handy",
  'manifesto': "Manifesto - A political critique of Androids replacing humans"
};

// Loop through the inventory items
for (let key in inventoryItems) {
  if (state[key] === true) {
    items.innerHTML += `• ${inventoryItems[key]}<br>`;
    isTrue = true;
  }
}
element.appendChild(items);

// Inventory is empty
if (!isTrue) {
	element.innerHTML = "<p>You have nothing in your inventory.</p>"; 
} 
	
