// Mobile Nav Bar

let mobileNav = document.getElementById("mobile-nav-bar");

document.getElementById("mobile-nav-bar").style.display = "none";

document
  .getElementById("mobile-menu-icon")
  .addEventListener("click", function() {
    if (mobileNav.style.display === "none") {
      mobileNav.style.display = "block";
    } else {
      mobileNav.style.display = "none";
    }
  });

document.addEventListener("click", function(e) {
  if (
    e.target.className !== "mobile-nav-list" &&
    e.target.className !== "mobile-nav-list rnd-btn " &&
    e.target.className !== "icons"
  ) {
    mobileNav.style.display = "none";
  }
});

// Load Links from Local Storage when Dom is Loaded

document.addEventListener("DOMContentLoaded", function() {
  let links;
  if (localStorage.getItem("links") === null) {
    links = [];
  } else {
    links = JSON.parse(localStorage.getItem("links"));
  }

  links.forEach(function(link) {
    // Create all Elements
    let div1 = document.createElement("div");
    div1.className = "sec3-inner-cards-cover white";
    div1.id = link.divId;
    let closeBtn = document.createElement("img");
    closeBtn.src = "images/cancel.svg";
    closeBtn.id = link.cancelBtnId;
    closeBtn.className = "closeBtn";
    let div2 = document.createElement("div");
    div2.className = "sec-three-card1 section-three-inner-cards ";
    let para1 = document.createElement("p");
    para1.innerText = link.longLink;
    let hr = document.createElement("hr");
    let div3 = document.createElement("div");
    div3.className = "sec-three-card2 section-three-inner-cards ";
    let para2 = document.createElement("p");
    para2.id = link.linkId;
    para2.innerText = link.shortLink;
    let btn = document.createElement("button");
    btn.className = "copyButtonClass";
    btn.id = link.btnId;
    btn.innerText = "Copy";
    let input = document.createElement("input");
    input.className = "inputClass";
    input.value = link.shortLink;

    // Append All Elements
    div2.appendChild(para1);
    div3.appendChild(para2);
    div3.appendChild(btn);
    div3.appendChild(input);
    div1.appendChild(closeBtn);
    div1.appendChild(div2);
    div1.appendChild(hr);
    div1.appendChild(div3);
    document.getElementById("section-three-inner").appendChild(div1);
  });
});

// Validate form and Get URL from form

let formInput = document.getElementById("form-input");

document.getElementById("get-url-button").addEventListener("click", getApi);

let linkListId = 0;
let longLinkId = 0;
let shortLinkId = 0;

function getApi() {
  let buttonId = Math.floor(Math.random() * 1000);

  if (formInput.value == "") {
    alert("The input field is empty");
  } else {
    fetch(" https://rel.ink/api/links/", {
      method: "POST",
      body: JSON.stringify({
        url: formInput.value
      }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          alert(
            "Please, enter a Valid link. E.g, https://wwww.google.com/greatexample"
          );
        }
        return response.json();
      })
      .then(data => {
        formInput.value = "";
        if (data.url[0] !== "Enter a valid URL.") {
          // Create all Elements

          // <img src="images/cancel.svg">

          let div1 = document.createElement("div");
          div1.className = "sec3-inner-cards-cover white";
          linkListId += 1;
          div1.id = `linkListId-${linkListId}`;
          let closeBtn = document.createElement("img");
          closeBtn.src = "images/cancel.svg";
          closeBtn.id = `closeBtn-${buttonId}`;
          closeBtn.className = "closeBtn";
          let div2 = document.createElement("div");
          div2.className = "sec-three-card1 section-three-inner-cards ";
          let para1 = document.createElement("p");
          longLinkId += 1;
          para1.id = ` longLinkID-${longLinkId}`;
          para1.innerText = data.url;
          let hr = document.createElement("hr");
          let div3 = document.createElement("div");
          div3.className = "sec-three-card2 section-three-inner-cards ";
          let para2 = document.createElement("p");
          shortLinkId += 1;
          para2.id = `shortLinkId-${shortLinkId}`;
          para2.innerText = `https://rel.ink/${data.hashid}`;
          let btn = document.createElement("button");
          btn.className = "copyButtonClass";
          btn.id = `copyButtonId-${buttonId}`;
          btn.innerText = "Copy";
          let input = document.createElement("input");
          input.className = "inputClass";
          input.value = `https://rel.ink/${data.hashid}`;

          // Append All Elements
          div2.appendChild(para1);
          div3.appendChild(para2);
          div3.appendChild(btn);
          div3.appendChild(input);
          div1.appendChild(closeBtn);
          div1.appendChild(div2);
          div1.appendChild(hr);
          div1.appendChild(div3);
          document.getElementById("section-three-inner").appendChild(div1);

          let linkObj = {
            divId: div1.id,
            longLink: data.url,
            shortLink: ` https://rel.ink/${data.hashid}`,
            linkId: para2.id,
            btnId: btn.id,
            cancelBtnId: closeBtn.id
          };

          saveToLocalStorage(linkObj);
        }
      });
  }
}

// SAve Links to Local Storage
function saveToLocalStorage(link) {
  let links;
  if (localStorage.getItem("links") === null) {
    links = [];
  } else {
    links = JSON.parse(localStorage.getItem("links"));
  }

  links.push(link);
  localStorage.setItem("links", JSON.stringify(links));
}

// Copy Link
document.body.addEventListener("click", copyLink);

function copyLink(e) {
  if (e.target.className === "copyButtonClass") {
    let copiedLink = e.target.nextElementSibling;
    copiedLink.style.display = "block";
    copiedLink.select();
    document.execCommand("copy");
    copiedLink.style.display = "none";

    console.log(e.target);
    e.target.innerText = "Copied!";
    e.target.style.background = "#3A3053";
  }
}

// Delete Link Card from DOM
document.body.addEventListener("click", deleteLink);

function deleteLink(e) {
  if (e.target.className === "closeBtn") {
    if (confirm("Are you sure you want to delete this?")) {
      e.target.parentElement.remove();
      deleteFromLs(e.target.id);
    }
  }
}

// Delete from Local Storage
function deleteFromLs(linkId) {
  let links;
  if (localStorage.getItem("links") === null) {
    links = [];
  } else {
    links = JSON.parse(localStorage.getItem("links"));
  }

  links.forEach(function(link, index) {
    if (link.cancelBtnId === linkId) {
      links.splice(index, 1);
    }
  });
  localStorage.setItem("links", JSON.stringify(links));
}
