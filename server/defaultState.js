module.exports = {
    currentMode: {
        id: 0,
        off: true,
        name: 'Off',
        configuration: {
            branch1: [0, 0, 0],
            branch2: [0, 0, 0]
        }
    },
    availableModes: [
        {
            id: 0,
            off: true,
            name: 'Off',
            configuration: {
                branch1: [0, 0, 0],
                branch2: [0, 0, 0]
            }
        },
        {
            id: 1,
            name: 'White',
            configuration: {
                branch1: [255, 255, 255],
                branch2: [255, 255, 255]
            }
        },
        {
            id: 2,
            name: 'Red',
            configuration: {
                branch1: [255, 0, 0],
                branch2: [255, 0, 0]
            }
        },
        {
            id: 3,
            name: 'Green',
            configuration: {
                branch1: [0, 255, 0],
                branch2: [0, 255, 0]
            }
        },
        {
            id: 4,
            name: 'Blue',
            configuration: {
                branch1: [0, 0, 255],
                branch2: [0, 0, 255]
            }
        },
        {
            id: 5,
            name: 'Cyan',
            configuration: {
                branch1: [0, 255, 255],
                branch2: [0, 255, 255]
            }
        }
    ]
}