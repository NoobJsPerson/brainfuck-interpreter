function wait(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n);
    });
}
const einput = document.getElementById("input"),
      isASCII = document.getElementById("isASCII").checked,
      tr = document.getElementById("cellsholder");
function interpretate(){
  let output = "",
      cells = [],
      ptr = 0;
  for(let child of tr.children) child.innerHTML = "0";
  async function run(input = einput.value){
  let index = -1,
      continuumAmount = 0;
  for(let char of input){
    if(!cells[ptr]) cells[ptr] = 0;
    index++
    if(continuumAmount > 0){
      continuumAmount--;
      continue;
    }
    switch(char){
      case ">":
        ptr++;
        break;
      case "<":
        ptr--;
        break;
      case ".":
        output += String.fromCharCode(cells[ptr]);
        break;
      case "+":
        if(cells[ptr] < 255) cells[ptr] += 1;
        else cells[ptr] = 0;
        break;
      case "-":
        if(cells[ptr] > 0) cells[ptr] -= 1;
        else cells[ptr] = 255;
        break;
      case ",":
        const pinput = prompt("Enter Input Here","0");
        cells[ptr] = isASCII ? pinput.charCodeAt(0) : parseInt(pinput);
        break;
      case "[":
        let newInput = input.slice(index+1).split("]").slice(0,-1).join("]");
        continuumAmount = newInput.length +1;
        while(cells[ptr] !== 0){
          run(newInput);
        }
        break;
    }
      while(!tr.children[ptr]){
        const th = document.createElement("th");
        tr.appendChild(th);
      }
      tr.children[ptr].innerHTML = cells[ptr] || 0;
      await wait(2)
  }
  document.getElementById("output").value = output;
  }
  run();
}