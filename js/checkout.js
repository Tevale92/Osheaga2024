// declaring variables of all html elements for the initial info of tickets purchase
let fullNameLabel = document.getElementById("full-name-label");
let fullName = document.getElementById("full-name");
let emailLabel = document.getElementById("email-label");
let email = document.getElementById("email");
let eventDayLabel = document.getElementById("event-day-label");
let eventDay = document.getElementById("event-day");
let ticketsLabel = document.getElementById("tickets-label");
let tickets = document.getElementById("tickets");
let priceLabel = document.getElementById("price-label");
let price = document.getElementById("price");
let taxAmtLabel = document.getElementById("tax-label");
let taxAmt = document.getElementById("tax");
let totalPriceLabel = document.getElementById("total-price-label");
let totalPrice = document.getElementById("total-price");
let nextForm = document.getElementById("firstBtn");

// array with all html elements to be hidden in payment section of the form
let firstForm = [fullNameLabel, fullName, emailLabel, email, eventDayLabel, eventDay,
    priceLabel, price, taxAmtLabel, taxAmt, nextForm];

// array with all input elements to be tested for valid input and the alert message for french and english
let requiredFirstFields = 
    [[fullName, "You must enter your first and last name", "Vous devez entrer votre nom et prénom"],
    [email, "You must enter your email address", "Vous devez entrer votre courriel"],
    [tickets, "You must select the number of ticekts you wish to buy", "Vous devez sélectionner le nombre de billets que vous souhaitez acheter"]];

// array with first forms input patterns that I copied from regexr.com
let firstPatterns = 
    [/(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16}$)/,
    /^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/];



// declaring variables of all html elements for the payment of tickets purchase
let cardNumberLabel = document.getElementById("card-number-label");
let cardNumber = document.getElementById("card-number");
let cardExpLabel = document.getElementById("card-exp-label");
let cardExp = document.getElementById("card-exp");
let cardCVVLabel = document.getElementById("card-cvv-label");
let cardCVV = document.getElementById("card-cvv");
let postalCodeLabel = document.getElementById("postal-code-label");
let postalCode = document.getElementById("postal-code");
let submit = document.getElementById("submitBtn");

// array with all html elements to start hidden in the form
let secondForm = [cardNumberLabel, cardNumber, cardExpLabel, cardExp, 
    cardCVVLabel, cardCVV, postalCodeLabel, postalCode, submit];

// array with all input elements to be tested for valid input and the alert message for french and english
let requiredSecondFields = 
    [[cardNumber, "Please enter a valid credit card number", "Veuillez entrer un numéro de carte de crédit valide"],
    [cardExp, "Please enter a valid expiry date", "Veuillez entrer une date d'expiration valide"],
    [cardCVV, "Please enter a valid CVV number", "Veuillez entrer un numéro CVV valide"],
    [postalCode, "Please enter a valid US zip code or Canadian postal code", "Veuillez entrer un code postal Américain ou Canadien valide"]];

// array with second forms input patterns that I copied from regexr.com
let secondPatterns = 
    [/^(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}$/,
    /^(0[1-9]|1[0-2])\/\d{2}$/,
    /^\d\d\d$/,
    /(^\d{5}([ \-]\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1}[ \-]\d{1}[A-Z]{1}\d{1}$)/];

// hiding all the elements when the page opens
secondForm.forEach(element => {
    element.style = "display: none";
});


// declaring ticket price constants and tax constant
const ticketPrice = 155;
const tax = 0.15;

// highlights if the input element has a correct or incorrect input
fullName.addEventListener("input", function () {
    if (testPattern(firstPatterns[0], this)) {
        this.style.border = "1.5px solid #39FF14";
    } else {
        this.style.border = "1.5px solid red";
    }
})
email.addEventListener("input", function () {
    if (testPattern(firstPatterns[1], this)) {
        this.style.border = "1.5px solid #39FF14";
    } else {
        this.style.border = "1.5px solid red";
    }
})
cardNumber.addEventListener("input", function () {
    if (testPattern(secondPatterns[0], this)) {
        this.style.border = "1.5px solid #39FF14";
    } else {
        this.style.border = "1.5px solid red";
    }
})
cardExp.addEventListener("input", function () {
    if (testPattern(secondPatterns[1], this)) {
        this.style.border = "1.5px solid #39FF14";
    } else {
        this.style.border = "1.5px solid red";
    }
})
cardCVV.addEventListener("input", function () {
    if (testPattern(secondPatterns[2], this)) {
        this.style.border = "1.5px solid #39FF14";
    } else {
        this.style.border = "1.5px solid red";
    }
})
postalCode.addEventListener("input", function () {
    if (testPattern(secondPatterns[3], this)) {
        this.style.border = "1.5px solid #39FF14";
    } else {
        this.style.border = "1.5px solid red";
    }
})

// setting the number of tickets in the local storage when the user changes the number of tickets
tickets.addEventListener("input", function () {
    window.localStorage.setItem("numTickets", tickets.value);
    // calling the price calculating function
    updateTotals();
});


// onclick event listener for the first part of the form
nextForm.addEventListener("click", function () {
    let msg = ""

    for (let i = 0; i < requiredFirstFields.length - 1; i++) {
        if (!testPattern(firstPatterns[i], requiredFirstFields[i][0])) {
            if (localStorage.getItem("currentLang") === "english") {
                msg += requiredFirstFields[i][1] + "\n";
            } else {
                msg += requiredFirstFields[i][2] + "\n";
            }
        }
    }

    if (tickets.value < 1) {
        if (localStorage.getItem("currentLang") === "english") {
            msg += requiredFirstFields[2][1];
        } else {
            msg += requiredFirstFields[2][2];
        }
    }

    if (msg === "") {
        firstForm.forEach(element => {
            element.style = "display: none";
        })
        tickets.readOnly = "true";
        secondForm.forEach(element => {
            element.style = "display: grid";
        });
    } else {
        window.alert(msg);
    }
})

// onclick event listener for the payment part of the form
submit.addEventListener("click", function () {
    let msg = ""

    for (let i = 0; i < requiredSecondFields.length; i++) {
        if (!testPattern(secondPatterns[i], requiredSecondFields[i][0])) {
            if (localStorage.getItem("currentLang") === "english") {
                msg += requiredSecondFields[i][1] + "\n";
            } else {
                msg += requiredSecondFields[i][2] + "\n";
            }
        }
    }

    if (msg === "") {
        modal.style.display = "block";
        receipt.innerHTML = 
        `<em>Thank you for your purchase!</em>
		<br>We can't wait to see you in person.
        <br><br>Here is your purchase information.
        <br>Client Name: ${fullName.value}
        <br>Email: ${email.value}
        <br>Ticket Days: ${eventDay.value}
        <br>Number of Tickets: ${tickets.value}
        `;
    } else {
        window.alert(msg);
    }
})

// function to update the prices for the tickets
function updateTotals () {
    let numTickets = window.localStorage.getItem("numTickets");

    price.value = formatNumber(ticketPrice * numTickets);
    taxAmt.value = formatNumber((ticketPrice * numTickets) * tax);
    totalPrice.value = formatNumber((ticketPrice * numTickets) + ((ticketPrice * numTickets) * tax));
}

// function to format the prices
function formatNumber (number) {
    return "$" + number.toFixed(2);
}

// function to test an elements value given a certain pattern
function testPattern (pattern, testElement) {
    return pattern.test(testElement.value);
}


// declaring a var for the modal receipt
let modal = document.getElementById("modal");
let receipt = document.getElementById("receipt");
let span = document.getElementsById("close");

// When the user clicks on <span> (x), close the modal
span.addEventListener("click", function() {
  document.getElementById("register-form").submit();
})

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    document.getElementById("register-form").submit();
  }
})