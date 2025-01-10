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

function binary(ipt=""){
  return ipt.split("").map(v=>{
    return v.charCodeAt(0).toString(2).padStart(8,'0');
  }).join(' ');
}

function unbinary(ipt=""){
  return ipt.split(" ").map(v=>{
    return String.fromCharCode(parseInt(v,2));
  }).join("");
}

function block(ipt="",key=""){
  key = key.split("").map(v=>{
    return String.fromCharCode(v.charCodeAt(0)+100);
  }).join("");
  let pos = swappos(ipt);
  ipt=ipt.split("");
  for(let i=0;i<ipt.length;i++){
    [ipt[i],ipt[pos[i]]] = [ipt[pos[i]],ipt[i]];
  }
  ipt.unshift(key);
  ipt.push(JSON.stringify(pos)); // lưu trữ các pos để các thể dùng để giải mã
  ipt = ipt.join("");
  ipt = btoa(unescape(encodeURIComponent(ipt)));
  let result = ipt.split("").map(v=>{
    return String.fromCharCode(v.charCodeAt(0) + 99);
  });
  return binary(result.reverse().join(""));
}

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

self.block = block;self.unblock = unblock;self.binary = binary;self.unbinary = unbinary;self.swappos = swappos;
