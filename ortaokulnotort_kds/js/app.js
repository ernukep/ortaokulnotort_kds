let districtList = null;

let lastBarChart = null;
let lastPieChart = null;

document.addEventListener("DOMContentLoaded", createDropdownItems);

async function createDropdownItems() {
  const dropdownItems = document.querySelector("#dropdown-items");

  if (districtList == null) districtList = await getData("get-district-list");

  districtList.forEach((district) => {
    dropdownItems.innerHTML += `
      <li id="tab-${district.id}" class="dropdown-item" onclick="onClickHandler(${district.id})">
          <i class="bi bi-arrow-right"></i>
          <span>${district.district_name}</span>
      </li>`;
  });

  onClickHandler(0);
}

function onClickHandler(id) {
  changeMenuItem(id);
  changeContent(id);
}

function changeMenuItem(id) {
  const dropdownItemList = document.querySelectorAll(".dropdown-item");
  dropdownItemList.forEach((item) =>
    item.id == `tab-${id}`
      ? item.classList.add("active")
      : item.classList.remove("active")
  );
}

async function changeContent(id) {
  const title = document.querySelector("#title");
  const content = document.querySelector("#content");

  if (id == 0) {
    title.innerHTML = "Ana Sayfa";
    content.innerHTML = `<iframe width="100%" height="500px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&height=500px&hl=en&q=%C4%B0zmir+(%C4%B0zmir)&t=&z=11&ie=UTF8&iwloc=B&output=embed"></iframe>`;

    console.clear();
  } else {
    title.innerHTML = districtList[id - 1].district_name;
    content.innerHTML = `
    <ul id="year-tabs">
      <li id="y2023" class="year-tab" onclick="onClickHandlerForYear(${id}, 2023)">2023</li>
      <li id="y2022" class="year-tab" onclick="onClickHandlerForYear(${id}, 2022)">2022</li>
      <li id="y2021" class="year-tab" onclick="onClickHandlerForYear(${id}, 2021)">2021</li>
    </ul>
    <canvas id="barChart" width="100%" height="50px"></canvas>
    <canvas id="pieChart" width="100%" height="50px"></canvas>
    `;
    await onClickHandlerForYear(id, 2023);
  }
}

async function getData(url) {
  const hostUrl = "http://localhost/odev_dosyalari/api/";
  try {
    const response = await fetch(hostUrl + url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

async function onClickHandlerForYear(id, year) {
  changeMenuItemForYear(id, year);
}

async function changeMenuItemForYear(id, year) {
  const dropdownItemList = document.querySelectorAll(".year-tab");
  dropdownItemList.forEach((item) =>
    item.id == `y${year}`
      ? item.classList.add("active")
      : item.classList.remove("active")
  );
  await createChart(id, year);
}

async function createChart(id, year) {
  if (lastBarChart !== null) lastBarChart.destroy();
  if (lastPieChart !== null) lastPieChart.destroy();

  const data = await getData(`get-exam-grade?district_id=${id}&year=${year}`);

  lastBarChart = createBarChart(data);
  lastPieChart = createPieChart(data);
}

function createBarChart(data) {
  const barChart = document.querySelector("#barChart").getContext("2d");

  const schoolNames = Array.from(new Set(data.map((item) => item.school_name)));
  const lessonNames = Array.from(new Set(data.map((item) => item.lesson_name)));

  let datasets = [];

  schoolNames.forEach(function (school) {
    const grades = lessonNames.map(function (lesson) {
      const matchingData = data.find(
        (item) => item.school_name === school && item.lesson_name === lesson
      );
      return matchingData ? parseFloat(matchingData.grade_avg) : 0;
    });

    datasets.push({
      label: school,
      data: grades,
      backgroundColor: getRandomColor(),
      borderColor: getRandomColor(),
      borderWidth: 1,
    });
  });

  const myChart = new Chart(barChart, {
    type: "bar",
    data: {
      labels: lessonNames,
      datasets: datasets,
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  return myChart;
}

function createPieChart(data) {
  const pieChart = document.querySelector("#pieChart").getContext("2d");

  const lessonNames = [];
  let gradeAvgs = [];

  data.forEach((item) => {
    if (!lessonNames.includes(item.lesson_name))
      lessonNames.push(item.lesson_name);
    if (!gradeAvgs[lessonNames.indexOf(item.lesson_name)])
      gradeAvgs[lessonNames.indexOf(item.lesson_name)] = 0;
    gradeAvgs[lessonNames.indexOf(item.lesson_name)] += parseFloat(
      item.grade_avg
    );
  });
  gradeAvgs = gradeAvgs.map((item) => parseFloat(item / 3));

  const bgColors = getRandomColorsArray(lessonNames.length);

  const myChart = new Chart(pieChart, {
    type: "pie",
    data: {
      labels: lessonNames,
      datasets: [
        {
          data: gradeAvgs,
          backgroundColor: bgColors,
        },
      ],
    },
  });

  return myChart;
}

// function createPieChart(data) {
//   const pieChart = document.querySelector("#pieChart").getContext("2d");

//   console.log(data);

//   const schools = {};
//   const lessonList = [];
//   data.forEach((item) => {
//     if (!schools[item.school_name]) schools[item.school_name] = {};
//     if (!lessonList.includes(item.lesson_name))
//       lessonList.push(item.lesson_name);
//     schools[item.school_name][item.lesson_name] = parseFloat(item.grade_avg);
//   });

//   const datasets = [];
//   const bgColors = getRandomColorsArray(lessonList.length);
//   for (let school in schools) {
//     const grades = Object.values(schools[school]);
//     datasets.push({
//       label: school,
//       data: grades,
//       backgroundColor: bgColors,
//     });
//   }

//   const myChart = new Chart(pieChart, {
//     type: "pie",
//     data: {
//       datasets: datasets,
//       labels: Object.keys(schools[Object.keys(schools)[0]]),
//     },
//     options: {
//       responsive: true,
//     },
//   });

//   return myChart;
// }

function getRandomColorsArray(count) {
  var colors = [];
  for (var i = 0; i < count; i++) {
    colors.push(getRandomColor());
  }
  return colors;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
