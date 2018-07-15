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

//https://github.com/nglar/ngTouchend
angular.module("ngTouchend", []).directive("ngTouchend", function () {
    return {
        controller: function ($scope, $element, $attrs) {
            $element.bind('touchend', onTouchEnd);

            function onTouchEnd(event) {
                var method = $element.attr('ng-touchend');
                $scope.$event = event;
                $scope.$apply(method);
            };
        }
    };
});

//sanitize is for ng-bind-html directive (unsafe) ['ngSanitize']
let app = angular.module("app", ["ngTouchend"]);
app.controller("FriendsController", ['$scope', FriendsController]);

function FriendsController($scope) {
    $scope.donationLevels = [
        UVS_DONATION_LEVEL.SENIOR,
        UVS_DONATION_LEVEL.MIDDLE,
        UVS_DONATION_LEVEL.JUNIOR,
    ];

    $scope.getFriendsForDonationLevel = function (donationLevel) {
        return $scope.friends
            ? $scope.friends.filter(f => f.donationLevel === donationLevel)
            : [];
    };

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
