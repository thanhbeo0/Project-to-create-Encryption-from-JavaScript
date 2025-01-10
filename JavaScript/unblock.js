import {unbinary} from "./unbinary.js";

function unblock(ipt="",key=""){
  ipt = unbinary(ipt);
  ipt = ipt.split("").reverse();
  let result = ipt.map(v=>{
    let char = v.charCodeAt(0);
    char -= 99;
    return String.fromCharCode(char);
  });
  result = decodeURIComponent(escape(atob(result.join(""))));
  let index = result.lastIndexOf("[");
  let pos = JSON.parse(result.slice(index));
  let lengthkey = key.length;
  let keyl = result.slice(0,lengthkey);
  let data = result.slice(lengthkey,index);
  let keyx = keyl.split("").map((v) => {
    return String.fromCharCode(v.charCodeAt(0) - 100);
  }).join("");
  if(keyx !== key){
    return data;
  }
  let original = [...data];
  for(let i=pos.length-1;i>=0;i--){
    [original[i],original[pos[i]]] = [original[pos[i]],original[i]];
  }
  
  return original.join("");
}

export {unblock};
