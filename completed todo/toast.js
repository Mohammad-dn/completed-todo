const toastifyElement = document.getElementById("alert");
toastify.style.display = "none";
const toastify = (msg) => {
  toastify.style.display = "flex";
  toastify.innerHTML = msg ;
toastifyElement.children[0].innerHTML=msg

};
// children and child nodes
