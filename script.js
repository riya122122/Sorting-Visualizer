const arrayContainer = document.getElementById("array-container");
let array = [];

function generateArray() {
    array = [];
    arrayContainer.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        array.push(value);
        const bar = document.createElement("div");
        bar.classList.add("array-bar");
        bar.style.height = `${value * 3}px`;
        arrayContainer.appendChild(bar);
    }
}

async function bubbleSort() {
    const bars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                await swap(bars, j, j + 1);
            }
        }
    }
}

async function selectionSort() {
    const bars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            await swap(bars, i, minIndex);
        }
    }
}

async function insertionSort() {
    const bars = document.getElementsByClassName("array-bar");
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            j--;
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${array[j + 1] * 3}px`;
    }
}

async function quickSort(start, end) {
    if (start >= end) return;
    const bars = document.getElementsByClassName("array-bar");
    let index = await partition(bars, start, end);
    await Promise.all([quickSort(start, index - 1), quickSort(index + 1, end)]);
}

async function partition(bars, start, end) {
    let pivotIndex = start;
    let pivotValue = array[end];
    for (let i = start; i < end; i++) {
        if (array[i] < pivotValue) {
            await swap(bars, i, pivotIndex);
            pivotIndex++;
        }
    }
    await swap(bars, pivotIndex, end);
    return pivotIndex;
}

async function swap(bars, i, j) {
    await new Promise(resolve => setTimeout(resolve, 100));
    [array[i], array[j]] = [array[j], array[i]];
    bars[i].style.height = `${array[i] * 3}px`;
    bars[j].style.height = `${array[j] * 3}px`;
}