export const formatTeam = (teamData) => {
    const team = teamData.reduce((prev, curr) => {
        return {
            ...prev,
            [curr.event_index]: {
                event_title: curr.event_title,
                event_index: curr.event_index,
                team: []
            }
        };
    }, {});

    teamData.forEach((person) => {
        team[person.event_index].team.push(person);
    });

    Object.keys(team).forEach((event) => {
        team[event].team = team[event].team.reduce((prev, curr) => {
            return {
                ...prev,
                [curr.category_order]: {
                    category_order: curr.category_order,
                    category_title: curr.category_title,
                    people: []
                }
            };
        }, {});
    });

    teamData.forEach((person) => {
        team[person.event_index].team[person.category_order].people.push(person);
    });

    return team;
};

export const formatSpeakers = (speakerData) => {
    const speakers = speakerData.reduce((prev, curr) => {
        return {
            ...prev,
            [curr.event_index]: {
                event_title: curr.event_title,
                event_index: curr.event_index,
                people: []
            }
        };
    }, {});

    speakerData.forEach((speaker) => {
        speakers[speaker.event_index].people.push(speaker);
    });
    return speakers;
};

export const formatEvents = (eventData) => {
    const events = eventData.reduce((prev, curr) => {
        return {
            ...prev,
            [curr.index]: curr
        };
    }, {});

    return events;
};

export const formatCircles = (circleData) => {
    const circles = circleData.reduce((prev, curr) => {
        return {
            ...prev,
            [curr.index]: curr
        };
    }, {});

    return circles;
};

export const formatSponsors = (sponsorData) => {
    const sponsors = sponsorData.reduce((prev, curr) => {
        return {
            ...prev,
            [curr.category_order]: {
                category_order: curr.category_order,
                category_title: curr.category_title,
                brands: []
            }
        };
    }, {});

    sponsorData.forEach((sponsor) => {
        sponsors[sponsor.category_order].brands.push(sponsor);
    });
    return sponsors;
};
export const formatHome = (homeData) => {
    return homeData.length && homeData[0];
};
export const formatSocial = (socialData) => {
    return socialData;
};

export const formatAbout = (aboutData) => {
    return aboutData.length && aboutData[0];
};
