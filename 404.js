var messages = [
    'Not found',
    'This page doesn\'t exist',
    'You\'re lost',
    'Nope',
    'nope',
    'Yes',
    'Why are you here?',
    'How did you end up here?',
    '\"Oh. Hi. So. How are you holding up? BECAUSE I\'M A POTATO.\"',
    'Search deeper maybe',
    'This page was wiped from the face of the earth',
    'The page you\'re trying to reach no longer exists',
    'Why are you here?',
    'Where are we?',
    '?',
    'Lost, lost, lost',
    '(:',
    '):',
    ':)',
    ':(',
    'The Big Oof',
    'Quote of the day. "if it ain\'t broke, don\'t try to fix it"',
    'Reconsider your brain',
    'Hardcore Gay Yiff',
    'God is Dead, and we have Killed Him',
    'DED_MOON was here',
    'Tarball was here',
    'No.',
    'Death.',
    'zaoiofjipiwpiafwaisafhulwfhwqqwuljk',
    'Too late to go back',
    'Portal 2 best game',
    'Get become.',
    'These T-Shirts were tested on animals. They didn\'t fit.',
    '1986',
    'Oh f*ck',
    'A lot of people are furries, they just don\'t know it yet. ',
    'YIFF at 16K RESOLUTION?? - HOLY $H!T',
    'Hexinity is a cutie',
    'Tarball is a cutie',
    'Maws',
    'Try dying',
    '\"Pretend to be losing and, some day, your enemy will be your imaginary girlfriend.\"',
    'Sub Pod®',
    'Sub Pat®',
    'Remember that what can go wrong, will go wrong.',
    '\"Your time on this earth is imaginary.\"',
    '\"If you really need an abortion, transform.\"',
    '\"Insanity, the best medicine?\"',
    '\"If you lose your mind, let it die.\"',
    '\"We can make our physical bodies become history.\"',
    '\"When will we figure out how to moisturize souls?\"',
    '\"Existence is all about being brain-damaged.\"',
    '\"Your fear of death means nothing to anyone.\"',
    '\"Touch a legal clown.\"',
    '\"Before time comes time.\"',
    '\"Don\'t be angry, just ask your parents.\"',
    'Tarball was here',
    'It\'s pointless to keep on gonig, there\'s nothing left here.',
    '\"The definition of optimism is behaving like a clown in a way that is different, but similar.\"',
    'Do you like potatoes?',
    'How did you get here?',
    'What did you do?',
    'What did you do this time?',
    'uhh',
    'You weren\'t suposed to see this..',
    'oh, well this is a mess...',
    'aaa aaaa AAAAAAAAAAAAAAAAA',
    '1453',
    '476',
    'go home',
    'go to https://trblwlf.tk/ , it\'s a way better website',
    'banana',
    'This is an employee only area',
    "...",
    "Get oUT",
    "Are you lost?",
    "Do you nead help?",
    "\"ear blind\"",
    'Oh no, not again!',
    'What did you break this time?',

]
function newMessage() {
        var randomNumber = Math.floor(Math.random() * (messages.length));
        document.getElementById('messsageDisplay').innerHTML = messages[randomNumber];
}