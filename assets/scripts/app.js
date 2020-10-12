const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backDrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = addMovieModal.querySelector('.btn--success');
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const updateUi = () => {
	if(movies.length === 0) {
		entryTextSection.style.display = 'block';

	}
	else {
		entryTextSection.style.display = 'none';
	}
};

const toggleBackDrop = ()=> {
	backDrop.classList.toggle('visible');

};

const closeMovieDelitionModal = () => {
	toggleBackDrop();
	deleteMovieModal.classList.remove('visible');
};

const deleteMovie = (movieId)=> {
	let index = 0;
	for(const movie of movies) {
		if(movie.id === movieId) {
			break;
		}
		index++;
	}
	movies.splice(index, 1);
	const listRoot = document.getElementById('movie-list');
	console.log(listRoot.children);
	listRoot.children[index].remove();
	closeMovieDelitionModal();
	updateUi();
};


const startDeleteMovieHandler = (movieId) => {
	deleteMovieModal.classList.add('visible');
	toggleBackDrop();
	const cancelDelitionButton = deleteMovieModal.querySelector('.btn--passive');
	let confirmDelitionButton = deleteMovieModal.querySelector('.btn--danger');

	confirmDelitionButton.replaceWith(confirmDelitionButton.cloneNode(true)); // клонируем кнопку и заменяем клоном существующую
	confirmDelitionButton = deleteMovieModal.querySelector('.btn--danger');
    
	cancelDelitionButton.removeEventListener('click',closeMovieDelitionModal);
	cancelDelitionButton.addEventListener('click',closeMovieDelitionModal);
	confirmDelitionButton.addEventListener('click', deleteMovie.bind(null, movieId));
};

const renderNewMovieElement = (id,title, image, rating) => {
	const newMovieElement = document.createElement('li');
	newMovieElement.className = 'movie-element';
	newMovieElement.innerHTML = `
    <div class = "movie-element__image">
    <img src = "${image}" alt = "${title}">
    </div>
    <div class = "movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
    </div>
    `;
	newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id));
	const listRoot = document.getElementById('movie-list');
	listRoot.append(newMovieElement);
};

const closeAddMovieModal = () => {
	addMovieModal.classList.remove('visible');
};

const showMovieModal = ()=>{
	addMovieModal.classList.add('visible');
	toggleBackDrop();
};

const clearMovieInputs = () => {
	for( const inputs of userInputs) {
		inputs.value = '';
	}
};

const backDropClickHandler = () => {
	closeAddMovieModal();
	closeMovieDelitionModal();
	clearMovieInputs();
};

const cancelAddMovieHandler = () => {
	closeAddMovieModal();
	toggleBackDrop();
	clearMovieInputs();
};

const addMovieHandler = () => {
	const titleValue = userInputs[0].value;
	const imageUrlValue = userInputs[1].value;
	const ratingValue = userInputs[2].value;
	let id = movies.length;
	if(
		titleValue.trim() === '' || 
        imageUrlValue.trim() === '' || 
        ratingValue.trim()=== '' || 
        +ratingValue < 1 || 
        +ratingValue > 5) {
		alert('Please enter valid values. Rating between 1 and 5');
		return;
	}
    
	id++;
    
	const newMovie = {
		id: id.toString(),
		title: titleValue,
		image: imageUrlValue,
		rating: ratingValue
	};
	movies.push(newMovie);
	console.log(movies);
    
	closeAddMovieModal();
	toggleBackDrop();
	clearMovieInputs();
	renderNewMovieElement(newMovie.id,newMovie.title, newMovie.image, newMovie.rating);
	updateUi();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backDrop.addEventListener('click', backDropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);