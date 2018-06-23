import { fakeEventsResponse } from './fakeApi.js';

const CITY_NAME_KEY = 'cityName'; //for localStorage

const UvsCities = {
    ODESSA: 'ODESSA',
    KYIV: 'KYIV',
    LVIV: 'LVIV',
    OTHER: 'OTHER'
}

class UvsCity {
    constructor(id, name, localName) {
        this.id = id;
        this.name = name;
        this.localName = localName;
    }
}

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
    return $.Deferred().resolve(fakeEventsResponse).promise();
}

const selectedCity = {
    get: (cities) => {
        let city = cities[0]; //default

        const cityName = localStorage.getItem(CITY_NAME_KEY);
        if (cityName != null) {
            const lastSelectedCity = cities.find(c => c.name === cityName);
            if (lastSelectedCity == null) {
                localStorage.clear(); //default city is 0 element, just clearing localStorage
            }
            else {
                city = lastSelectedCity;
            }
        }

        return city;
    },
    set: (cityName) => {
        localStorage.setItem(CITY_NAME_KEY, cityName);
    }
}

//Angularjs

//sanitize is for ng-bind-html directive (unsafe)
let app = angular.module("app", ['ngSanitize']);
app.controller("EventsController", ['$scope', '$location', EventsController]);

function EventsController($scope, $location) {
    //constants
    $scope.dateFormat = 'dd MMMM, HH:mm';

    //cities
    $scope.cities = [
        new UvsCity(1, UvsCities.ODESSA, 'Одеса'),
        new UvsCity(2, UvsCities.KYIV, 'Київ'),
        new UvsCity(3, UvsCities.LVIV, 'Львів'),
        new UvsCity(4, UvsCities.OTHER, 'Інші міста')
    ];

    $scope.getCityLinkClass = function (city) { return $scope.selectedCity.name == city.name ? 'active' : 'uvs-link'; }
    $scope.selectCity = function (city) {
        $scope.selectedCity = city;
        selectedCity.set(city.name);
        filterEvents();
    }

    //events
    $scope.eventSections = [];
    let events = [];

    let filterEvents = () => {
        const cityName = $scope.selectedCity.name;
        selectedCity.set(cityName);
        $location.search('city', cityName);

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

        //make eventSections
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
    
    let initializeCity = () => {
        const urlParams = $location.search();
        if (urlParams && urlParams.city) {
            selectedCity.set(urlParams.city);
        }

        $scope.selectedCity = selectedCity.get($scope.cities);
        filterEvents();
    }

    initializeCity(); //now it's only initializes on page start, not every time URL is changed

    getEvents()
        .done(response => {
            const now = new Date();
            const eventDtos = response.map(o => o.fields);
            events = eventDtos
                .filter(e => e.onSite)
                .map(e => new UvsEvent(e))
                .filter(e => e.startsOn > now)
                .sort((a, b) => a.startsOn > b.startsOn);

            $scope.$apply(filterEvents); //manual filtering and apply because of AJAX call delay
            console.log('GET events success', eventDtos, events);
        })
        .fail(error => {
            console.log('GET events error', error);
        });
};
