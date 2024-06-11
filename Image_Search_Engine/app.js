const accessKey = "8W9phM1Mtt1BwUwhLzoIscV400jWkUvmAKmhf1o2MDE";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const searchBtn = document.getElementById("search-btn");
const errorResult = document.getElementById("error-result");

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  //   console.log(data);

  if (page === 1) {
    searchResult.innerHTML = "";
    errorResult.innerHTML = "";
  }

  const results = data.results;
  if (results != "") {
    results.map((result) => {
      const image = document.createElement("img");
      image.src = result.urls.small;

      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.appendChild(image);
      searchResult.appendChild(imageLink);
    });
    showMoreBtn.style.display = "block";
  } else {
    const error = document.createElement("h1");
    error.innerText = "Opps Sorry!";
    error.style.color = "red";
    errorResult.appendChild(error);
    errorResult.style.display = "block";
    showMoreBtn.style.display = "none";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

searchBtn.addEventListener("submit", (e) => {
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});

// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
