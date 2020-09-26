const body = document.body;
const terms = document.getElementById('terms');
const spin = document.getElementById('spin');
const info = document.getElementById('info');
const greeting = document.getElementById('greeting');
const lever = document.getElementById('lever');
const lot1 = document.getElementById('1');
const lot2 = document.getElementById('2');
const lot3 = document.getElementById('3');
const userAccount = document.getElementById('account');
const addMoney = document.getElementById('addMoney');
const userBet = document.getElementById('bet');
const makeBet = document.getElementById('makeBet');
const userWin = document.getElementById('win');
const getWin = document.getElementById('getWin');

const inputs = info.querySelectorAll('.pop-up');
const outputs = info.querySelectorAll('p');
for (let i = 0; i < inputs.length; i++) {
    inputs[i].style.display = 'none';
    inputs[i].style.top = -outputs[i].getBoundingClientRect().height +'px';
    inputs[i].style.marginBottom = -outputs[i].getBoundingClientRect().height + 4 +'px';
}

const lots = ['chest.png', 'crown.png', 'diamond.png', 'ruby.png', 'emerald.png', 'gold-coin.png', 'silver-coin.png', 'coconut.png', 'starfish.png', 'butterfly.png', 'coconut-halve.png'];
const winCoef = [800, 200, 80, 40, 20, 10, 10, 0, 0, 0, 0]

let posArr = [];
let compareArr = [];

function makeSpin() {
    for (let i = 0; i < 3; i++) {
        posArr.push(lots[Math.round(Math.random()*10)])
        //console.log(posArr);
        compareArr = posArr;  
    }
    if (posArr.length == 3) {
        lot1.src = `img/${posArr[0]}`;
        lot2.src = `img/${posArr[1]}`;
        lot3.src = `img/${posArr[2]}`;
        posArr = [];  
    }
}

function blinkSpin () {
    let blink = setInterval(makeSpin, 200);
    setTimeout(() => {
        clearInterval(blink);
        makeSpin();
    }, 3000)
}

function countWin() {
    if (compareArr[0] == compareArr[1] == compareArr[2]) {
        for (let i = 0; i < winCoef.length; i++) {
            if (compareArr[0] == lots[i]) {
                userWin.innerText = +userWin.innerText + +userBet.innerText * winCoef[i];
                userBet.innerText = 0;
                userAccount.innerText = +userAccount.innerText + +userWin.innerText;
                setCookie('userWin', userAccount.innerText, 30);
                setCookie('test', 'test', 30);
            }
        }
    } else if (compareArr[0] == compareArr[1] || compareArr[0] == compareArr[2] || compareArr[1] == compareArr[2]) {
        if (compareArr[0] == 'gold-coin.png' || compareArr[1] == 'gold-coin.png') {
            userWin.innerText = +userWin.innerText + +userBet.innerText * 5;
            userBet.innerText = 0;
            userAccount.innerText = +userAccount.innerText + +userWin.innerText;
            setCookie('userWin', userAccount.innerText, 30);
            setCookie('test', 'test', 30);
        }
        else if (compareArr[0] == 'silver-coin.png' || compareArr[1] == 'siver-coin.png') {
            userWin.innerText = +userWin.innerText + +userBet.innerText * 5;
            userBet.innerText = 0;
            userAccount.innerText = +userAccount.innerText + +userWin.innerText;
            setCookie('userWin', userAccount.innerText, 30);
            setCookie('test', 'test', 30);
        }
    } else if (compareArr[0] == 'gold-coin.png' || compareArr[1] == 'gold-coin.png' || compareArr[2] == 'gold-coin.png' || compareArr[0] == 'silver-coin.png' || compareArr[1] == 'silver-coin.png' || compareArr[2] == 'silver-coin.png') {
        userWin.innerText = +userWin.innerText + +userBet.innerText * 2;
        userBet.innerText = 0;
        userAccount.innerText = +userAccount.innerText + +userWin.innerText;
        setCookie('userWin', userAccount.innerText, 30);
        setCookie('test', 'test', 30);
    } else { userBet.innerText = 0;}
}

lever.addEventListener('click', () => {
    if (+userBet.innerText <= 0) {
        alert("Сделай ставку!");
    } else {
    lever.style.backgroundPosition = '95% 68%'
    setTimeout(() => lever.style.backgroundPosition = '68% 64%', 1000)
    blinkSpin();
    }
    setTimeout(() => {
        //console.log(compareArr);
        countWin();
    }, 4000);
});

addMoney.addEventListener('click', () => {
    inputs[0].style.display = 'flex';
    let num = inputs[0].querySelector('input[type="number"]');

    num.addEventListener('input', () => {
        inputs[0].querySelector('input[type="button"]').addEventListener('click', () => {
            let account = num.value;
            console.log(account)
            userAccount.innerText = +userAccount.innerText + +account;
            num.value = '';
            inputs[0].style.display = 'none';
            setCookie('userWin', userAccount.innerText, 30);
        })  
    })
})

makeBet.addEventListener('click', () => {
    inputs[1].style.display = 'flex';
    let num = inputs[1].querySelector('input[type="number"]');

    num.addEventListener('input', () => {
        inputs[1].querySelector('input[type="button"]').addEventListener('click', () => {
            let bet = +num.value;
            console.log(bet)
            if (bet > 0 && bet%10 == 0 && +userAccount.innerText >= bet) {
            console.log(bet)
            userAccount.innerText = +userAccount.innerText - bet;
            userBet.innerText = +userBet.innerText + bet;
            num.value = '';
            inputs[1].style.display = 'none';
        }})  
    })
})

getWin.addEventListener('click', () => {
    inputs[2].style.display = 'flex';
    let num = inputs[2].querySelector('input[type="number"]');

    num.addEventListener('input', () => {
        inputs[2].querySelector('input[type="button"]').addEventListener('click', () => {
            let win = +num.value;
            console.log(win)
            if (+userWin.innerText >= win) {
            userWin.innerText = +userWin.innerText - win;
            userAccount.innerText = +userAccount.innerText - win;
            num.value = '';
            inputs[2].style.display = 'none';
            alert('Выигрыш перечислен на карту!')
        }})  
    })
})

// ==================================== COOKIES ============================================== //

function setCookie(name, val, exp) {
    let cook = name+'='+encodeURIComponent(val)+'; SameSite=None; Secure;'
    if (exp) {
        let date = new Date();
        date.setDate(date.getDate()+exp);
        cook += 'expires='+date.toUTCString();
    }
    document.cookie = cook;
}

function getCookie(name) {
    let cook = document.cookie;
    let ptn = new RegExp('\\b'+name+'=', 'g');
    if (ptn.test(cook)) {
        let val = ''
        let pos1 = cook.indexOf('=', cook.search(ptn))+1;
        let pos2 = cook.indexOf(';', pos1);
        if (pos2==-1) {
            val = cook.slice(pos1);
        } val = cook.slice(pos1, pos2);
        return decodeURIComponent(val);
    } else {
        return '';
    }
}
const regForm = document.forms.regForm;
const login = regForm.elements.login;
const password = regForm.elements.password;
const enter = regForm.elements.enter;

regForm.style.display = 'none';

if (getCookie('userLogin')) {
    greeting.innerHTML += `<p>Welcome, ${getCookie('userLogin')}!</p>`;
    if (getCookie('lastVisit')) {
        greeting.innerHTML += `<p>Last visit: ${getCookie('lastVisit')}</p>
                                <p>Saved money account: ${getCookie('userWin')}</p>`;
        userAccount.innerText = +userAccount.innerText + +getCookie('userWin');
    } else {
        let date = new Date();
        date.setDate(date.getDate()).toUTCString();
        setCookie('lastVisit', date, 30);
    }
    greeting.querySelector('button').addEventListener('click', () => {
        setCookie('userLogin', '', -30);
        setCookie('lastVisit', '', -30);
        setCookie('userWin', '', -30);
        location.reload();
    })
} else {
    regForm.style.display = 'flex';
    enter.addEventListener('click', (event) => {
        if(login.value){
            console.log(login.value)
            setCookie('userLogin', login.value, 30);
            setCookie('lastVisit', 'today', 30);
        }
        location.reload();
    })
}

// ----------------- For Chrome (cause it doesn't save local cookies) ------------------ //

// regForm.style.display = 'flex';
// enter.addEventListener('click', () => {
//     if (login.value) {
//         regForm.style.display = 'none';
//     }
// })
