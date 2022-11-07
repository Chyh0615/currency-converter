//currencyapi website - https://currencyapi.com/

const input = document.querySelectorAll("input");
const selection = document.querySelectorAll("select");
const change = document.querySelector(".change");

// fetch image
fetch("https://cdn.pixabay.com/photo/2012/12/11/21/28/mixture-69523_1280.jpg").then(response => {
    return response.blob();
}).then(img => {
    const imageURL = URL.createObjectURL(img);
    document.body.style.backgroundImage = "url('" + imageURL + "')"
}).catch(error => {
    console.error(error);
});

//fetch currency api
const api_key = "API KEY";

fetch("https://api.currencyapi.com/v3/latest?apikey=" + api_key).then(response => {
    return response.json();
}).then(item => {
    const data = Object.getOwnPropertyNames(item.data);
    for (let i = 0; i < selection.length; i++) {
        for (let j = 0; j < data.length; j++) {
            selection[i].innerHTML += `<option value="${data[j]}">${data[j]}</option>`;
        };

        //set the value at the beginning
        document.getElementById("firstCurrency").value = "USD";
        document.getElementById("secondCurrency").value = "GBP";

        function calculate() {
            const option = selection[0].value;
            const second_option = selection[1].value;
            const rate = item.data[option].value;
            // console.log(rate);
            const rateTwo = item.data[second_option].value;
            // console.log(rateTwo);

            input[1].value = input[0].value * rateTwo / rate;

            input[0].addEventListener("keyup", () => {
                input[1].value = input[0].value * rateTwo / rate;
            });
            input[1].addEventListener("keyup", () => {
                input[0].value = input[1].value * rate / rateTwo;
            });

            //demonstrate the exchange rate
            document.querySelector(".currency").innerHTML = `1 ${option} = ${rateTwo / rate} ${second_option}`;
            document.querySelector(".second_currency").innerHTML = `1 ${second_option} = ${rate / rateTwo} ${option}`;
        };
        selection[i].addEventListener("change", () => {
            calculate();
        });
    };
    //button clicked to swap the currency
    change.addEventListener("click", () => {
        const temp = selection[0].value;
        selection[0].value = selection[1].value ;
        selection[1].value = temp;
        calculate();
    });

    calculate();
}).catch(error => {
    console.error(error);
});