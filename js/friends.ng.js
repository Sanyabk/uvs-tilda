import { fakeUvsFriendsResponse } from './fakeApi.js';

const UVS_DONATION_LEVEL = {
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
            UVS_DONATION_LEVEL.JUNIOR,
            UVS_DONATION_LEVEL.MIDDLE,
            UVS_DONATION_LEVEL.SENIOR
        ].find(dl => dl === levelName);
    }

    getPreviewClass() {
        switch (this.donationLevel) {
            case UVS_DONATION_LEVEL.JUNIOR: return 'friend-0-preview';
            case UVS_DONATION_LEVEL.MIDDLE: return 'friend-1-preview';
            case UVS_DONATION_LEVEL.SENIOR: return 'friend-2-preview';
        }
    }

    getHoveredClass() {
        switch (this.donationLevel) {
            case UVS_DONATION_LEVEL.JUNIOR: return 'friend-0-hovered';
            case UVS_DONATION_LEVEL.MIDDLE: return 'friend-1-hovered';
            case UVS_DONATION_LEVEL.SENIOR: return 'friend-2-hovered';
        }
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
            case UVS_DONATION_LEVEL.JUNIOR:
                cssClass += "friend-0";
                break;
            case UVS_DONATION_LEVEL.MIDDLE:
                cssClass += "friend-1";
                break;
            case UVS_DONATION_LEVEL.SENIOR:
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
