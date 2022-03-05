//Fix Navbar
const navBar = document.getElementById("navContainer");
const navHeight = navBar.getBoundingClientRect().height;
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fixNav");
  } else {
    navBar.classList.remove("fixNav");
  }
});

var pageNumber = 1;

const loadImages = async () => {
  let res = await fetch(
    `https://api.unsplash.com/photos/?client_id=W9oXcS9uP1Llfv6F09YQqEmPoK60oUMsro9bSjuA5dM&per_page=15&page=${pageNumber}`
  );

  let data = await res.json();

  console.log(data);

  showImage(data);
};
let data = JSON.parse(localStorage.getItem("ImageData"));

showImage(data[0]);

// loadImages()

function showImage(images) {
  const container = document.getElementById("imagesBox");

  images.forEach((image) => {
    let Div = document.createElement("div");
    Div.style.marginBottom = "6%";
    Div.style.borderRadius = "5px";

    let Img = document.createElement("img");
    Img.src = image.urls.small;

    let infoDiv = document.createElement("div");
    infoDiv.style.backgroundColor = "#474a51";
    infoDiv.style.width = "100%";
    infoDiv.style.height = "50px";
    infoDiv.style.borderRadius = "0 0 5px 5px";
    infoDiv.style.margin = "-1.8% 0 0 0";

    let headingDiv = document.createElement("div");

    Div.append(Img, infoDiv);

    container.insertAdjacentElement("beforeend", Div);
  });
}
