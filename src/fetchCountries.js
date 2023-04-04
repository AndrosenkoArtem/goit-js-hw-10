import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
const REQUEST_FILTER = 'fields=name,capital,population,flags,languages';

class Countries {
  constructor() {}
  fetchCountries(name) {
    return fetch(
      `https://restcountries.com/v3.1/name/${name}?${REQUEST_FILTER}`
    ).then(response => {
      if (!response.ok) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        return;
      }
      return response.json();
    });
  }
}
export { Countries };
