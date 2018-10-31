window.onload = function () {
    const resultDiv = document.querySelector('#result');
    const previous = document.querySelector('#previous');
    const next = document.querySelector('#next');
    const form = document.querySelector('#form');
    const select = document.querySelector('#filter-container');
    const input_value = document.querySelector('#input');
    let pageNumber = 1;
    let obj = {};



    previous.addEventListener('click', function () {
        if (pageNumber > 1) {
            pageNumber--;
            axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`)
                .then(function (response) {
                    console.log('Last Page = Activated // ', response.data.results);
                    resultDiv.innerHTML = response.data.results.map(function (val) {
                        return `
                <br>
                <div id="characterBox">
                    <div class="name">${val.name}</div>
                    <img class="image"src='${val.image}' width="100px" height="auto">
                    <div class="species">${val.species}</div>
                    <div class="origin-name">${val.origin.name}</div>
                    <div class="status">${val.status}</div>
                </div>
                <br>
                `
                    }).join(' ');

                })
                .catch(function (err) {
                    console.log('Errors = None // ', err);
                })
        }


    });
    next.addEventListener('click', function () {
        pageNumber++;
        axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`)
            .then(function (response) {
                console.log('Next Page = Activated');
                resultDiv.innerHTML = response.data.results.map(function (val) {
                    return `
            <br>
            <div id="characterBox">
                <div class="name">${val.name}</div>
                <img class="image"src='${val.image}' width="100px" height="auto" dragable="false" selectable="false">
                <div class="species">${val.species}</div>
                <div class="origin-name">${val.origin.name}</div>
                <div class="status">${val.status}</div>
            </div>
            <br>
            `
                }).join(' ');

            })
            .catch(function (err) {
                console.log('err', err);
            })

    });
    console.log('pageNumber', pageNumber);


    console.log(select.value);



    axios.get('https://rickandmortyapi.com/api/character/?page=1')
        .then(function (response) {
            console.log('Default Characters = Loaded // ', response.data.results);
            resultDiv.innerHTML = response.data.results.map(function (val) {
                return `
            <br>
            <div id="characterBox">
                <div class="name">${val.name}</div>
                <img class="image"src='${val.image}' width="100px" height="auto">
                <div class="species">${val.species}</div>
                <div class="origin-name">${val.origin.name}</div>
                <div class="status">${val.status}</div>
            </div>
            <br>
            `
            }).join(' ');

        })
        .catch(function (err) {
            console.log('Errors = None', err);
        })






    //***SUBMIT  */
    form.addEventListener('submit', function () {
        event.preventDefault();
        obj.filter = select.value;
        obj.input = input_value.value;
        console.log('obj', obj);
        axios.get(`https://rickandmortyapi.com/api/character/?${obj.filter}=${obj.input}`)
            .then(function (response) {
                //console.log('RESPONSE***', response);
                resultDiv.innerHTML = response.data.results.map(function (val) {
                    console.log('Form = Submitted // ', val.origin);
                    return `
                        <br>
                        <div id="characterBox">
                            <div class="name">${val.name}</div>
                            <img class="image"src='${val.image}' width="100px" height="auto" dragable="false" selectable="false">
                            <div class="species">${val.species}</div>
                            <div class="origin-name">${val.origin.name}</div>
                            <div class="status">${val.status}</div>
                        </div>
                        <br>
                        `
                }).join(' ');

            })
            .catch(function (err) {
                console.log('err', err);
            })
        console.log('OBJ****', obj);
        //https://rickandmortyapi.com/api/character/?name=rick&status=alive
    });

    const cb = document.querySelectorAll("#characterBox");

    cb.addEventListener('click', function() {
        console.log("working");
    });
}