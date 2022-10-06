import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
console.log(inputEl);
const countryList = document.querySelector('.country-list');
console.log(countryList);
const countryInfo = document.querySelector('.country-info');
console.log(countryInfo);
 
inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
  const searchInput = evt.target.value.trim();
  if (searchInput !== "") {
    fetchCountries(searchInput).then(renderCountry).catch(onError);
  }

}

function renderCountry(foundData) {
  if (foundData.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (foundData.length === 0) {
    onError(error);
  } else if (foundData.length >= 2 && foundData.length <= 10) {
    renderCountryList(foundData);
  } else if (foundData.length === 1) {
    renderOneCountry(foundData);
  }
}

function onError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
  console.log('Oops, there is no country with that name');
}

function renderCountryList(countries) {
    const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
         <b>${country.name.official}</p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
  
}

function renderOneCountry(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
         <b>${country.name.official}</b></p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}