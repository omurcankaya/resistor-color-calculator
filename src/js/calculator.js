const colors = {
    Black: {
        digit: 0,
        multiply: Math.pow(10, 0)
    },
    Brown: {
        digit: 1,
        multiply: Math.pow(10, 1),
        tolerance: 1
    },
    Red: {
        digit: 2,
        multiply: Math.pow(10, 2),
        tolerance: 2
    },
    Orange: {
        digit: 3,
        multiply: Math.pow(10, 3),
    },
    Yellow: {
        digit: 4,
        multiply: Math.pow(10, 4),
    },
    Green: {
        digit: 5,
        multiply: Math.pow(10, 5),
        tolerance: 0.5
    },
    Blue: {
        digit: 6,
        multiply: Math.pow(10, 6),
        tolerance: 0.25
    },
    Violet: {
        digit: 7,
        multiply: Math.pow(10, 7),
        tolerance: 0.1
    },
    Grey: {
        digit: 8,
        multiply: Math.pow(10, 8),
        tolerance: 0.05
    },
    White: {
        digit: 9,
        multiply: Math.pow(10, 9)
    },
    Gold: {
        multiply: Math.pow(10, -1),
        tolerance: 5
    },
    Silver: {
        multiply: Math.pow(10, -2),
        tolerance: 10
    }

};

const ToleranceColors = Object.entries(colors).filter(color => {
    return typeof (color[1].tolerance) == "number";
});
const DigitColors = Object.entries(colors).filter(color => {
    return typeof (color[1].digit) == "number";
});

const returnList = (type, index) => {
    switch (returnValueType(type, index)) {
        case "multiply":
            return Object.entries(colors);
        case "digit":
            return DigitColors;
        case "tolerance":
            return ToleranceColors;
        default:
            return [];
    }

}

const returnValueType = (type, index) => {
    switch (type) {
        case "3":
            if (index === 2) {
                return "multiply"

            } else {
                return "digit";
            }
        case "4":
            if (index === 3) {
                return "tolerance";
            } else if (index === 2) {
                return "multiply"
            } else {
                return "digit";
            }
        case "5":
            if (index === 4) {
                return "tolerance";
            } else if (index === 3) {
                return "multiply"
            } else {
                return "digit";
            }
        default:
            return "unknown type";
    }
}

document.getElementById("addBand").addEventListener("click", e => {
    let bandValue = document.getElementById("bandValue").value;
    if (bandValue < 3) {
        document.querySelector(".result p").textContent = "You cannot type less 3 band!";
        return;
    }
    if (bandValue > 5) {
        document.querySelector(".result p").textContent = "You cannot type more than 5 band!";
        return;
    }
    document.querySelector(".container").innerHTML = "";
    for (let i = 0; i < bandValue; i++) {
        const container = document.querySelector(".container");
        const colorDiv = document.createElement("div");
        colorDiv.classList.add("colors");
        container.appendChild(colorDiv);

        const colorSelectBox = document.createElement("select");
        colorSelectBox.id = "selectColor" + i;
        colorDiv.appendChild(colorSelectBox)
        returnList(bandValue, i).forEach(digitColor => {
            const digitOption = document.createElement("option");
            digitOption.textContent = digitColor[0];
            colorSelectBox.appendChild(digitOption);
        });
        document.getElementById("selectColor" + i).addEventListener('change', e => {
            document.getElementById("selectColor" + i).parentElement.style.backgroundColor = document.getElementById("selectColor" + i).value;
            calculate();
        });
    }


});

const formatValue= (value) =>{
    let result;
    switch(true){
        case value>=1000000000:
            result = `${(value/1000000000).toFixed(3)} GΩ`;
            break;
        case value>=1000000:
            result = `${(value/1000000).toFixed(3)} MΩ`;
            break;
        case value>=1000:
            result = `${(value/1000).toFixed(3)} kΩ`;
            break;
        default:
            result = `${value.toFixed(3)} Ω`;
    }
    return result;
}
const calculate = () =>{
    let colorCount = document.querySelectorAll(".colors").length.toString();
    let digits ="", toleranceVal = "";
    for (let i = 0; i < colorCount; i++) {
        let select = document.getElementById("selectColor" + i);
        if(returnValueType(colorCount, i) === "digit"){
            digits+=DigitColors[select.options.selectedIndex][1].digit;
        }else if(returnValueType(colorCount, i) === "multiply"){
            digits*=Object.entries(colors)[select.options.selectedIndex][1].multiply;
        }else{
            toleranceVal+=ToleranceColors[select.options.selectedIndex][1].tolerance*(1/100);
        }
    }
    document.querySelector(".result p").textContent = `Max Value:${formatValue(digits+toleranceVal*digits)} Normal Value: ${formatValue(digits)} \n Min Value:${formatValue(digits-toleranceVal*digits)}`
    
}

