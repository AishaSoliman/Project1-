var fetchedCourses;
const coursesOfCategories = new Map();
var categories;

async function getCourses() {
  const response = await fetch(
    "https://my-json-server.typicode.com/AishaSoliman/courses/courses",
    {
      //mode: "no-cors",
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  fetchedCourses = await response.json();
  displayCourses(fetchedCourses);
}

window.onload = async function () {
  await getCourses();
  console.log("fetchedCourses", fetchedCourses);
  await search();
  await getCategories();
  await displayCategories();
};

function displayCourses(courses) {
  var numOfCourses = 0;
  var table = "";
  var firstSlide = true;
  for (let course of courses) {
    if (firstSlide) {
      table += '<div class="carousel-item active">';
      firstSlide = false;
    } else {
      if (numOfCourses >= 3) {
        numOfCourses = 0;
      }
      if (numOfCourses == 0) {
        table += '<div class="carousel-item">';
      }
    }

    table += "<div class='course-container' id='course-container'>";
    table += "<div class='course-container-inner' id='course-container-inner'>";
    table += '<div id="course-image">';
    table +=
      '<img class="h" src="' +
      course.image +
      '" alt="course-python-logo" class="course-logo">';
    table += "</div>";
    table += '<div class="course-text"></br>';
    table +=
      '<span id="course-title"><h6>'
      course.title +
      "</h6></span>";
    table +=
      '<span id="course-author">' + course.auther + "</span>";
    table += "</div>" ;
    table +=
      '<div class="course-rating" id="course-rating">' +
      course.starRate +
      "</div>";
    table +=
      '<div id="course-students">' +
      course.students +
      "</div>";
    table += '<div id="course-price">' + course.price + "</div>";
    table += "</div>";
    table += "</div>";
    if (numOfCourses >= 2) {
      table += "</div>";
    }
    numOfCourses++;
  }
  document.getElementById("courses-container-inner").innerHTML = table;
}
function searchByTitle(searchString) {
  let filteredCourses = fetchedCourses.filter(function (course) {
    return course.title.includes(searchString);
  });
  displayCourses(filteredCourses);
}

async function search() {
  let searchButton = document.getElementById("search-button");
  searchButton.onclick = function () {
    let searchText = document.getElementById("search-input").value;
    console.log(searchText);
    searchByTitle(searchText);
  };
}

async function getCategories() {
  var duplicatedCategories = fetchedCourses.map(function (course) {
    return course.category;
  });
  if (duplicatedCategories != null) {
    categories = new Set(duplicatedCategories);
  }
}

async function displayCategories() {
  var table = "";

  for (let category of categories) {
    table += '<div class="links-body-child">';
    table +=
      '<input type="button" value="' +
      category +
      '" onclick="searchByCategory(this.value)">';
    table += "</div>";
  }

  document.getElementById("courses-categories").innerHTML = table;
}
function searchByCategory(category) {
  let filteredCourses = fetchedCourses.filter(function (course) {
    return course.category.includes(category);
  });
  displayCourses(filteredCourses);
}
