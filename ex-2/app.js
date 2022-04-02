function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function order_array(numbers, is_asc){
    if (!Array.isArray(numbers)){
        return [];
    }
    let array_numbers = [...numbers];
    array_numbers.sort(); 
    if (is_asc){
        array_numbers.reverse();
    }
    return array_numbers;
  
}

function find_number(numbers, number_to_search){
    let response = { exists: null, position: null, message : '' };
    if (!Array.isArray(numbers) || !Number.isInteger(number_to_search)){
        response.message = "Invalid parameters";
    }
    const array_numbers = [...numbers];
    const index = array_numbers.findIndex(num => num === number_to_search);
    if (index === -1 ){
        response.exists = false;
        response.message = "Can´t find number in array";
    }
    response.exists = true;
    response.position = index;
    return response;
}

const numbers = Array.from({length: 6}, () => Math.floor(Math.random() * 100));

console.log("order numbers asc");
console.log(order_array(numbers, true));

console.log("order numbers desc");
console.log(order_array(numbers, false));

console.log("find number in array [valid]");
const number_to_search = getRandomInteger(0, 5);
console.log(find_number(numbers, numbers[number_to_search]));

console.log("find number in array [invalid]");
console.log(find_number([7, 5, 8, 10, 12], 4));

