function unhex16(ipt=""){
  return ipt.split(" ").map(v=>{
    return String.fromCharCode(parseInt(v.slice(2),16));
  }).join("");
}
export {unhex16};
