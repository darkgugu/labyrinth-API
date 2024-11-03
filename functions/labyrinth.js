const labyrinth = (H, L) => {

    const createNumberedArray = (H, L) => {
        let array = [];
        let num = 0;
        for (let i = 0; i < H; i++) {
            let row = [];
            for (let j = 0; j < L; j++) {
                row.push(num++);
            }
            array.push(row);
        }
        return array;
    };

    let array = createNumberedArray(H, L);

    let vertical = []
    let horizontal = []

    const createMatrix = (H, L, direction) => {
        if (direction === 'vertical') {
            for (let i = 0; i < parseInt(H) + parseInt(1); i++) {
                vertical.push([])
                for (let j = 0; j < L; j++) {
                    vertical[i][j] = 1
                }
            }
        }
        else if (direction === 'horizontal') {
            for (let i = 0; i < H; i++) {7
                horizontal.push([])
                for (let j = 0; j < parseInt(L) + parseInt(1); j++) {
                    horizontal[i][j] = 1
                }
            }
        }
    }

    createMatrix(H, L, 'vertical')
    createMatrix(H, L, 'horizontal')

    const sides = ['top', 'bottom', 'left', 'right']

    const randomWall = (H, L, array, horizontal, vertical) => {
    
        while (!isPathEnded(array)) {
        
            const x1 = Math.floor(Math.random() * H)
            const y1 = Math.floor(Math.random() * L)
    
            const currentSide = sides[Math.floor(Math.random() * sides.length)]
            const neighbor = getNeighbor(x1, y1, currentSide)
            
            if(isNeighborInBounds(neighbor[0], neighbor[1], H, L)) {
                const numberToChange = array[neighbor[0]][neighbor[1]]
                if(array[x1][y1] !== numberToChange) {
                    for (let i = 0; i < H; i++) {
                        for (let j = 0; j < L; j++) {
                            if(array[i][j] === numberToChange) {
                                array[i][j] = array[x1][y1]
                            }
                        }
                    }
                    switch (currentSide) {
                        case 'top':
                            horizontal[x1][y1] = 0
                            break;
                        case 'bottom':
                            horizontal[x1 + 1][y1] = 0
                            break;
                        case 'left':
                            vertical[x1][y1] = 0
                            break;
                        case 'right':
                            vertical[x1][y1 + 1] = 0
                            break;
                    
                        default:
                            break;
                    }
                }
            }    
        }
    }
    
    const isNeighborInBounds = (x, y, bottomBound, rightBound) => {
        return x >= 0 && y >= 0 && x < bottomBound && y < rightBound
    }
    
    const getNeighbor = (x, y, direction) => {
        switch (direction) {
            case 'top':
                return [x - 1, y]
            case 'bottom':
                return [x + 1, y]
            case 'left':
                return [x, y - 1]
            case 'right':
                return [x, y + 1]
        }
    }

    const isPathEnded = (array) => {
        for (let i = 1; i < array.length; i++) {
            if (!arrayEquals(array[0],array[i])) {
                return false
            }
        }
        return true
    }
    
    function arrayEquals(a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }

    randomWall(H, L, array, horizontal, vertical)

    console.log('vertical', vertical)
    console.log('horizontal', horizontal)
    return {'vertical': vertical, 'horizontal': horizontal}

}

module.exports = labyrinth;