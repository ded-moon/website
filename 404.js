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
    'Nope.',
    'Call tech support',
    'Call tech support maybe?',
    'Why are you here?',
    'Search deeper maybe',
    'This page was wiped from the face of the earth',
    'The page you\'re trying to reach no longer exists',
    'The page you\'re trying to reach no longer exists.',
    'ʕっ• ᴥ • ʔっ',
    'Quote of the day: "if it ain\'t broke, don\'t try to fix it"',
    'empty',
    'don\'t listen to them, this place is empty',
    'Too late to go back?',
    'Portal 2 best game',
    '\"Get become.\"',
    'There\'s nothing else here',
    'These T-Shirts were tested on animals. They didn\'t fit.',
    'Sub Pod®',
    '\"Before time comes time.\"',
    '\"ฅ^•ﻌ•^ฅ\"',
    '\"ฅ^•ﻌ•^ฅ\"(looks like he broke it again!)',
    'It\'s pointless to keep on gonig, there\'s nothing left here.',
    'How did you get here?',
    'uhh',
    '1453',
    '7 ate 9',
    'go home',
    'go to https://trblwlf.net/ , it\'s a way better website',
    'go to: https://trblwlf.net/ , it\'s a way better website',
    '\"it\'s not out of the question that you might have a very minor case of serious brain damage.\"',
    '\"Oh. Hi. So... How are you holding up? Because I’m a potato!\"',
    '\"Federal regulations require me to warn you that this next test chamber... is looking pretty good."',
    "b̶͓̃",
    'error 404, error mesage not found',
    'Stay Spicy',
    'StaySpicy',
    'Tf is Project Vidra?'
]
function newMessage() {
        if (window.location.pathname.includes("admin")) { //hehe
            document.getElementById("messageDisplay").textContent = "Admin access denied. Session information logged.";
        }
        else {
        var randomNumber = Math.floor(Math.random() * (messages.length));
        document.getElementById('messageDisplay').innerHTML = messages[randomNumber];
        }

        document.getElementById("timestamp").textContent = new Date().toLocaleString();
        document.getElementById("sessionID").textContent =  'R' + randomNumber + '_' + Math.random().toString(36).substr(2, 8).toUpperCase();
}