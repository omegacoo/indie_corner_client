const fakeForums = [
    {
        title: 'One',
        id: 1,
        blurb: 'The first of many...'
    },
    {
        title: 'two',
        id: 2,
        blurb: 'The second of many...'
    },
    {
        title: 'three',
        id: 3,
        blurb: 'The third of many...'
    },
    {
        title: 'four',
        id: 4,
        blurb: 'The fourth of many...'
    },
    {
        title: 'five',
        id: 5,
        blurb: 'The fifth of many...'
    },
    {
        title: 'One',
        id: 6,
        blurb: 'The first of many...'
    },
    {
        title: 'two',
        id: 7,
        blurb: 'The second of many...'
    },
    {
        title: 'three',
        id: 8,
        blurb: 'The third of many...'
    },
    {
        title: 'four',
        id: 9,
        blurb: 'The fourth of many...'
    }
];

const fakePosts = [
    {
        user: 'Ben',
        content: 'This is Bens first post!',
        time: getCurrentTime(),
        id: 1
    },
    {
        user: 'Kris',
        content: 'This is the first post Kris made',
        time: getCurrentTime(),
        id: 2
    },
    {
        user: 'Riley',
        content: 'Riley cant read, her dad must have made this one',
        time: getCurrentTime(),
        id: 3
    },
    {
        user: 'Coco',
        content: 'Coco is a dog, who made this for her?',
        time: getCurrentTime(),
        id: 4
    },
    {
        user: 'Bill',
        content: 'Mr. Gates checking in',
        time: getCurrentTime(),
        id: 5
    },
];

function getCurrentTime(){
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    let dateTime = date + ' ' + time;

    return dateTime;
}

module.exports = {
    fakeForums,
    fakePosts
};