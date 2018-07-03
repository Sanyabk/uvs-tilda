import { fakeEventsResponse } from './fakeApi.js';

//Angularjs

//sanitize is for ng-bind-html directive (unsafe) ['ngSanitize']
let app = angular.module("app"); 
app.controller("FriendsController", ['$scope', '$location', FriendsController]);

function FriendsController($scope, $location) {
    
};
