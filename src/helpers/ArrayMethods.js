const ArrayMethods = {
    shuffle: (array) => {
        let currentIndex = array.length, tempVal, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // swap
            tempVal = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = tempVal;
        }

        return array;
    }
}

export default ArrayMethods;