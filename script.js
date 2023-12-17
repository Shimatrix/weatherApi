//@to-do 1: найти элементы
const mainCard = document.querySelector('.main__card');
const mainCity = mainCard.querySelector('.main__city');
const mainData = mainCard.querySelector('.main__date');
const placesTemperature = mainCard.querySelector('.places__temperature');
const placesTitle = Array.from(mainCard.querySelectorAll('.places__title'));
const placesAccent = Array.from(mainCard.querySelectorAll('.places__accent'));
const buttonCity = Array.from(document.querySelectorAll('.header__item'));

const londonButton = document.querySelector('.London');
const moscowButton = document.querySelector('.Moscow');
const istanbulButton = document.querySelector('.Istanbul');
//@to-do 2: найти темплейт

//@to-do 3: подключить апи по документации https://openweathermap.org/current
const configApi = {
    url: 'https://api.openweathermap.org/data/2.5/weather?',
    key: '&appid=df63a1c95610dafbdefed187acab2173',
    city: {
        london: 'q=London',
        moscow: 'q=Moscow',
        istanbul: 'q=Istanbul'
    }
}

const checkApi = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Da blyat, opyat nihua ne rabotaet: ${res.status}`)
}

//@to-do 4: написать функции получения погоды по разным городам
const getWeatherLondon = () => {
   return fetch(`${configApi.url}${configApi.city.london}${configApi.key}&units=metric`)
    .then((res) => checkApi(res))
    .then((data) => {
        return data
    })
}

const getWeatherMoscow = () => {
    return fetch(`${configApi.url}${configApi.city.moscow}${configApi.key}&units=metric`)
    .then((res) => checkApi(res))
    .then((data) => {
        return data
    })
}

const getWeatherIstanbul = () => {
    return fetch(`${configApi.url}${configApi.city.istanbul}${configApi.key}&units=metric`)
    .then((res) => checkApi(res))
    .then((data) => {
        return data
    })
}

//@to-do 5: клонировать темплейт

//@to-do 6: написать функцию создания карточки погоды
const renderCard = () => {
    if (mainCard.classList.contains('main__card_visible')) {
        mainCard.classList.remove('main__card_visible');
    } 
    mainCard.classList.add('main__card_visible');
}

//@to-do 7: получить дату и время запроса https://learn.javascript.ru/datetime
const getDateNow = () => {
    let date = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };

    let dateNow = date.toLocaleString("en-US", options);

    return dateNow;
} 

//@to-do 8: написать функции изменения данных карточки
const refreshCardData = (data) => {
    const labels = [
        `${data.main.feels_like}°`,
        `${data.main.temp}°`,
        `${data.main.pressure} hPA`,
        `${data.clouds.all}%`,
        `${data.main.temp_min}°`,
        `${data.main.temp_max}°`
      ];

    mainCity.textContent = data.name;
    mainData.textContent = getDateNow();
    placesTemperature.textContent = `${Math.round(data.main.temp)}°`;
    placesTitle.forEach((item, index) => {
        if (index === 0) {
            item.textContent = data.wind.speed;
        }
        if (index === 1) {
            item.textContent = data.main.humidity;
        }
        if (index === 2) {
            item.textContent = data.visibility / 1000;
        }
    })
    placesAccent.forEach((item, index) => {
            item.textContent = labels[index];
})
}

//@to-do 9: написать функцию для кнопки
const handleButtonLondon = () => {
    renderCard();
    deleteButtonStyle();
    londonButton.classList.add('is-active');
    getWeatherLondon()
    .then((data) => refreshCardData(data))
}

const handleButtonMoscow = () => {
    renderCard();
    deleteButtonStyle();
    moscowButton.classList.add('is-active');
    getWeatherMoscow()
    .then((data) => refreshCardData(data))
}

const handleButtonIstanbul = () => {
    renderCard();
    deleteButtonStyle();
    istanbulButton.classList.add('is-active');
    getWeatherIstanbul()
    .then((data) => refreshCardData(data))
}
//@to-do 10: написать функцию изменения стиля кнопки
const deleteButtonStyle = () => {
    buttonCity.forEach((button) => {
        button.classList.remove('is-active');
    })
}

//@to-do 11: навесить слушатели на кнопки
buttonCity.forEach((item, index) => {
    if (index === 0) {
        item.addEventListener('click', handleButtonLondon)
    }
    if (index === 1) {
        item.addEventListener('click', handleButtonMoscow)
    }
    if (index === 2) {
        item.addEventListener('click', handleButtonIstanbul)
    }
})