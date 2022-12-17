// Where to pull from
const apodUrl = "https://api.nasa.gov/planetary/apod?api_key=0UieBswOrvrViwGPhI6ypg1tdwR9iF8tKV6eT2yJ";

// Use the URL to fetch the current picture of the day
async function getApod(url) {
    // Get response from url
    const response = await fetch(url);
    console.log(url);
    const data = await response.json();
    // If ready, pull as json
    if (response.ok) {
        // success...make sure any previous error message is gone.
        hideError();
        //return the data
        renderTemplate(data);
    }
    else {
        // error...output the message returned by the server
        showError(data.msg);
        // return false to show that something went wrong
        return false;
    }
}

// Create html photoTemplate
function photoTemplate(photo) {
    return `<section class="photo">
        <img src=${photo.url} alt="${photo.title}">
        <div>
            <h2>${photo.title}</h2>
            <h3>${photo.date}</h3>
            <p>${photo.explanation}</p>
        </div>
    </section>`;
}

// Insert information into html using photoTemplate
function renderTemplate(data) {
    // Get element
    const element = document.querySelector('#pod');
    // Build html string
    const html = photoTemplate(data)
    // Insert html into element
    element.innerHTML = html;
}

function getApodByDate(apodUrl) {
    // Get value from input
    const date = document.querySelector("#date").value;
    // Append value from input to url
    getApod(apodUrl + `&date=${date}`);
}


document.querySelector('.submit').addEventListener('click', function(e){
    e.preventDefault()
    getApodByDate(apodUrl)
});


function showError(msg) {
    //get the error element
    const error = document.querySelector('.error');
    //set the content of the element to the msg
    error.innerHTML = msg
    // remove the hide class
    error.classList.remove('hide');
}
function hideError() {
    //get the error element
    const noError = document.querySelector('.error');
    // clear out the content of the element
    noError.innerHTML
    // add the hide class
    noError.classList.add('hide');
}

window.addEventListener('load', getApod(apodUrl));