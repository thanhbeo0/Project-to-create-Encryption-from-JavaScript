const ranpos = (ipt = "") => {
  if (ipt.length > 1) {
    let pos1, pos2;
    do {
      pos1 = Math.floor(Math.random() * ipt.length);
      pos2 = Math.floor(Math.random() * ipt.length);
    } while (pos1 === pos2);
    return [pos1, pos2];
  }
  return [0, 0];
};

const binary = (ipt = "") => {
  return ipt
    .split("")
    .map((v) => {
      return v.charCodeAt(0).toString(2).padStart(8, "0");
    })
    .join(" ");
};

const unbinary = (ipt = "") => {
  return ipt
    .split(" ")
    .map((v) => {
      return String.fromCharCode(parseInt(v, 2));
    })
    .join("");
};

const block = (ipt = "") => {
  let pos = ranpos(ipt);
  let arr = ipt.split("");
  let temp = arr[pos[0]];
  arr[pos[0]] = arr[pos[1]];
  arr[pos[1]] = temp;

  arr.push(pos[0], pos[1]);
  ipt = arr.join("");

  ipt = Buffer.from(encodeURIComponent(ipt)).toString("base64");
  let result = ipt.split("").map((v) => {
    let ascii = v.charCodeAt(0);
    v = ascii + 99;
    return String.fromCharCode(v);
  });
  return binary(result.reverse().join(""));
};

const unblock = (ipt = "") => {
  ipt = unbinary(ipt);
  ipt = ipt.split("").reverse();
  let result = ipt.map((v) => {
    let char = v.charCodeAt(0);
    char -= 99;
    return String.fromCharCode(char);
  });
  result = decodeURIComponent(Buffer.from(result.join(""), "base64").toString());
  result = result.split("");

  let pos2 = result.pop();
  let pos1 = result.pop();
  let temp = result[pos2];
  result[pos2] = result[pos1];
  result[pos1] = temp;

  return result.join("");
};

module.exports = { ranpos, binary, unbinary, block, unblock };
