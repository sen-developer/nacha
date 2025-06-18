let content =
    `101TANTANTANTANNNNNNNNA23011300000094101Bank Of Guam           Eank Of Guam                   
5200Bob's Manufactur                    881234567 PPDBILL            MYDATE   1026009590000001
62792600959311               PAYMENTAMOrb1            Rob Burton              0026009590000001
711|YEAR|TT|PE|                                                           Some data end0000000
822ADENDA50013004795000000018995000000018996TINTINT                           026009590000001
9000001000001000000050013004795000000018995000000018996                                       
9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999

`;

const form = document.getElementById('myForm');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const paramsObject = Object.fromEntries(urlParams.entries());

const a = document.createElement("a");
const create = document.getElementById("create");
const body = document.querySelector("body");
const periodSelector = document.querySelector("#period");

addPeriods(periodSelector);

a.innerText = "Download";
a.download = "nacha.txt";

create.addEventListener("click", (e) => {
    e.preventDefault();
    replaceContent(content, a, paramsObject);
});

body.append(a);

if(paramsObject?.tin && paramsObject?.accountFrom && paramsObject?.accountTo){
    document.body.style.display = "none";
    create.click();
    new Promise(resolve => setTimeout(resolve, 1000))
        .then(()=> {
            window.history.back();
        });
}

function getDataFromForm(){
    let tmp = {};
    const formData = new FormData(form);
    formData?.forEach((value, key) => {
        tmp[key] = value;
    });

    tmp = setParams(tmp);

    return tmp;
}

function setParams(param){
    const tmp = {...param};

    if(tmp?.amount){
        const amountOfPayment = tmp.amount.replace(".", "")
        tmp.amount = "0".repeat(10 - amountOfPayment.length) + amountOfPayment;
    }

    if(tmp?.dateCredited){
        tmp.dateCredited = tmp.dateCredited.replaceAll("-","").slice(2);
    }

    return tmp;
}

function replaceContent(content, a){

    const data = paramsObject ? setParams(paramsObject) : getDataFromForm();

    let tmpContent = content;

    if(data?.accountFrom?.length === 10 && data?.accountTo?.length === 10){
        tmpContent = tmpContent.replace("ANNNNNNNNA", data.accountFrom);
        tmpContent = tmpContent.replace("TANTANTANT", data.accountTo);
    }

    if(data?.tin?.length === 8){
        tmpContent = tmpContent.replace("TINTINT", data.tin);
    }

    if(data?.bankName?.length<=23){
        tmpContent = tmpContent.replace("Bank Of Guam           ", data.bankName + " ".repeat(23-data.bankName.length));
    }

    if(data?.amount){
        tmpContent = tmpContent.replace("PAYMENTAMO", data.amount);
    }

    if(data?.dateCredited){
        tmpContent = tmpContent.replace("MYDATE", data.dateCredited);
    }

    if(data?.transactionId?.length == 6){
        tmpContent = tmpContent.replace("ADENDA", data.transactionId);
    }

    if(data?.year){
        tmpContent = tmpContent.replace("YEAR", data.year);
    }

    if(data?.taxType){
        tmpContent = tmpContent.replace("TT", data.taxType);
    }

    if(data?.period){
        tmpContent =
            tmpContent.replace("PE|                                                           ", data.period + "|" + " ".repeat(61 - data.period.length));
    }

    const blob = new Blob([tmpContent], { type: "text/plain" });
    a.href = URL.createObjectURL(blob);
    console.log(tmpContent);
    a.click();
}

function addPeriods(element){
    const options = [
        { name: "1st Semiannual", value: 121 },
        { name: "2nd Semiannual", value: 122 },
        { name: "26th Week", value: 93 },
        { name: "52nd Week", value: 119 },
        { name: "14th Week", value: 81 },
        { name: "22st Semi-month", value: 39 },
        { name: "16th Bi-week", value: 57 },
        { name: "5th Bi-week", value: 46 },
        { name: "12th Bi-week", value: 53 },
        { name: "19th Bi-week", value: 60 },
        { name: "9st Semi-month", value: 26 },
        { name: "1st Bi-week", value: 42 },
        { name: "November", value: 11 },
        { name: "13th Week", value: 80 },
        { name: "23rd Week", value: 90 },
        { name: "27th Week", value: 94 },
        { name: "14st Semi-month", value: 31 },
        { name: "1st Week", value: 68 },
        { name: "49th Week", value: 116 },
        { name: "24th Bi-week", value: 65 },
        { name: "23st Semi-month", value: 40 },
        { name: "April", value: 4 },
        { name: "30th Week", value: 97 },
        { name: "53rd Week", value: 120 },
        { name: "12st Semi-month", value: 29 },
        { name: "8th Week", value: 75 },
        { name: "10st Semi-month", value: 27 },
        { name: "20th Bi-week", value: 61 },
        { name: "32nd Week", value: 99 },
        { name: "41st Week", value: 108 },
        { name: "3st Semi-month", value: 20 },
        { name: "8st Semi-month", value: 25 },
        { name: "24th Week", value: 91 },
        { name: "15st Semi-month", value: 32 },
        { name: "43rd Week", value: 110 },
        { name: "3rd Bi-week", value: 44 },
        { name: "7th Week", value: 74 },
        { name: "2nd Bi-week", value: 43 },
        { name: "20st Semi-month", value: 37 },
        { name: "17th Bi-week", value: 58 },
        { name: "2st Semi-month", value: 19 },
        { name: "2nd Week", value: 69 },
        { name: "29th Week", value: 96 },
        { name: "22nd Bi-week", value: 63 },
        { name: "10th Bi-week", value: 51 },
        { name: "48th Week", value: 115 },
        { name: "36th Week", value: 103 },
        { name: "14th Bi-week", value: 55 },
        { name: "7th Bi-week", value: 48 },
        { name: "21st Bi-week", value: 62 },
        { name: "4th Bi-week", value: 45 },
        { name: "4st Semi-month", value: 21 },
        { name: "15th Bi-week", value: 56 },
        { name: "5st Semi-month", value: 22 },
        { name: "15th Week", value: 82 },
        { name: "12th Week", value: 79 },
        { name: "June", value: 6 },
        { name: "40th Week", value: 107 },
        { name: "Q1 - Jan 1 to Mar 31", value: 13 },
        { name: "47th Week", value: 114 },
        { name: "21st Week", value: 88 },
        { name: "42nd Week", value: 109 },
        { name: "Q4 - Oct 1 to Dec 31", value: 16 },
        { name: "July", value: 7 },
        { name: "35th Week", value: 102 },
        { name: "4th Week", value: 71 },
        { name: "September", value: 9 },
        { name: "24st Semi-month", value: 41 },
        { name: "9th Week", value: 76 },
        { name: "28th Week", value: 95 },
        { name: "August", value: 8 },
        { name: "December", value: 12 },
        { name: "January", value: 1 },
        { name: "March", value: 3 },
        { name: "6th Week", value: 73 },
        { name: "Jan 1 - Dec 31", value: 17 },
        { name: "31st Week", value: 98 },
        { name: "6st Semi-month", value: 23 },
        { name: "17st Semi-month", value: 34 },
        { name: "February", value: 2 },
        { name: "Q2 - Apr 1 to Jun 30", value: 14 },
        { name: "October", value: 10 },
        { name: "May", value: 5 },
        { name: "21st Semi-month", value: 38 },
        { name: "Q3 - Jul 1 to Sep 30", value: 15 },
        { name: "33rd Week", value: 100 },
        { name: "10th Week", value: 77 },
        { name: "1st Semi-month", value: 18 },
        { name: "19th Week", value: 86 },
        { name: "8th Bi-week", value: 49 },
        { name: "6th Bi-week", value: 47 },
        { name: "45th Week", value: 112 },
        { name: "11st Semi-month", value: 28 },
        { name: "34th Week", value: 101 },
        { name: "50th Week", value: 117 },
        { name: "44th Week", value: 111 },
        { name: "20th Week", value: 87 },
        { name: "11th Bi-week", value: 52 },
        { name: "16th Week", value: 83 },
        { name: "22nd Week", value: 89 },
        { name: "46th Week", value: 113 },
        { name: "26th Bi-week", value: 67 },
        { name: "18th Bi-week", value: 59 },
        { name: "3rd Week", value: 70 },
        { name: "9th Bi-week", value: 50 },
        { name: "7st Semi-month", value: 24 },
        { name: "51st Week", value: 118 },
        { name: "5th Week", value: 72 },
        { name: "17th Week", value: 84 },
        { name: "16st Semi-month", value: 33 },
        { name: "18th Week", value: 85 },
        { name: "11th Week", value: 78 },
        { name: "25th Bi-week", value: 66 },
        { name: "37th Week", value: 104 },
        { name: "13st Semi-month", value: 30 },
        { name: "25th Week", value: 92 },
        { name: "18st Semi-month", value: 35 },
        { name: "19st Semi-month", value: 36 },
        { name: "13th Bi-week", value: 54 },
        { name: "39th Week", value: 106 },
        { name: "38th Week", value: 105 },
        { name: "23rd Bi-week", value: 64 }
    ];

    console.log("period length", options.length);

    options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.name;
        element.appendChild(option);
    });

}
