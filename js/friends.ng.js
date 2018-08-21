import { fakeUvsFriendsResponse } from './fakeApi.js';

const UVS_DONATION_LEVEL = {
    M: 'M',
    L: 'L',
    XL: 'XL'
};

class UvsFriend {

    constructor(dto) {
        this.id = dto.id;
        this.name = dto.name;
        this.description = dto.description;
        this.donationLevel = this.getUvsDonationLevel(dto.donationLevel);

        let facebook = dto.facebook;
        if (!facebook.startsWith('https://')) facebook = 'https://' + facebook;
        this.facebook = facebook;

        if (dto.image) this.imageUrl = dto.image[0].url;
    }

    getUvsDonationLevel(levelName) {
        return [
            UVS_DONATION_LEVEL.M,
            UVS_DONATION_LEVEL.L,
            UVS_DONATION_LEVEL.XL
        ].find(dl => dl === levelName);
    }

    getPreviewClass() {
        switch (this.donationLevel) {
            case UVS_DONATION_LEVEL.M: return 'friend-0-preview';
            case UVS_DONATION_LEVEL.L: return 'friend-1-preview';
            case UVS_DONATION_LEVEL.XL: return 'friend-2-preview';
        }
    }

    getHoveredClass() {
        switch (this.donationLevel) {
            case UVS_DONATION_LEVEL.M: return 'friend-0-hovered';
            case UVS_DONATION_LEVEL.L: return 'friend-1-hovered';
            case UVS_DONATION_LEVEL.XL: return 'friend-2-hovered';
        }
    }
}

function getFriends() {
    //GET friends from Airtable
    return $.get('https://uvscrm.herokuapp.com/get_uvs_friends');

    //IMPORTANT: this line fakes API response!
    //return $.Deferred().resolve(fakeUvsFriendsResponse).promise();
}

//Angularjs

//https://github.com/nglar/ngTouchend
angular.module("ngTouchend", []).directive("ngTouchend", function () {
    return {
        controller: function ($scope, $element, $attrs) {
            $element.bind('touchend', onTouchEnd);

            function onTouchEnd(event) {
                //for some reason Tilda passes TouchEvent in event.originalEvent property
                const originalEvent = event.originalEvent ? event.originalEvent : event;
                const isLinkClicked = originalEvent.path.some(e => e.href);
                if (isLinkClicked) return; //to prevent touchend statement execution

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
    //order is important, XL should be first
    $scope.donationLevels = [
        UVS_DONATION_LEVEL.XL,
        UVS_DONATION_LEVEL.L,
        UVS_DONATION_LEVEL.M,
    ];

    $scope.getFriendsForDonationLevel = function (donationLevel) {
        //for test
        //.map(f => {f.id = i++; f.donationLevel = donationLevel; return f;})
        return $scope.friends
            ? $scope.friends.filter(f => f.donationLevel === donationLevel)
            : [];
    };

    $scope.onFriendSelected = function (friend) {
        const selectedFriend = $scope.friends.find(f => f.infoIsVisible === true);
        $scope.friends.forEach(f => f.infoIsVisible = false);
        if (selectedFriend !== friend) friend.infoIsVisible = true; //if was touch on selected friend - not select again
    };

    $scope.resetSelectedFriend = function (event) {
        console.log(event);

        const originalEvent = event.originalEvent ? event.originalEvent : event;
        const isFriendClick = originalEvent.path.some(e => e.classList && e.classList.contains('friend-preview'));

        if (!isFriendClick) $scope.friends.forEach(f => f.infoIsVisible = false);
    };

    getFriends()
        .done(response => {
            const friends = response.map(o => o.fields).map(dto => new UvsFriend(dto));
            friends.forEach(f => f.infoIsVisible = false); //set infoIsVisible for all elements

            //because of AJAX call delay
            $scope.$evalAsync(() => {
                $scope.friends = friends;
            });
            console.log('GET friends success', response, friends);
        })
        .fail(error => {
            console.log('GET friends error', error);
        });
};
