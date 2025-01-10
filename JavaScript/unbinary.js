function unbinary(ipt=""){
  return ipt.split(" ").map(v=>{
    return String.fromCharCode(parseInt(v,2));
  }).join("");
}
