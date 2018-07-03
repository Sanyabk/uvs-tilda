import { fakeUvsFriendsResponse } from './fakeApi.js';

const UvsDonationLevel = {
    JUNIOR: 'JUNIOR',
    MIDDLE: 'MIDDLE',
    SENIOR: 'SENIOR'
};

class UvsFriend {

    constructor(dto) {
        this.id = dto.id;
        this.name = dto.name;
        this.imageUrl = dto.cover[0].url;
        this.donationLevel = this.getUvsDonationLevel(dto.donationLevel);
        this.donationAmount = dto.donationAmount;
    }
    
    getUvsDonationLevel(levelName) {
        return [
            UvsDonationLevel.JUNIOR, 
            UvsDonationLevel.MIDDLE, 
            UvsDonationLevel.SENIOR
        ].find(dl => dl === levelName);
    }
}


function getFriends() {
    //GET friends from Airtable
    //return $.get(URL_TO_REPLACE);

    //IMPORTANT: this line fakes API response!
    return $.Deferred().resolve(fakeUvsFriendsResponse).promise();
}

//Angularjs

//sanitize is for ng-bind-html directive (unsafe) ['ngSanitize']
let app = angular.module("app", []);
app.controller("FriendsController", ['$scope', FriendsController]);

function FriendsController($scope) {
    $scope.message = 'Hello, UVS friend!';

    getFriends()
        .done(response => {
            const friends = response.map(dto => new UvsFriend(dto));
            console.log('GET friends success', response, friends);
        })
        .fail(error => {
            console.log('GET friends error', error);
        });
};
