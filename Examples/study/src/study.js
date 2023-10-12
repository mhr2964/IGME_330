let init = () => {
    function greet(name) {
        return "Hello " + name;
    }
    console.log(greet());

    function doubleIt(num) {
        return num * 2;
    }
    console.log(doubleIt());

    // let a = 10;
    // let b = 0;
    // let c;
    // let d = "Buddy";
    // let e = [];
    // let f = e;
    // if (a) console.log("TRUE");
    // if (b) console.log("TRUE");
    // if (c) console.log("TRUE");
    // if (d) console.log("TRUE");
    // if (e) console.log("TRUE");
    // if (f) console.log("TRUE");
    // if ("false") console.log("TRUE");

    let a = 10;
    let b = 0;
    let c;
    let d = "Buddy";

    console.log(d + a);
    console.log(d + c);
    console.log(d - a);
    console.log(d * a);
    console.log(a + c);

    console.log("0" == 0);
    console.log("0" === 0);
    console.log(0 == false);

    console.log(0 === false);


}

init();