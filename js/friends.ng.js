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

    $scope.getFriendImgClass = function (friend) {
        let cssClass = "friend-rounded "; //default class
        switch (friend.donationLevel) {
            case UvsDonationLevel.JUNIOR:
                cssClass += "friend-0";
                break;
            case UvsDonationLevel.MIDDLE:
                cssClass += "friend-1";
                break;
            case UvsDonationLevel.SENIOR:
                cssClass += "friend-2";
                break;
        }
        return cssClass;
    }
    getFriends()
        .done(response => {
            const friends = response.map(dto => new UvsFriend(dto));
            $scope.friends = friends;

            console.log('GET friends success', response, friends);
        })
        .fail(error => {
            console.log('GET friends error', error);
        });
};
