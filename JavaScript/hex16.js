function hex16(ipt = "") {
  return ipt.split("").map(v => {
    return "0x" + v.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0");
  }).join(" ");
}
export {hex16};
