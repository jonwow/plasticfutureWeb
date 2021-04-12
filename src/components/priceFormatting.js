export default function (sum) {
    // step 1: remove the decimal point, reverse the string and add empty spaces after every 3 characters (example: (2085671) 1 7 6 _ 5 8 0 _ 2)
    // step 2: reverse again.
    let sumString = String(Math.floor(sum)),
        decimalSplit = String(sum).split('.')[1];
    let newStr = '', string = '';

    // if there is a decimal
    if (decimalSplit !== undefined) {
        // if it has only one number (e.g. the decimal for 0.90 would be 9, NOT 90)
        if (decimalSplit.length === 1)
            // add a 0 to the string
            decimalSplit += '0';
    }
    else
        decimalSplit = '00';



    // making a new string by adding each character from the end to the start (reversed) out of the 'sumString'.
    for (let i = sumString.length - 1; sumString[i] !== undefined; i--) {
        string += sumString[i];

        // if 3 characters have been added AND there are more characters to add from the sumString, add an empty space.
        if ((sumString.length - i) % 3 === 0 && sumString[i + 1] !== undefined)
            string += ' ';
    }


    // reversing the reversed string and storing it into 'newStr'.
    for (let i = string.length - 1; i >= 0; i--)
        newStr += string[i];


    // adding a point and two decimal points to the string
    return newStr + '.' + decimalSplit[0] + decimalSplit[1];
}