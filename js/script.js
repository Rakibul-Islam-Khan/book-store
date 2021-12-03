// global variable
const inputFiled = document.getElementById('input-filed');
const bookContainer = document.getElementById('book-container');
const spinner = document.getElementById('spinner');
const showResults = document.getElementById('show-results');
const error = document.getElementById('error');
const spin = document.getElementById('spin');
error.classList.remove('error')
// load data arrow function
const loadData = () => {
    const search = inputFiled.value;

    // error handling
    if (inputFiled.value === '') {
        error.classList.add('error');
        error.innerText = 'Please fill out input filed';
        showResults.classList.remove('results');
        showResults.innerText = '';
        bookContainer.innerHTML = '';
    } else {
        const url = `https://openlibrary.org/search.json?q=${search}`;
        fetch(url)
            .then(res => res.json())
            .then(data => bookShow(data.docs.slice(0, 20)));
        spin.classList.remove('d-none');
        spin.style.marginTop = '10rem';
        error.innerText = '';
        error.classList.remove('error');
    }

    inputFiled.value = '';
}
// book show arrow function
const bookShow = data => {
    bookContainer.innerHTML = '';
    showResults.classList.add('results');
    showResults.innerText = `Total results found ${data.length}`;
    error.innerText = '';
    error.classList.remove('error');
    spin.style.display = 'none';
    data.forEach((book) => {
        const img = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        if (typeof book.author_name === 'undefined' || typeof book.publisher === 'undefined' || typeof book.cover_i === 'undefined') {
            const div = document.createElement('div');
            div.classList.add('box');
            div.innerHTML = `
        <div class="card shadow h-100">
            <img src="https://islandpress.org/sites/default/files/default_book_cover_2015.jpg" class="p-3 mx-auto" width='250px' height='300px' alt="...">
            <div class="card-body">
                <p><span class='fw-bold'>Book Name:</span> ${book.title.slice(0,20)}</p>
                <p><span class = 'fw-bold'>Author Name: </span>No Author</p >
                <p><span class='fw-bold'>First Publish:</span> ${book.first_publish_year}</p>
                <p><span class='fw-bold'>Publisher:</span> No Publisher</p>
            </div>
        </div>
        `
            bookContainer.appendChild(div);
        } else {
            const div = document.createElement('div');
            div.classList.add('box');
            div.innerHTML = `
        <div class="card shadow h-100">
            <img src="${img}" class="p-3 mx-auto" width='250px' height='300px' alt="...">
            <div class="card-body">
                <p><span class='fw-bold'>Book Name:</span> ${book.title.slice(0, 20)}</p>
                <p><span class='fw-bold'>Author Name:</span> ${book.author_name[0]}</p>
                <p><span class='fw-bold'>First Publish:</span> ${book.first_publish_year}</p>
                <p><span class='fw-bold'>Publisher:</span> ${book.publisher[0].slice(0,20)}</p>
            </div>
        </div>
        `
            bookContainer.appendChild(div);
        }
    })
}