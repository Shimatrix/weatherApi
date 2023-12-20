//@to-do 1: найти элементы
const mainCard = document.querySelector('.main__card');
const mainCity = mainCard.querySelector('.main__city');
const mainData = mainCard.querySelector('.main__date');
const placesTemperature = mainCard.querySelector('.places__temperature');
const placesTitle = Array.from(mainCard.querySelectorAll('.places__title'));
const placesAccent = Array.from(mainCard.querySelectorAll('.places__accent'));
const buttonCity = Array.from(document.querySelectorAll('.header__item'));
const submitForm = document.forms['get-city'];
const selectForm = submitForm.querySelector('.header__select');
const submitButton = submitForm.querySelector('.header__item');

const londonButton = document.querySelector('.London');
const moscowButton = document.querySelector('.Moscow');
const istanbulButton = document.querySelector('.Istanbul');

const cities = {
    moscow: 'Moscow',
    beijing: 'Beijing',
    delhi: 'Delhi',
    chengdu: 'Chengdu',
    guangzhou: 'Guangzhou',
    karachi: 'Karachi',
    tokyo: 'Tokyo',
    tianjin: 'Tianjin',
    lagos: 'Lagos',
    shenzhen: 'Shenzhen',
    mumbai: 'Mumbai',
    kinshasa: 'Kinshasa',
    lahore: 'Lahore',
    wuhan: 'Wuhan',
    jakarta: 'Jakarta',
    seoul: 'Seoul',
    chennai: 'Chennai',
    lima: 'Lima',
    cairo: 'Cairo',
    hangzhou: 'Hangzhou',
    nanking: 'Nanking',
    mexico: 'Mexico',
    tehran: 'Tehran',
    shenyang: 'Shenyang',
    dhaka: 'Dhaka',
    bangalore: 'Bangalore',
    dongguan: 'Dongguan',
    baghdad: 'Baghdad',
    bogota: 'Bogota',
    riyadh: 'Riyadh',
    foshan: 'Foshan',
    hyderabad: 'Hyderabad',
    suzhou: 'Suzhou',
    bangkok: 'Bangkok',
    ahmedabad: 'Ahmedabad',
    singapore: 'Singapore',
    shanghai: 'Shanghai',
    melbourne: 'Melbourne',
    surat: 'Surat',
    chongqing: 'Chongqing',
    washington: 'Washington',
    murom: 'Murom'
}
//@to-do 2: найти темплейт

//@to-do 3: подключить апи по документации https://openweathermap.org/current
const configApi = {
    url: 'https://api.openweathermap.org/data/2.5/weather?',
    key: 'df63a1c95610dafbdefed187acab2173'
}

const checkApi = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Da blyat, opyat nihua ne rabotaet: ${res.status}`)
}

//@to-do 4: написать функции получения погоды по разным городам
const getWeatherByCity = (city) => {
    return fetch(`${configApi.url}q=${city}&appid=${configApi.key}&units=metric`)
        .then((res) => checkApi(res))
        .then((data) => {
            return data;
        });
};

for (let key in cities) {
    if (cities.hasOwnProperty(key)) {
      const optionElement = document.createElement("option");
      optionElement.value = key;
      optionElement.text = cities[key];
      selectForm.appendChild(optionElement);
    }
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
    const labelsBlackCard = [
        `${data.wind.speed}`,
        `${data.main.humidity}`,
        `${data.visibility / 1000}`
    ]

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
        item.textContent = labelsBlackCard[index];
    })
    placesAccent.forEach((item, index) => {
        item.textContent = labels[index];
})
}

//@to-do 9: написать функцию для кнопки


// //@to-do 10: написать функцию изменения стиля кнопки
const deleteButtonStyle = () => {
    buttonCity.forEach((button) => {
        button.classList.remove('is-active');
    })
}

//@to-do 11: навесить слушатели на кнопки
const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    const selectedCity = selectForm.value;
    if (selectedCity) {
        renderCard();
        deleteButtonStyle();
        getWeatherByCity(selectedCity)
            .then((data) => refreshCardData(data));
    }
};

submitButton.addEventListener('click', handleFormSubmit);