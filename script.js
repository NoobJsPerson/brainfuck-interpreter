const einput = document.getElementById("input"),
      isASCII = document.getElementById("isASCII").checked;
 let output = "",
      cells = [],
      ptr = 0;
function run(input = einput.value){
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
        cells[ptr] += 1;
        break;
      case "-":
        cells[ptr] -= 1;
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
  }
  document.getElementById("output").value = output
}