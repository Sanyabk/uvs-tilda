//import { fakeEventsResponse } from './fakeApi.js';

//enums
const UvsEventTypes = {
    VOLUNTEERING: 'VOLUNTEERING',
    ORDINARY: 'ORDINARY'
};

const UvsCities = {
    ODESSA: 'ODESSA',
    KYIV: 'KYIV',
    LVIV: 'LVIV',
    OTHER: 'OTHER'
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

        this.startsOn = new Date(eventDto.startsOn);
        this.endsOn = eventDto.endsOn != null ? new Date(eventDto.endsOn) : null;

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
    return $.get('http://p.ptrvch.com/get_uvs_events');

    //IMPORTANT: this line fakes API response!
    //return $.Deferred().resolve(fakeEventsResponse).promise();;
}

//Angularjs

//sanitize is for ng-bind-html directive (unsafe)
let app = angular.module("app", ['ngSanitize']);
app.controller("EventsController", EventsController);

function EventsController($scope) {
    //constants
    $scope.dateFormat = 'dd MMMM, HH:mm';

    $scope.cities = [
        new UvsCity(1, UvsCities.ODESSA, 'Одеса'),
        new UvsCity(2, UvsCities.KYIV, 'Київ'),
        new UvsCity(3, UvsCities.LVIV, 'Львів'),
        new UvsCity(4, UvsCities.OTHER, 'Інші міста')
    ];

    //filtering
    $scope.showVolunteeringEvents = true;
    $scope.showOrdinaryEvents = true;
    $scope.selectedCity = $scope.cities[0];

    $scope.events = [];
    $scope.filteredEvents = [];

    $scope.thereAreFilteredEvents = () => $scope.filteredEvents.length > 0;
    $scope.thereAreEventsInSelectedCity = () => {
        const selectedCityName = $scope.selectedCity.name;
        return $scope.events.filter(e => e.cityName === selectedCityName).length > 0;
    }

    $scope.filterEvents = function () {
        const cityName = $scope.selectedCity.name;
        const shouldShowVolunteeringEvents = $scope.showVolunteeringEvents;
        const shouldShowOrdinaryEvents = $scope.showOrdinaryEvents;

        const notOtherCities = $scope.cities
            .map(c => c.name)
            .filter(name => name !== UvsCities.OTHER);

        let filterFunctions = {
            byCity: () => {
                return (notOtherCities.includes(cityName))
                    ? event => event.cityName === cityName
                    : event => !notOtherCities.includes(event.cityName)
            },
            isNotVolunteering: event => event.eventType !== UvsEventTypes.VOLUNTEERING,
            isNotOrdinaryEvent: event => event.eventType !== UvsEventTypes.ORDINARY
        }

        //filtering city and checkboxes
        let filteredEvents = $scope.events
            .filter(filterFunctions.byCity()); //should be called manually to return event city filtering function

        if (!shouldShowVolunteeringEvents) filteredEvents = filteredEvents.filter(filterFunctions.isNotVolunteering);
        if (!shouldShowOrdinaryEvents) filteredEvents = filteredEvents.filter(filterFunctions.isNotOrdinaryEvent);

        $scope.filteredEvents = filteredEvents;
    }

    getEvents()
        .done(response => {
            const now = new Date();
            const eventDtos = response.map(o => o.fields);
            $scope.events = eventDtos
                .filter(e => e.onSite)
                .map(e => new UvsEvent(e))
                .filter(e => e.startsOn > now)
                .sort((a, b) => a.startsOn > b.startsOn);

            $scope.filterEvents(); //manual filtering
            console.log('GET events success', eventDtos, $scope.events);
        })
        .fail(error => {
            console.log('GET events error', error);
        });
};
