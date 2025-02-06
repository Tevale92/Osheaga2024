// declaring var of all the feedback html elements
let fullName = document.getElementById("full-name");
let email = document.getElementById("email");
let rating = document.getElementById("rating");
let review = document.getElementById("review");
let submit = document.getElementById("submitBtn");
let form = document.getElementById("feedback-form");
let modal = document.getElementById("modal");
let modalMsg = document.getElementById("modal-msg");
let span = document.getElementById("close");
let reviews = document.getElementById("reviews");
let reviewList = document.getElementById("reviews-list");

// array of necessary form elements
let required = 
    [[fullName, "You must enter your first and last name", "Vous devez entrer votre nom et prénom"], 
    [email, "You must enter your email address", "Vous devez entrer votre courriel"]];

// array with forms input patterns that I copied from regexr.com
let patterns = 
    [/(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16}$)/,
    /^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/];


// highlights if the input element has a correct or incorrect input
fullName.addEventListener("input", function () {
    if (testPattern(patterns[0], this)) {
        this.style.border = "1.5px solid #39FF14";
    } else {
        this.style.border = "1.5px solid red";
    }
})
email.addEventListener("input", function () {
    if (testPattern(patterns[1], this)) {
        this.style.border = "1.5px solid #39FF14";
    } else {
        this.style.border = "1.5px solid red";
    }
})

// onclick event listener for the feedback submit button
submit.addEventListener("click", function () {
    let msg = ""

    for (let i = 0; i < required.length; i++) {
        if (!testPattern(patterns[i], required[i][0])) {
            if (localStorage.getItem("currentLang") === "english") {
                msg += required[i][1] + "\n";
            } else {
                msg += required[i][2] + "\n";
            }
        }
    }

    if (msg === "") {
        modal.style.display = "block";
        modalMsg.innerHTML = 
        `<em>Thank you for your review!</em>
        <br>All feedback is greatly appreciated.`;
    } else {
        window.alert(msg);
    }
})

// When the user clicks on <span> (x), close the modal
span.addEventListener("click", function() {
    submitReview();
  });
  
// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    submitReview();
  }
});


// function to test an elements value given a certain pattern
function testPattern (pattern, testElement) {
    return pattern.test(testElement.value);
}

// function to submit a users review
function submitReview () {
    const revCount = document.getElementsByClassName("review").length;
    localStorage.setItem("revCount", revCount);
    localStorage.setItem(`fullName${revCount}`, fullName.value);
    localStorage.setItem(`email${revCount}`, email.value);
    localStorage.setItem(`rating${revCount}`, rating.value);
    localStorage.setItem(`review${revCount}`, review.value);
    form.submit();
}

// creating elements to add to review list
function addReviews () {
    if (localStorage.getItem("revCount")) {
        for (let i = 0; i <= localStorage.getItem("revCount"); i++) {
            let reviewElement = document.createElement("div");
            if (i == 0) {
                reviewElement.innerHTML = 
                `${localStorage.getItem(`fullName${i}`)}, 
                ${star(localStorage.getItem(`rating${i}`))}
                <br>${localStorage.getItem(`review${i}`)}
                `;
            } else {
                reviewElement.innerHTML = 
                `<hr>${localStorage.getItem(`fullName${i}`)}, 
                ${star(localStorage.getItem(`rating${i}`))}
                <br>${localStorage.getItem(`review${i}`)}
                `;
            }
            reviewElement.classList.add("review");
            reviewList.appendChild(reviewElement);
        }
    } else {
        reviews.style.display = "none";
    }
}

// function to return the star rating
function star(rating) {
    let star = ""
    for (let i = 1; i <= rating; i++) {
        star += "<i class='bi bi-star-fill'></i>";
    }
    return star;
}

// loading the reviews that are in the local storage
addReviews();