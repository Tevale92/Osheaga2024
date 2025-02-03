// setting local storage for what day is selected
window.localStorage.setItem("day", 1);

// setting artists variable to change html content
let artists = document.getElementById("artist-names");

// creating artists arrays and an array with each days artists
const artists1 = ["Noah Kahan, Melanie Martinez, Dominic Fike, Lil Tjay, Skepta", 
    "Teddy Swims, Two Door, Cinema Club, Mochakk, Bladee, Sleater-Kinney", 
    "Mariah the Scientist, Tezzo Touchdown, Romy, Overmono, Blonde Redhead", 
    "Arlo Parks, Fridayy, Byron Messia, Jyoty, The Japanese House, Avalon Emerson", 
    "Mimi Webb, Wild Rivers, Mannequin Pussy, Billianne, DJ Minx, Cam Kahin"];
const artists2 = ["Green Day, The Smashing Pumpkins, Martin Garrix, Reneé Rapp", 
    "Labrinth, T-Pain, Rancid, Gryffin, Elderbrook, Denzel Curry, Uncle Waffles", 
    "Talk, Chappell Roan, Brittany Howard, Michaël Brun, CRi, Olivia Dean", 
    "The Linda Lindas, Sofia Kourtesis, Libianca, Irène Drésel, Lola Young", 
    "Nonso Amadi, Soul Clap, Mariana Gueza, Sinca, Minoe, No Waves, DVTR"];
const artists3 = ["SZA, Hozier, Justice, Jungle, Hamza, Still Woozy, Alvvays", 
    "Stephen Sanchez, Raye, Tyla, Ayra Starr, Kevin Abstract, Mau P", 
    "Briston Maroney, Folamour, Amyl and The Sniffers, Chris Stussy, ElGrandetoto", 
    "ElYanna, Ash, Confidence Man, DIIV, Clay and Friends, Planet Giza", 
    "The Blue Stones, Model Man, Marina Trench, Ya Cetidon, Cadence Weapon"];
const artistsLists = [artists1, artists2, artists3];

// creating an array for to hold the string for each day
const days = ["Friday August Second", "Saturday August Third", "Sunday August Fourth"];

// adding the onclick eventlisteners for the next and previous arrows
document.getElementById("next").addEventListener("click", () => nextDay(true));
document.getElementById("previous").addEventListener("click", () => nextDay(false));

// function to change days, next day if true and previous day if false
function nextDay (bool) {
    let day = parseInt(window.localStorage.getItem("day"));

    if (bool) {
        if (day < 3) {
            day++;
        }
    } else {
        if (day > 1) {
            day--;
        }
    }

    window.localStorage.setItem("day", day);
    updateArtists(day);
}

// function to update the html content of the artists element
function updateArtists (day) {
    artists.innerHTML = `<h4>${days[day - 1]}
    <p><em>${artistsLists[day - 1][0]}</em>
    <br>${artistsLists[day - 1][1]}
    <br>${artistsLists[day - 1][2]}
    <br>${artistsLists[day - 1][3]}
    <br>${artistsLists[day - 1][4]}</p>`;
}

// initializing the page with the first day's artists
updateArtists(parseInt(window.localStorage.getItem("day"), 10));