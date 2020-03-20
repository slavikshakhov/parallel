//1. add el to arr via fun arg

const addTodo = k => {
    const newArr = [...arr, { k }];  //where k is new prop, not contained yet in arr
};


//2. change el in arr via fun arg, by index

const completeTodo = i => {
    const newArr = [...arr];
    newArr[i].k = 5;      //where k is one of arr's props
};


//3. remove el from arr via fun arg, by index

const removeTodo = i => {
    const newArr = [...arr];
    newArr.splice(i, 1);
};