
// let content = document.querySelector(".main_content");

// if (content) {
//   fetch("data.json")
//     .then((res) => {
//       return res.json();
//     })
//     .then((result) => {
//       result.map((item, index) => {
//         content.innerHTML += `<div class="job_list">
//         <div class="job">
//        <div class="image">
//            <img src="${item.logo}" alt="">
//        </div>
//        <div class="details">
//            <div class="details_head">
//                <h4>${item.company}</h4>
//                ${item.new ? "<button>NEW</button>" : ""}
//                ${item.featured ? "<button class='btn'>FEATURED</button>" : ""}
               
//            </div>
//            <div class="details_p">
//                <h3>${item.position}</h3>: b  :mtm  t tHK(U(OR((((((((((((((((((((((((((((((((((((((((((((((((((((((((LUOÀÀ'WQAQ  A   Aqzea   azer'e"za   &é"œ&   &aézedzééerfvdsqsxdfgfdsdcv WxwwxcdsqQsertreza  éze'(éœ'"&&a    nt!!
//            <div class="details_tag"hýunv' {{{{{{{{{{{{{{{{{{××®×®×{ {×××××××××g >
//                <p>${item.postedAt}</p>
//                <p>. ${item.contract}</p>
//                <p>. ${item.location}</p>
//            </div>
//        </div>
//    </div>
//    <div class="list">

//        <ul>
//            <li class="list_categorie">${item.role}</li>
//            <li class="list_categorie">${item.level}</li>
//        </ul>
//    </div>
// </div>`;
//         let job_list = document.getElementsByClassName("job_list");
//         item.languages.forEach(
//           (lang) =>
//             (job_list[index].querySelector(
//               "ul"
//             ).innerHTML += `<li class="list_categorie">${lang}</li>`)
//         );
//         item.tools.forEach(
//           (tool) =>
//             (job_list[index].querySelector(
//               "ul"
//             ).innerHTML += `<li class="list_categorie">${tool}</li>`)
//         );
//       });
//         const categorie = document.querySelectorAll(".list_categorie");
//         if(categorie){
//             categorie.forEach((list) => {
//                 list.addEventListener("click", function () {
//                     let filterValue = list.textContent ;
//                     filterJob(filterValue);
//                     // console.log('bonjour');
//                     // const item = document.createElement("div");
//                     // item.className = "job_list filter";
//                     // item.innerHTML = `
//                     //         <div>
                                
//                     //         </div>
//                     //         <div class="clean">
//                     //             <a href="">Clear</a>
//                     //         </div>
//                     //     `;
//                     //     content.appendChild(item);
//                 });
//             });
//         }
//     });
// }

// function filterJob(filterValue){
//   let filteResults = result.filter((item) => {
//     return (
//       item.role === filterValue ||
//       item.level === filterValue ||
//       item.languages.includes(filterValue) ||
//       item.tools.includes(filterValue)
//     );
//   });
// }

let content = document.querySelector(".main_content");
let results = [] ;
let tab = [];

if (content) {
  fetch("data.json")
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      results = result; 
      displayJob(results);

    });
}

function displayJob(jobs) {
  content.innerHTML = ''; 

  jobs.map((item , index) => {
    content.innerHTML += `<div class="job_list">
      <div class="job">
        <div class="image">
          <img src="${item.logo}" alt="">
        </div>
        <div class="details">
          <div class="details_head">
            <h4>${item.company}</h4>
            ${item.new ? "<button>NEW</button>" : ""}
            ${item.featured ? "<button class='btn'>FEATURED</button>" : ""}
          </div>
          <div class="details_p">
            <h3>${item.position}</h3>
          </div>
          <div class="details_tag">
            <p>${item.postedAt}</p>
            <p>. ${item.contract}</p>
            <p>. ${item.location}</p>
          </div>
        </div>
      </div>
      <div class="list">
        <ul>
          <li class="list_categorie">${item.role}</li>
          <li class="list_categorie">${item.level}</li>
        </ul>
      </div>
    </div>`;
    let job_list = document.getElementsByClassName("job_list");
    item.languages.forEach(
      (lang) =>
        (job_list[index].querySelector(
          "ul"
        ).innerHTML += `<li class="list_categorie">${lang}</li>`)
    );
    item.tools.forEach(
      (tool) =>
        (job_list[index].querySelector(
          "ul"
        ).innerHTML += `<li class="list_categorie">${tool}</li>`)
    );
  });

  gestionDuClick();
}
function gestionDuClick() {
  let categorie = document.querySelectorAll(".list_categorie");
  categorie.forEach((item) => {
    item.addEventListener("click", () => {
      let filterValue = item.textContent
      if(!tab.find(c => c===filterValue)) tab.push(filterValue);
      filterJobs(filterValue);
      displayList(filterValue)
    });
  });
}

function filterJobs(filterValue) {
  let filteResult = results.filter((item) => {
    return (
      item.role === filterValue ||
      item.level === filterValue ||
      item.languages.includes(filterValue) ||
      item.tools.includes(filterValue)
    );
  });
  displayJob(filteResult); 
}
function displayList(filterValue){
  const element = document.createElement("div");
  element.className = "job_list filter";
  element.innerHTML = `
    <div class="list">
         <ul class="ul">
          
         </ul>                       
    </div>
    <div class="clean">
        <a href="">Clear</a>
    </div>
  `;
  content.insertBefore(element, content.firstChild);
  list = element.querySelector('.ul')
  tab.forEach(li =>{
    list.innerHTML += `
      <li class="li_list" >
        <span class="li">${li}</span>
        <button class="close">X</button>
      </div>
    `
    close();
  })
   
}
function close(){
  const bouton = list.querySelectorAll('.close')
  bouton.forEach(btn =>{
    btn.addEventListener('click', function(){
      const parent = this.closest('.li_list')
      const textValue = parent.querySelector('span').textContent
      tab = tab.filter(t => t!==textValue)
      parent.remove()
      filterJobs(textValue)
      displayList(textValue)
    })
  })
}
