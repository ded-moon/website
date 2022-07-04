setInterval(() => {
    document.getElementById('time2').innerHTML = moment.tz('Europe/Bucharest').format('dddd, MMMM Do   HH:mm (hh:mm A) z')
}, 300)