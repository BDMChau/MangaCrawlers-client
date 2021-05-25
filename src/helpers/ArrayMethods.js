const arrayMethods = {
    shuffle: (array) => {
        let currentIndex = array.length, tempVal, randomIndex;

        while (0 !== currentIndex) {

            // Pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // swap
            tempVal = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = tempVal;
        }

        return array;
    },
    dynamicSort: (field) => {
        let sortOrder = 1;
        if (field[0] === "-") {
            sortOrder = -1;
            field = field.substr(1);
        }
        return (a, b) => {
            let result = (a[field] < b[field]) ? -1 : (a[field] > b[field]) ? 1 : 0;
            return result * sortOrder;
        }

    }
}

export default arrayMethods;