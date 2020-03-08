(function () {
    let nav = document.querySelector('.nav');
    let closeBtn = nav.querySelector('.close');
    let menu = document.querySelector('.header__menu-btn');
    closeBtn.addEventListener('click', ()=>{
        nav.style.right = '-530px';
    });
    menu.addEventListener('click', ()=>{
        nav.style.right = '0px';
    });
}());
let nav = document.querySelector('.nav');
let navDateHeader = nav.querySelector('.nav__date-header');
let navDate = nav.querySelector('.nav__date');
let navCountry = nav.querySelector('.nav__country');
let navType = nav.querySelector('.nav__type-wrapper');
let datePicker = nav.querySelector('.date-picker-area');
let footerContact = nav.querySelector('.footer__contact');
navDateHeader.addEventListener('click', ()=>{
   // footerContact.classList.toggle('none');
   datePicker.classList.toggle('none');
   navType.classList.toggle('none');
   navCountry.classList.toggle('none');
   navDate.classList.toggle('width280');
});


function createCalendar(id, year, month) {

    var div = document.getElementById(id);

    var date = new Date(year, month);
    var lastMonthDate = new Date(date.getFullYear(), (date.getMonth() + 1), 0);
    var lastMonthDay = lastMonthDate.getDate();
    var firstMonthDay = date;
    firstMonthDay.setDate(1);
    // var differenceDay = lastMonthDay - date.getDate();

    var arrMonth = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
    ]


    function createHeaderCal () {
        var table = document.createElement("table");
        table.setAttribute("cols", 7);
        var caption = document.createElement("caption");
        var currentMonth = date.getMonth();
        caption.textContent = arrMonth[currentMonth] + " " + date.getFullYear();
        var tbody = document.createElement("tbody");
        var tr = document.createElement("tr");

        var arrDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

        for (var i = 0; i < 7; i++) {
            var th = document.createElement("th");
            if (i === 5 || i === 6) {
                th.className = "dayOff";
            }
            th.textContent = arrDays[i];
            tr.appendChild(th);
        }

        tbody.appendChild(tr);
        table.appendChild(caption);
        table.appendChild(tbody);
        div.appendChild(table);
    }
    createHeaderCal();


    function checkOfRows(date) {

        var a = firstMonthDay.getDay();
        a = (a !== 0) ? a : 7;
        console.log("первый день месяца - " + a);

        // проверка на высокосный год

        function checkleapYear() {
            if ( (lastMonthDay === 28) && (a === 1) ) {
                return 4;
            } else if ( ((lastMonthDay === 31) && (a === 6)) ||
                ((lastMonthDay === 30) && (a === 7)) ||
                ((lastMonthDay === 31) && (a === 7))    ) {
                return 6;
            } else {
                return 5;
            }
        }

        console.log("количество строк в календаре = " + checkleapYear());

        var objFirstMonthDay = {
            firstMonthDay: a,
            quantytysRows: checkleapYear()
        };
        return objFirstMonthDay;
    }
    // checkOfRows(date);

    function createBodyCal() {

        var quantytysRows = +checkOfRows(date).quantytysRows;
        var dayOfWeek = checkOfRows(date).firstMonthDay;
        var tbody = document.getElementsByTagName("tbody")[0];
        var q = 1;
        var v = 1;

        for (var i = 0; i < quantytysRows; i++) {
            var tr = document.createElement("tr");
            for (var n = 0; n < 7; n++) {
                var td = document.createElement("td");
                if (n === 5 || n === 6) {
                    td.className = "dayOff";
                }
                if ( (q >= dayOfWeek) && (v <= lastMonthDay) ) {
                    td.textContent = v;
                    console.log("q = " + q + "; v = " + v);
                    v++;
                } else {
                    td.textContent = " ";
                }

                tr.appendChild(td);
                q++;
            }
            tbody.appendChild(tr);
        }
    }

    createBodyCal()
}

var year  = /* prompt("Введите интересующий Вас год", " */2020/* ") */;
var month  = /* +prompt("Введите интересующий Вас месяц", " */2/* ") - 1 */;

function right() {
    var a = document.getElementById("cal");
    a.innerHTML = "";
    month = month + 1;
    createCalendar("cal", year, month);
}

function left() {
    var a = document.getElementById("cal");
    a.innerHTML = "";
    month = month - 1;
    createCalendar("cal", year, month);
}

createCalendar("cal", year, month);

