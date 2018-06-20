import { fakeEventsResponse } from './fakeApi.js';

//enums

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
        this.eventType = eventDto.eventType; //TODO: should be deleted

        this.cityName = eventDto.cityName;
        this.placeName = eventDto.placeName;
        this.placeHref = eventDto.placeHref;

        this.urlToAttend = eventDto.urlToAttend;
        this.urlAbout = eventDto.urlAbout;
    }
}

function getEvents() {
    //GET events from Airtable
    //return $.get('https://uvscrm.herokuapp.com/get_uvs_events');

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

    $scope.cities = [
        new UvsCity(1, UvsCities.ODESSA, 'Одеса'),
        new UvsCity(2, UvsCities.KYIV, 'Київ'),
        new UvsCity(3, UvsCities.LVIV, 'Львів'),
        new UvsCity(4, UvsCities.OTHER, 'Інші міста')
    ];

    //filtering
    let events = [];

    $scope.selectedCity = $scope.cities[0];


    $scope.filterEvents = function () {
        const cityName = $scope.selectedCity.name;

        const notOtherCities = $scope.cities
            .map(c => c.name)
            .filter(name => name !== UvsCities.OTHER);

        let filterFunctions = {
            byCity: () => {
                return (notOtherCities.includes(cityName))
                    ? event => event.cityName === cityName
                    : event => !notOtherCities.includes(event.cityName)
            }
        }

        //filtering city and checkboxes
        let cityEvents = events.filter(filterFunctions.byCity());

        const ordinaryEvents = cityEvents.filter(c => c.eventType === "ORDINARY");
        const volunteeringEvents = cityEvents.filter(c => c.eventType === "VOLUNTEERING");

        $scope.eventSections = [
            {
                sectionName: 'Можливості',
                events: volunteeringEvents
            },
            {
                sectionName: 'Події',
                events: ordinaryEvents
            }
        ]
    }

    getEvents()
        .done(response => {
            const now = new Date();
            const eventDtos = response.map(o => o.fields);
            events = eventDtos
                .filter(e => e.onSite)
                .map(e => new UvsEvent(e))
                .filter(e => e.startsOn > now)
                .sort((a, b) => a.startsOn > b.startsOn);

            $scope.filterEvents(); //manual filtering
            console.log('GET events success', eventDtos, events);
        })
        .fail(error => {
            console.log('GET events error', error);
        });
};
