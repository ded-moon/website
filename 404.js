var messages = [
    'Not found',
    'Not found',
    'Not found',
    'Not found',
    'Not found',
    'Not found.',
    'Not here',
    'huh?',
    'This page doesn\'t exist',
    'Maybe try again?',
    'You\'re lost',
    'Nope',
    'Nope.',
    'nope',
    'nope.',
    'Yes',
    'Call tech support',
    'Call tech support maybe?',
    'Why are you here?',
    '\"Oh. Hi. So... How are you holding up?',
    'Search deeper maybe',
    'This page was wiped from the face of the earth',
    'The page you\'re trying to reach no longer exists',
    'The page you\'re trying to reach no longer exists.',
    '?',
    'ʕっ• ᴥ • ʔっ (it\'s ok, he\'s here if you nead a hug)',
    ':(',
    'ʕっ• ᴥ • ʔっ',
    'Quote of the day. "if it ain\'t broke, don\'t try to fix it"',
    'empty',
    'No.',
    'don\'t listen to them, this place is empty',
    'Too late to go back?',
    'Portal 2 best game?',
    'Get become.',
    'There\'s nothing else here',
    'These T-Shirts were tested on animals. They didn\'t fit.',
    'Sub Pod®',
    '\"Before time comes time.\"',
    '\"ฅ^•ﻌ•^ฅ\"',
    '\"ฅ^•ﻌ•^ฅ\"(looks like he broke it again!)',
    'It\'s pointless to keep on gonig, there\'s nothing left here.',
    'How did you get here?',
    'uhhhhhhh',
    'uhh',
    'uh',
    '1453',
    '7 ate 9',
    'go home',
    'go to https://trblwlf.tk/ , it\'s a way better website',
    'go to: https://trblwlf.tk/ , it\'s a way better website',
    "\"-_-\"",
    "-_-",
    "....",
    "...",
    "..",
    ".",
    ",",
    "\" \"",
    "Are you lost?",
    "Do you nead help?",
    'Oh no, not again!',
    '\"it\'s not out of the question that you might have a very minor case of serious brain damage.\"',
    "b̶͓̃",
    'error 404, error mesage not found',
]
function newMessage() {
        var randomNumber = Math.floor(Math.random() * (messages.length));
        document.getElementById('messsageDisplay').innerHTML = messages[randomNumber];
}