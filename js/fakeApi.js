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

/* UVS Friends */

export const fakeUvsFriendsResponse = [
    {
        id: 1,
        name: "John Doe",
        cover: [
            {
                url: "https://sprogsyd.dk/wp-content/uploads/2017/07/476085198-1.jpg"
            }
        ],
        donationLevel: "JUNIOR",
        donationAmount: 25
    },
    {
        id: 2,
        name: "Mary Ann",
        cover: [
            {
                url: "https://sprogsyd.dk/wp-content/uploads/2017/07/476085198-1.jpg"
            }
        ],
        donationLevel: "MIDDLE",
        donationAmount: 125
    },
    {
        id: 3,
        name: "Pablo Escobar",
        cover: [
            {
                url: "https://sprogsyd.dk/wp-content/uploads/2017/07/476085198-1.jpg"
            }
        ],
        donationLevel: "SENIOR",
        donationAmount: 250
    },
]

