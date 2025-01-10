function binary(ipt=""){
  return ipt.split("").map(v=>{
    return v.charCodeAt(0).toString(2).padStart(8,'0');
  }).join(' ');
}

export {binary};
