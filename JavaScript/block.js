import {binary} from "./binary.js";
import {swappos} from "./swappos.js";

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

export {block};
