const kindGuestDto = {
    fields: {
        cityName: "ODESSA",
        cover: [
            {
                url: "https://dl.airtable.com/wpF5oUaZR0uoqBlKsDzL_bsDbgnerQlGO4ckT4ioe_full_tkavlbk.jpg"
            }
        ],
        description: "<p>ODESSA Проект допомагає літнім людям продуктовими наборами та простою увагою, для самотніх літніx людей будь-яка турбота — справжня подія.</p>",
        endsOn: "2018-07-16T14:00:00.000Z",
        eventType: "VOLUNTEERING",
        id: 14,
        onSite: true,
        placeHref: "https://goo.gl/maps/AVG8oti84kD2",
        placeName: "Штаб (Жуковського, 21)",
        priceInfo: "FREE",
        startsOn: "2018-07-16T09:00:00.000Z",
        title: "Добрий Гість",
        urlAbout: "http://volunteer.country/dobriygist",
        urlToAttend: "http://volunteer.country/dobriygist"
    }
};

const kindGuestOrdinaryDto = {
    fields: {
        cityName: "ODESSA",
        cover: [
            {
                url: "https://dl.airtable.com/wpF5oUaZR0uoqBlKsDzL_bsDbgnerQlGO4ckT4ioe_full_tkavlbk.jpg"
            }
        ],
        description: "<p>ODESSA Проект допомагає літнім людям продуктовими наборами та простою увагою, для самотніх літніx людей будь-яка турбота — справжня подія.</p>",
        endsOn: "2018-07-16T14:00:00.000Z",
        eventType: "ORDINARY",
        id: 14,
        onSite: true,
        placeHref: "https://goo.gl/maps/AVG8oti84kD2",
        placeName: "Штаб (Жуковського, 21)",
        priceInfo: "FREE",
        startsOn: "2018-07-16T09:00:00.000Z",
        title: "Добрий Гість",
        urlAbout: "http://volunteer.country/dobriygist",
        urlToAttend: "http://volunteer.country/dobriygist"
    }
};

export const fakeEventsResponse = [
    kindGuestDto, kindGuestDto, kindGuestDto,
    kindGuestOrdinaryDto, kindGuestOrdinaryDto,
    {
        fields: {
            cityName: "LVIV",
            cover: [
                {
                    url: "https://dl.airtable.com/wpF5oUaZR0uoqBlKsDzL_bsDbgnerQlGO4ckT4ioe_full_tkavlbk.jpg"
                }
            ],
            description: "<p>LVIV Проект допомагає літнім людям продуктовими наборами та простою увагою, для самотніх літніx людей будь-яка турбота — справжня подія.</p>",
            endsOn: "2018-07-16T14:00:00.000Z",
            eventType: "ORDINARY",
            id: 15,
            onSite: true,
            placeHref: "https://goo.gl/maps/AVG8oti84kD2",
            placeName: "Штаб (Жуковського, 21)",
            priceInfo: "FREE",
            startsOn: "2018-07-16T09:00:00.000Z",
            title: "Добрий Гість",
            urlAbout: "http://volunteer.country/dobriygist",
            urlToAttend: "http://volunteer.country/dobriygist"
        }
    },
    {
        fields: {
            cityName: "KHERSON",
            cover: [
                {
                    url: "https://dl.airtable.com/wpF5oUaZR0uoqBlKsDzL_bsDbgnerQlGO4ckT4ioe_full_tkavlbk.jpg"
                }
            ],
            description: "<p>KHERSON Проект допомагає літнім людям продуктовими наборами та простою увагою, для самотніх літніx людей будь-яка турбота — справжня подія.</p>",
            endsOn: "2018-07-16T14:00:00.000Z",
            eventType: "ORDINARY",
            id: 15,
            onSite: true,
            placeHref: "https://goo.gl/maps/AVG8oti84kD2",
            placeName: "Штаб (Жуковського, 21)",
            priceInfo: "FREE",
            startsOn: "2018-07-16T09:00:00.000Z",
            title: "Добрий Гість",
            urlAbout: "http://volunteer.country/dobriygist",
            urlToAttend: "http://volunteer.country/dobriygist"
        }
    },
    {
        fields: {
            cityName: "DNEPR",
            cover: [
                {
                    url: "https://dl.airtable.com/wpF5oUaZR0uoqBlKsDzL_bsDbgnerQlGO4ckT4ioe_full_tkavlbk.jpg"
                }
            ],
            description: "<p>DNEPR Проект допомагає літнім людям продуктовими наборами та простою увагою, для самотніх літніx людей будь-яка турбота — справжня подія.</p>",
            endsOn: "2018-07-16T14:00:00.000Z",
            eventType: "VOLUNTEERING",
            id: 15,
            onSite: true,
            placeHref: "https://goo.gl/maps/AVG8oti84kD2",
            placeName: "Штаб (Жуковського, 21)",
            priceInfo: "FREE",
            startsOn: "2018-07-16T09:00:00.000Z",
            title: "Добрий Гість",
            urlAbout: "http://volunteer.country/dobriygist",
            urlToAttend: "http://volunteer.country/dobriygist"
        }
    }
];

const names = [
    "John Doe",
    "Mary Ann",
    "Pablo Escobar",
    "Blablabla carcarcarcar",
];

const descriptions = [
    "Cartel Leader",
    "Social Fighter",
    "Business Analyst",
];

const avatars = [
    "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg",
    "https://www.w3schools.com/howto/img_avatar2.png",
    "https://freeiconshop.com/wp-content/uploads/edd/person-flat.png",
    "http://img.charahub.com/c318070_b167721e753dc044cc6a77e3c3a3e395.jpg",
    "https://pm1.narvii.com/6776/9df16f93193829360c081acc6b93e553cd1c36f3v2_hq.jpg",

];

const donationLevels = [
    "XL",
    "L",
    "M",
]
function getRandomElement(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

function getRandomFriend() {
    
    const name = getRandomElement(names);
    const description = getRandomElement(descriptions);
    const avatar = getRandomElement(avatars);
    const donationLevel = getRandomElement(donationLevels);

    const friend = {
        fields: {
            id: 3,
            name: name,
            description: description,
            image: [
                {
                    url: avatar
                }
            ],
            donationLevel: donationLevel,
            facebook: "https://www.facebook.com/akhiora",
        }
    };
    return friend;
}

/* UVS Friends */
const multiplyObject = (obj, times) => {
    let objs = [];

    for (let i = 0; i < times; i++) {
        objs.push(obj);
    }

    return objs;
}

export const fakeUvsFriendsResponse = [
    ...multiplyObject(getRandomFriend(), 10),
    ...multiplyObject(getRandomFriend(), 10),
    ...multiplyObject(getRandomFriend(), 10),
    ...multiplyObject(getRandomFriend(), 10),
    ...multiplyObject(getRandomFriend(), 10),
    ...multiplyObject(getRandomFriend(), 10),
    ...multiplyObject(getRandomFriend(), 10),
    ...multiplyObject(getRandomFriend(), 10),
    ...multiplyObject(getRandomFriend(), 10),
    ...multiplyObject(getRandomFriend(), 10),
    ...multiplyObject(getRandomFriend(), 10),
    ...multiplyObject(getRandomFriend(), 10),
]

