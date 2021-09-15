const ListState=[
    {
        key:1,
        name:"Andhra Pradesh"
    },
    {
        key:2,
        name:"Telangana"
    },
    {
        key:3,
        name:"Karnataka"
    },
    {
        key:4,
        name:"Maharashtra"
    },
    {
        key:5,
        name:"Delhi"
    },
    {
        key:6,
        name:"TamilNadu"
    },
    {
        key:7,
        name:"West Bengal"
    },
    {
        key:8,
        name:"Kerala"
    },
    {
        key:9,
        name:"Delhi"
    },

]

const ListCity=[
    {
        key:1,
        name:"Hyderabad"
    },
    {
        key:2,
        name:"Bangalore"
    },
    {
        key:3,
        name:"Bombay"
    },
    {
        key:4,
        name:"Kolkata" 
    },
    {
        key:5,
        name:"Chennai" 
    },
    {
        key:6,
        name:"Vijayawada"
    },
    {
        key:7,
        name:"Delhi"
    },
    {
        key:8,
        name:"Pune"
    },
    {
        key:9,
        name:"Guntur"
    },
    ,
    {
        key:10,
        name:"kochi"
    },

]

const ListPrice = [
    {
        key: 0,
        name: "Any  ",
        array: []
    },
    {
        key: 1,
        name: "0k to 5k",
        array: [0, 5000]
    },
    {
        key: 2,
        name: "5k to 10k",
        array: [5000, 10000]
    },
    {
        key: 3,
        name: "10k to 15k",
        array: [10000,15000]
    },
    {
        key: 4,
        name: "15k to 20k",
        array: [15000,20000]
    },
    {
        key: 5,
        name: "20k to 25k",
        array: [20000,25000]
    }
    ,
    {
        key: 6,
        name: "25k to 30k",
        array: [25000,30000]
    }
    ,
    {
        key: 7,
        name: "More than 30k",
        array: [30000,1000000]
    }
]



const ListSqft = [
    {
        key: 0,
        name: "Any",
        array: []
    },
    {
        key: 1,
        name: "0Sqft to 500Sqft",
        array: [0, 500]
    },
    {
        key: 2,
        name: "500Sqft to 1000Sqft",
        array: [500, 1000]
    },
    {
        key: 3,
        name: "1000Sqft to 1500Sqft",
        array: [1000,1500]},
    // },
    // {
    //     key: 4,
    //     name: "1500Sqft to 2000Sqft",
    //     array: [1500,2000]
    // },
    {
        key: 5,
        name: "More than 1500Sqft",
        array: [1500, 1500000]
    }
]


export{
    ListState,ListCity,ListPrice,ListSqft
}