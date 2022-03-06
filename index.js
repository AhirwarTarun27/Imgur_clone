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
    `https://api.unsplash.com/photos/?client_id=5-Zn9Ve50ZTGUw5OZYXRwpNl1GlbVDTCVuCm9D_jcfg&per_page=15&page=${pageNumber}`
  );

  let data = await res.json();
  console.log("data:", data);

  showImage(data);
};
// let data = JSON.parse(localStorage.getItem("ImageData"));

// showImage(data[0]);

loadImages();

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
    infoDiv.style.height = "60px";
    infoDiv.style.borderRadius = "0 0 5px 5px";
    infoDiv.style.margin = "-1.8% 0 0 0";

    let headingDiv = document.createElement("div");
    headingDiv.innerText = image.user.name;
    headingDiv.style.fontSize = ".9vw";
    headingDiv.style.color = "white";
    headingDiv.style.padding = "4% 0 0 4%";
    headingDiv.style.fontWeight = "600";

    let votesDiv = document.createElement("div");
    votesDiv.style.width = "90%";
    // votesDiv.style.border = "1px solid white"
    votesDiv.style.margin = "1% auto auto auto";
    votesDiv.style.display = "flex";
    votesDiv.style.justifyContent = "space-Between";

    let upVotesDiv = document.createElement("div");
    upVotesDiv.innerHTML = `<span class="material-icons-round">
                        thumb_up
                    </span>
                    <div> ${Math.round(Math.random() * 1000)} </div> `;

    let commentsDiv = document.createElement("div");
    commentsDiv.innerHTML = `<span class="material-icons-round">
                        <span class="material-icons-round">
                        chat_bubble
                        </span>
                    </span>
                    <div> ${Math.round(Math.random() * 100)} </div> `;

    let seenDiv = document.createElement("div");
    seenDiv.innerHTML = `<span class="material-icons-round">
                        <span class="material-icons-round">
                            visibility
                        </span>
                    </span>
                    <div> ${Math.round(Math.random() * 100)} </div> `;

    votesDiv.append(upVotesDiv, commentsDiv, seenDiv);

    infoDiv.append(headingDiv, votesDiv);

    Div.append(Img, infoDiv);

    container.insertAdjacentElement("beforeend", Div);
  });
}

function showData() {
  setTimeout(() => {
    pageNumber++;
    loadImages();
  }, 50);
}

window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  // console.log(document.documentElement);
  // console.log(scrollHeight, scrollTop, clientHeight);

  if (scrollTop + clientHeight + 20 >= scrollHeight) {
    showData();
  }
});

//////////Search engine/////////////////

let resultBox = document.querySelector(".searchResultDiv");
var timerId;

const results = async () => {
  resultBox.innerHTML = null;
  let inputVal = document.getElementById("inpBox").value;

  // console.log(inputVal);

  if (inputVal !== " ") {
    resultBox.style.display = "block";
  }

  if (inputVal == "") {
    resultBox.style.display = "none";
  }

  let res = await fetch(
    `https://serpapi.com/search.json?engine=google&q=${inputVal}&google_domain=google.com&gl=us&hl=en&api_key=bd06ca1cb7b7ecbac749df14a1a2e4a6fadb729a6013a8f7a64997cf764bfea5`
  );

  let data = await res.json();

  console.log(data);

  console.log(res);

  appendSearchRes(data.organic_results, data.related_questions);
};

function appendSearchRes(data, data1) {
  if (data) {
    data.forEach((el) => {
      // console.log(el.title);

      let div = document.createElement("div");
      div.textContent = el.title;
      div.style.fontSize = "1vw";
      div.style.color = "white";
      div.style.margin = "2%";
      div.style.textAlign = "center";
      div.style.fontWeight = "600";
      div.addEventListener("click", () => {
        serachPage(el.title);
      });

      resultBox.append(div);
    });
  }

  if (data1) {
    data1.forEach((el) => {
      // console.log(el.title);

      let div = document.createElement("div");
      div.textContent = el.questions;
      div.style.fontSize = "1vw";
      div.style.color = "white";
      div.style.textAlign = "center";
      div.style.fontWeight = "600";
      div.addEventListener("click", () => {
        serachPage(el.questions);
      });

      resultBox.append(div);
    });
  }
}

function serachPage(data) {
  // console.log(data);

  if (localStorage.getItem("searchData") === null) {
    localStorage.setItem("searchData", JSON.stringify([]));
  }

  let dataArr = JSON.parse(localStorage.getItem("searchData"));

  dataArr = [];

  dataArr.push(data);

  localStorage.setItem("searchData", JSON.stringify(dataArr));

  window.location.href = "SearchResults.html";
}

function setDebouncing(func, delay) {
  if (timerId) {
    clearInterval(timerId);
  }

  timerId = setTimeout(() => {
    func();
  }, delay);
}
