/*
 *
 * Felipe Loera
 * 2025-02-12
 */

"use strict";
function firstNonRepeating (str) {
const candidates = [];
    //recorrer caracter por caracter
    for (let i = 0; i < str.length; i++) {
        //si el caracter no esta en los candidatos, lo agregamos
        let found = false;
        for ( let cand of candidates) {
            
            if (cand.char == str[i]) {
                cand.count +=1;
                found = true;
                
            }
        }
        if (!found) {
            candidates.push({char: str[i], count: 1});
        }
 }
 console.log(candidates);
 for (let index in candidates){
        if (candidates[index].count === 1) {
            return candidates[index].char;
        }
 }
}

//Escribe una función llamada bubbleSort que implemente el algoritmo 'bubble-sort' para ordenar una lista de números.

function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n-1; i++) {
        for (let j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                // Intercambiar arr[j] y arr[j+1]
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;

}

/*Escribe dos funciones: la primera con nombre invertArray que invierta un arreglo de números y regrese un nuevo arreglo con el resultado; 
la segunda, con nombre invertArrayInplace,que modifique el mismo arreglo que se pasa como argumento.
 No se permite usar la función integrada 'reverse'.
 */

 function invertArray(arr) {
    let inverted = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        inverted.push(arr[i]);
    }
    return inverted;
}

function invertArrayInplace(arr) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
        // Intercambiar arr[left] y arr[right]
        let temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
    return arr;
}

//Escribe una función llamada capitalize que reciba una cadena de texto y regrese una nueva con la primer letra de cada palabra en mayúscula.

function capitalize(str) {
    if (!str) return "";

    let words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > 0) {
            words[i] = words[i][0].toUpperCase() + words[i].slice(1);
        }
    }
    return words.join(" ");
}

    
   // Escribe una función llamada mcd que calcule el máximo común divisor de dos números.
   function mcd(a, b) {
    if (b === 0) {
        return a;
    }
    return mcd(b, a % b);
}

//Crea una función llamada hackerSpeak que cambie una cadena de texto a 'Hacker Speak'. Por ejemplo, para la cadena 'Javascript es divertido', su hacker speak es: 'J4v45c1pt 35 d1v3rt1d0'.
 function hackerSpeak(str) { 
    let hacker="";
    for (let i=0; i<str.length; i++) {
        switch(str[i]) {
            case "a":
                hacker += "4";
                break;
            case "e":
                hacker += "3";
                break;
            case "i":
                hacker += "1";
                break;
            case "o":
                hacker += "0";
                break;
            case "s":
                hacker += "5";
                break;
            default:
                hacker += str[i];
        }
    }
    return hacker;
 }
 //Escribe una función llamada factorize que reciba un número, y regrese una lista con todos sus factores. 
 function factorize(num) {
    let factors = [];
    for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
            factors.push(i);
        }
    }
    return factors;
}

/* Escribe una función llamada deduplicate que quite los elementos duplicados de un arreglo y regrese una lista con los elementos que quedan, Por ejemplo:
 deduplicate([1, 0, 1, 1, 0, 0]) -> [1, 0]*/
function deduplicate(arr) {
    let unique = [];
    for (let i = 0; i < arr.length; i++) {
        if (!unique.includes(arr[i])) {
            unique.push(arr[i]);
        }
    }
    return unique;
}
// Escribe una función llamada findShortestString que reciba como parámetro una lista de cadenas de texto, y regrese la longitud de la cadena más corta
function findShortestString(arr) {
    if (arr.length === 0) return 0;
    let shortest = arr[0].length;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].length < shortest) {
            shortest = arr[i].length;
        }
    }
    return shortest;
}

//Escribe una función llamada isPalindrome que revise si una cadena de texto es un palíndromo o no.

function isPalindrome(str){
    let cleaned = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    let left = 0;
    let right = cleaned.length - 1;
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
//Escribe una función llamada sortStrings que tome una lista de cadena de textos y devuelva una nueva lista con todas las cadenas en orden alfabético.

function sortStrings(arr) {
    let sorted = arr.slice(); // Crear una copia del arreglo original
    for (let i = 0; i < sorted.length - 1; i++) {
        for (let j = 0; j < sorted.length - i - 1; j++) {
            if (sorted[j].toLowerCase() > sorted[j + 1].toLowerCase()) {
                // Intercambiar sorted[j] y sorted[j + 1]
                let temp = sorted[j];
                sorted[j] = sorted[j + 1];
                sorted[j + 1] = temp;
            }
        }
    }
    return sorted;
}

/*Escribe una función llamada stats que tome una lista de números y devuelva una lista con dos elementos: el promedio y la moda. Por ejemplo:
stats([8, 4, 2, 6, 8, 13, 17, 2, 4, 8]) -> [ 7.2, 8 ]
*/
function stats(arr){
    if (arr.length === 0) return [0, 0];
    // Calcular el promedio
    let sum = 0;
    for (let num of arr) {
        sum += num;
    }
    let average = sum / arr.length;
    // Calcular la moda
    let frequency = {};
    let maxFreq = 0;
    let mode = null;
    for (let num of arr) {
        frequency[num] = (frequency[num] || 0) + 1;
        if (frequency[num] > maxFreq) {
            maxFreq = frequency[num];
            mode = num;
        }
    }

    return [average, mode];
}
//Escribe una función llamada popularString que tome una lista de cadenas de texto y devuelva la cadena más frecuente.
function popularString(arr) {
    if (arr.length === 0) return '';
    let frequency = {};
    let maxFreq = 0;
    let popular = 0;
    for (let str of arr) {
        frequency[str] = (frequency[str] || 0) + 1;
        if (frequency[str] > maxFreq) {
            maxFreq = frequency[str];
            popular = str;
        }
    }
    return popular;

}

//Escribe una función llamada isPowerOf2 que tome un número y devuelva verdadero si es una potencia de dos, falso de lo contrario.
function isPowerOf2(num){
    if (num <= 0) return false;
    return (num & (num - 1)) === 0;
}

//Escribe una función llamada sortDescending que tome una lista de números y devuelva una nueva lista con todos los números en orden descendente.
function sortDescending(arr){
    let sorted = arr.slice(); // Crear una copia del arreglo original
    for (let i = 0; i < sorted.length - 1; i++) {
        for (let j = 0; j < sorted.length - i - 1; j++) {
            if (sorted[j] < sorted[j + 1]) {
                // Intercambiar sorted[j] y sorted[j + 1]
                let temp = sorted[j];
                sorted[j] = sorted[j + 1];
                sorted[j + 1] = temp;
            }
        }
    }
    return sorted;
}

export {
    firstNonRepeating,
    bubbleSort,
    invertArray,
    invertArrayInplace,
    capitalize,
    mcd,
    hackerSpeak,
    factorize,
    deduplicate,
    findShortestString,
    isPalindrome,
    sortStrings,
    stats,
    popularString,
    isPowerOf2,
   sortDescending,
    
};
