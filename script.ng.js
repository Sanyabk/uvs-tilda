import { fakeEventsResponse } from './fakeApi.js';

//enums
const UvsEventTypes = {
    VOLUNTEERING: 'VOLUNTEERING',
    ORDINARY: 'ORDINARY'
};

const UvsCities = {
    ODESSA: 'ODESSA',
    KYIV: 'KYIV',
    LVIV: 'LVIV',
    OTHER: ''
}

//cities initialization
class UvsCity {
    constructor(id, name, localName) {
        this.id = id;
        this.name = name;
        this.localName = localName;
    }
}

//events
class UvsEvent {
    constructor(eventDto) {
        this.id = eventDto.id;
        this.title = eventDto.title;
        this.description = eventDto.description;
        this.imageUrl = eventDto.cover[0].url;

        this.startsOn = eventDto.startsOn;
        this.endsOn = eventDto.endsOn;

        this.priceInfo = eventDto.priceInfo;
        this.eventType = eventDto.eventType;

        this.cityName = eventDto.cityName;
        this.placeName = eventDto.placeName;
        this.placeHref = eventDto.placeHref;

        this.urlToAttend = eventDto.urlToAttend;
        this.urlAbout = eventDto.urlAbout;
    }
}

function getEvents() {
    //GET events from Airtable
    // return $.get('http://p.ptrvch.com/get_uvs_events');

    //IMPORTANT: this line fakes API response!
    return $.Deferred().resolve(fakeEventsResponse).promise();;
}

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


//Angularjs

//sanitize is for ng-bind-html directive (unsafe)
let app = angular.module("app", ['ngSanitize']);
app.controller("EventsController", EventsController);

function EventsController($scope) {
    $scope.showVolunteeringEvents = true;
    $scope.showOrdinaryEvents = true;

    $scope.cities = [
        new UvsCity(1, UvsCities.ODESSA, 'Одеса'),
        new UvsCity(2, UvsCities.KYIV, 'Київ'),
        new UvsCity(3, UvsCities.LVIV, 'Львів'),
        new UvsCity(4, UvsCities.OTHER, 'Інші міста')
    ];

    $scope.selectedCity;

    $scope.dateFormat = 'dd MMMM, HH:mm';

    getEvents()
        .done(response => {
            const eventDtos = response.map(o => o.fields);
            console.log('GET events success', eventDtos);

            $scope.events = eventDtos
                .filter(e => e.onSite)
                .map(e => new UvsEvent(e))
                .sort((a, b) => a.startsOn.isAfter(b.startsOn));
        })
        .fail(error => {
            console.log('GET events error', error);
        });
};
