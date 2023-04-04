import './css/styles.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { Countries } from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const countries = new Countries();

const serachInput = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');

serachInput.addEventListener(
  'input',
  debounce(onSearchCountries, DEBOUNCE_DELAY)
);
function onSearchCountries(e) {
  if (e.target.value.trim() === '') {
    countriesList.innerHTML = '';
    return;
  }
  countriesList.innerHTML = '';

  countries
    .fetchCountries(e.target.value)
    .then(checkLengthAllCountries)
    .catch(response => {
      return;
    });
}
function checkLengthAllCountries(countriesObj) {
  if (countriesObj.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return countriesObj;
  } else if (countriesObj.length <= 10 && countriesObj.length >= 2) {
    countriesList.insertAdjacentHTML(
      'beforeend',
      createListCountries(countriesObj)
    );
  } else if (countriesObj.length === 1) {
    countriesList.insertAdjacentHTML(
      'beforeend',
      createSoloCountriy(countriesObj)
    );
  }
  return countriesObj;
}
function createListCountries(countries) {
  return countries
    .map(country => {
      return `<li class="countries"><img class="flag" src="${country.flags.svg}" alt="${country.name.official}" ></img><p class="country__subtitle">${country.name.official}</p></li>`;
    })
    .join('');
}
function createSoloCountriy(countries) {
  return countries
    .map(country => {
      return `
        <li class="country">
          <span class="super-span"><img class="country__photo" src="${
            country.flags.svg
          }" alt="${country.name.official}" />
          <h1 class="country__title">${country.name.official}</h1></span>
          <p class="country__subtitle">Capital: <span class="text-span">${
            country.capital
          }</span></p>
          <p class="country__subtitle">Population: <span class="text-span">${
            country.population
          }</span></p>
          <p class="country__subtitle">Languages: <span class="text-span">${Object.values(
            country.languages
          )}</span></p>
        </li>`;
    })
    .join('');
}
