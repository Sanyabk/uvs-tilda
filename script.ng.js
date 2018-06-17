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
        this.endsOn = new Date(eventDto.endsOn);

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

//Angularjs

//sanitize is for ng-bind-html directive (unsafe)
let app = angular.module("app", ['ngSanitize']);
app.controller("EventsController", EventsController);

function EventsController($scope) {
    //constants
    $scope.dateFormat = 'dd MMMM, HH:mm';

    //filtering
    $scope.showVolunteeringEvents = true;
    $scope.showOrdinaryEvents = true;
    $scope.selectedCityName;

    $scope.cities = [
        new UvsCity(1, UvsCities.ODESSA, 'Одеса'),
        new UvsCity(2, UvsCities.KYIV, 'Київ'),
        new UvsCity(3, UvsCities.LVIV, 'Львів'),
        new UvsCity(4, UvsCities.OTHER, 'Інші міста')
    ];
    $scope.filteredEvents = [];

    $scope.filterEvents = function () {
        const cityName = $scope.selectedCityName;
        const shouldShowVolunteeringEvents = $scope.showVolunteeringEvents;
        const shouldShowOrdinaryEvents = $scope.showOrdinaryEvents;

        //filtering by date, city and checkboxes
        const now = new Date();
        let filteredEvents = $scope.events
            .filter(e => e.cityName === cityName)
            .filter(e => e.startsOn > now);

        if (!shouldShowVolunteeringEvents) {
            filteredEvents = filteredEvents.filter(e => e.eventType !== UvsEventTypes.VOLUNTEERING);
        }
        if (!shouldShowOrdinaryEvents) {
            filteredEvents = filteredEvents.filter(e => e.eventType !== UvsEventTypes.ORDINARY);
        }

        $scope.filteredEvents = filteredEvents;
    }

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
