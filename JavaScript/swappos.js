function swappos(ipt=""){
  if(ipt.length < 1){
    return 1;
  }
  let pos=Array.from({length: ipt.length}, (_,i)=>i);
  for(let i=pos.length-1;i>0;i--){
    let j = Math.floor(Math.random() * (i+1));
    [pos[i], pos[j]] = [pos[j], pos[i]];
  }
  return pos;
}
export swappos;
