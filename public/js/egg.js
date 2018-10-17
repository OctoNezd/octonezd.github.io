console.log("What are you doing here? Excepting to find easter egg? There is none. Trust me.")
var eggcounter = 0
function easterEgg() {
    eggcounter++
    if (eggcounter > 42) {
        console.log("Argh, fine, here is your egg: 🥚 ")
        console.log("Were these 84 key presses worth it?")
        eggcounter = 0
    } else {
        console.log("I think I CLEARLY said there is no easter eggs here.")        
    }
}
function konami(callback) {
    let kkeys = [];
    // up,up,down,down,left,right,left,right,B,A
    const konami = '38,38,40,40,37,39,37,39,66,65';
    return event => {
        kkeys.push(event.keyCode);
        if (kkeys.toString().indexOf(konami) >= 0) {
            callback();
            kkeys = [];
        }
    };
}
const handler = konami(() => {
    location.href = "https://media.giphy.com/media/8rZrhVEaq6Cbe/giphy.gif"
});
window.addEventListener('keydown', handler);
window.addEventListener('keydown', konami(() => {
    console.log('konami 2');
}));