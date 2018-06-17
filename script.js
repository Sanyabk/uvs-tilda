import { fakeEventsResponse } from './fakeApi.js';

//enums
const UvsEventTypes = {
    VOLUNTEERING: 'VOLUNTEERING',
    ORDINARY: 'ORDINARY'
};

const UvsCities = {
    ODESSA: 'ODESSA',
    KYIV: 'KYIV',
    LVIV: 'LVIV'
}

//cities initialization
class UvsCity {
    constructor(id, name, localName) {
        this.id = id;
        this.name = name;
        this.localName = localName;
    }
}

const cities = [
    new UvsCity(1, UvsCities.ODESSA, 'Одеса'),
    new UvsCity(2, UvsCities.KYIV, 'Київ'),
    new UvsCity(3, UvsCities.LVIV, 'Львів')
];

//events
class UvsEvent {
    constructor(eventDto) {
        this.id = eventDto.id;
        this.title = eventDto.title;
        this.description = eventDto.description;
        this.imageUrl = eventDto.cover[0].url;

        this.startsOn = moment(eventDto.startsOn);
        this.endsOn = eventDto.endsOn ? moment(eventDto.endsOn) : null;

        this.priceInfo = eventDto.priceInfo;
        this.eventType = eventDto.eventType;

        this.cityName = eventDto.cityName;
        this.placeName = eventDto.placeName;
        this.placeHref = eventDto.placeHref;

        this.urlToAttend = eventDto.urlToAttend;
        this.urlAbout = eventDto.urlAbout;
    }
}

function formatDate(isoDate) {
    return isoDate.format('Do MMMM, HH:mm'); //Do/MMM/YY HH:mm
}

let events = [];

//GET events from Airtable
$.get('http://p.ptrvch.com/get_uvs_events')
    .done(response => {
        response = fakeEventsResponse; //IMPORTANT: this line fakes API response!

        console.log(response);
        const eventDtos = response.map(o => o.fields);
        console.log('GET events success', eventDtos);

        events = eventDtos
            .filter(e => e.onSite)
            .map(e => new UvsEvent(e))
            .sort((a, b) => a.startsOn.isAfter(b.startsOn));

        doEventsFiltering(); //trigger manually, events were just populated
    })
    .fail(error => {
        console.log('GET events error', error);
    });

//search options inputs
const citiesSelect = document.getElementById('cities');
const showVolunteeringEvents = document.getElementById('showVolunteeringEvents');
const showOrdinaryEvents = document.getElementById('showOrdinaryEvents');

//add onchange listeners for events filtering
citiesSelect.addEventListener('change', doEventsFiltering);
showVolunteeringEvents.addEventListener('change', doEventsFiltering);
showOrdinaryEvents.addEventListener('change', doEventsFiltering);

//populate cities select
const cityOptionsMarkup = cities.map(c => `<option value=${c.name}>${c.localName}</option>`).join('');
citiesSelect.innerHTML = cityOptionsMarkup;

const eventsElement = document.getElementById('events');

function doEventsFiltering() {
    const cityName = citiesSelect.value;
    const shouldShowVolunteeringEvents = showVolunteeringEvents.checked;
    const shouldShowOrdinaryEvents = showOrdinaryEvents.checked;

    //filtering by city and checkboxes
    const now = moment();
    let filteredEvents = events
        .filter(e => e.cityName === cityName)
        .filter(e => e.startsOn.isAfter(now));

    if (!shouldShowVolunteeringEvents) {
        filteredEvents = filteredEvents.filter(e => e.eventType !== UvsEventTypes.VOLUNTEERING);
    }
    if (!shouldShowOrdinaryEvents) {
        filteredEvents = filteredEvents.filter(e => e.eventType !== UvsEventTypes.ORDINARY);
    }

    //append created markup to events container element in DOM, hazardous because innerHTML usage!
    const eventsMarkup = filteredEvents.map(createEventMarkup).join(""); //because map returns array that is devided by commas
    eventsElement.innerHTML = eventsMarkup;
}

function createEventMarkup(event) {
    let endTimeMarkup = !event.endsOn ? '' :
        `
        <p>
            <strong>Закінчення:</strong>
            <i>${formatDate(event.endsOn)}</i>
        </p>
        `;

    return `
        <div class="card event-card">
            <img class="card-img-top" src="${event.imageUrl}" alt="Event card image cap">
            <div class="card-body">
                <p>
                    <strong>Початок:</strong>
                    <i>${formatDate(event.startsOn)}</i>
                </p>
                ${endTimeMarkup}
                <p>
                    <strong>Де:</strong>
                    <i><a target="_blank" href="${event.placeHref}">${event.placeName}</a></i>
                </p>
                <p class="card-text">
                    <strong>Вартість:</strong>
                    <i>${event.priceInfo}</i>
                </p>
                <h4 class="card-title">${event.title}</h4>
                <p class="card-text">${event.description}</p>
                <a target="_blank" href="${event.urlToAttend}" class="btn btn-primary">Зареєструватися!</a>
                <i><a target="_blank" href="${event.urlAbout}" class="url-about">Подробицi</a></i>
            </div>
        </div>
        `;
}
