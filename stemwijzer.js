// gets called as soon as the body is loaded in thanks to onload in HTML, which generates the following button to start.
// im using a library utils made by a friend of mine, makes things that takes multiple lines really simple and easy like down below
function onload() {
    createElement("button", {onclick: start, innerText: "Start"}, function (element) {
        document.getElementById("main-content-button-span").appendChild(element);
    });
    loadParties();
}
// this function is called when you press the previously generated start button
function start() {
    document.getElementById("container").firstChild.remove();
    question();
}
//index is what question we are on or rather its index+1 to get the question. the answers are here because I save all question answers in the function, for example if you answer question 1
// with agree itll show "pro" as index 0, so if you were to be unsure of an answer itll just replace the answer based on the index.
function question(index = 0, answers = []) {
    let container = document.getElementById("container");
    //data is basically for all the button options nothing else really
    data = {Eens: "pro", Oneens: "contra", Geen: "none"};
    questions = subjects;

    //stores all created checkboxes
    checkboxes = [];

    //info about a certain question based on the previously mentioned index and the subjects in data.js
    questionInfo = subjects[index];

    //clears the HTML for each question/tab
    while (container.firstChild) {
        container.firstChild.remove();
    }
    updateProgressBar(index);

    //checks whether or not all questions are done yet
    if (subjects.length <= index){
        createElement("div", {id: "backbutton-div"}, function (element) {
            container.appendChild(element);
        });
        createElement("a", {id: "backbutton-a", onclick: function(){
                question(index-1, answers);
            }}, function (element){
            document.getElementById("backbutton-div").appendChild(element);
        });
        createElement("img", {src: "img/arrow.png", onmouseover: function(){
                    this.style.position = 'relative';
                    this.style.left = '-1vw';
                }, onmouseout: function(){
                    this.style.left = '0px';
                }, alt: 'icon'},
            function(element){
                document.getElementById("backbutton-a").appendChild(element)
            });
        //if this is true itll make all the checkboxes and store them in the previous checkboxes variable
        let ul = createElement("ul", {}, function (element){
            container.appendChild(element);
            element.id = "push-list-items";
        });
        questions.forEach(value =>{
            let li = createElement("li");
            let checkbox = createElement("input", {type: "checkbox"});
            let label = createElement("label", {innerText: value.title});

            checkboxes.push(checkbox);
            ul.appendChild(li);
            li.appendChild(checkbox);
            li.appendChild(label);
        });
        //finishes off by making the submit button
        createElement("div", {id: "button-div"}, function (element) {
            container.appendChild(element);
        });
        createElement("button", {innerText: "Verzenden", onclick: function(){
                //this variable stores true or false based on whether or not the checkbox was checked
                checkboxanswers = [];
                checkboxes.forEach(value =>{
                    checkboxanswers.push(value.checked);
                });
                //moves on to the function that handles all the parties you want to be in the final result
                includedParties(answers, checkboxanswers);
            }}, function (element){
            document.getElementById("button-div").appendChild(element);
            element.style.backgroundColor = "black";
        });
    }
    else{
        //generates the back button
        createElement("div", {id: "backbutton-div"}, function (element) {
            container.appendChild(element);
        });
        //generates the question title
        createElement("h1", {innerText: questionInfo.title}, function (element) {
            container.appendChild(element);
        });
        //generates the question statement
        createElement("h2", {innerText: questionInfo.statement}, function (element) {
            container.appendChild(element);
        });
        //generates the div in which the buttons are stored
        createElement("div", {id: "button-div"}, function (element) {
            container.appendChild(element);
        });

        //this generates the 3 buttons based off of the values earlier
        Object.keys(data).forEach(value => {
            createElement("button", {
                innerText: value.capitalize(), onclick: function () {
                    //this is what happens on each onclick, itll set the answer[index] to whatever button you clicked, and then increases the index by 1 and redoes this entire function but
                    // thanks to the increased index for the 2nd question
                    answers[index] = data[value];
                    index++;
                    question(index, answers);
                }
            }, function (element) {
                if(data[value] === "pro"){
                    element.id = "pro";
                    element.style.backgroundColor = "black";
                    if(answers[index] === "pro"){
                        element.style.backgroundColor = "rgb(1,180,220)";
                        element.style.borderRadius = "7.5px";
                    }
                }
                else if(data[value] === "contra"){
                    element.id = "contra";
                    element.style.backgroundColor = "black";
                    if(answers[index] === "contra"){
                        element.style.backgroundColor = "rgb(1,180,220)";
                        element.style.borderRadius = "7.5px";
                    }
                }
                else if(data[value] === "none"){
                    element.id = "none";
                    element.style.backgroundColor = "black";
                    if(answers[index] === "none"){
                        element.style.backgroundColor = "rgb(1,180,220)";
                        element.style.borderRadius = "7.5px";
                    }
                }
                document.getElementById("button-div").appendChild(element);

            });
        });
        if(answers[index] != null){

        }
        //here it generates an additional 2 buttons for going back 1 question or skipping the question alltogether.
        //this below checks whether or not you're trying to go below the first question(which obv isnt possible) so it doesnt generate this button for the first question
        if(index => 0){
            createElement("a", {id: "backbutton-a", onclick: function(){
                    if (index > 0){
                        index--;
                        question(index, answers)
                    }
                }}, function (element){
                document.getElementById("backbutton-div").appendChild(element);
            });
            createElement("img", {src: "img/arrow.png", onmouseover: function(){
                        this.style.position = 'relative';
                        this.style.left = '-1vw';
                    }, onmouseout: function(){
                        this.style.left = '0px';
                    }, alt: 'icon'},
                function(element){
                    document.getElementById("backbutton-a").appendChild(element)
                })
        }
        //generates skip button
        createElement("button", {id: "skip", innerText: "Vraag overslaan", onclick: function(){
                answers[index] = "overgeslagen";
                index++;
                question(index, answers)
            }}, function (element){
            document.getElementById("button-div").appendChild(element);
            element.style.backgroundColor = "black";
            if(answers[index] === "overgeslagen"){
                element.style.backgroundColor = "rgb(1,180,220)";
                element.style.borderRadius = "7.5px";
            }
        });
        //this generates all the parties and their thoughts on the statement
        questionInfo.parties.forEach(value => {
            //generates the name
            createElement("p", {innerText: "Naam: " + value.name, id: "hidden"}, function (element) {
                container.appendChild(element);
            });
            //generates the opinion
            createElement("p", {innerText: "Mening: " + value.opinion, id: "hidden"}, function (element) {
                container.appendChild(element);
            });
        });
    }


}
//function where you can select all the parties you want in the end result
function includedParties(answers, checkboxanswers, settings = "all") {
    let container = document.getElementById("container");
    while (container.firstChild) {
        container.firstChild.remove();
    }
    party = parties;
    partiesChecked = [];
    createElement("div", {id: "backbutton-div"}, function (element) {
        container.appendChild(element);
    });
    createElement("a", {id: "backbutton-a", onclick: function(){
            question(answers.length, answers);
        }}, function (element){
        document.getElementById("backbutton-div").appendChild(element);
    });
    createElement("img", {src: "img/arrow.png", onmouseover: function(){
                this.style.position = 'relative';
                this.style.left = '-1vw';
            }, onmouseout: function(){
                this.style.left = '0px';
            }, alt: 'icon'},
        function(element){
            document.getElementById("backbutton-a").appendChild(element)
        });
    createElement("div", {id: "button-div"}, function (element) {
        container.appendChild(element);
    });
//generates 3 buttons whether you want all, seculair, or large parties
    ["Alles", "Seculaire", "Grote"].forEach(value =>{
        createElement("button", {innerText: value, onclick: function () {
                includedParties(answers, checkboxanswers, value)
            }}, function(element){
            document.getElementById("button-div").appendChild(element);
            element.style.backgroundColor = "black";
        });
    });
    //checks if the pressed button was seculaire/large or all, (all is by default so I didnt give that an if statement)
    if(settings === "Seculaire"){
        let ul = createElement("ul", {}, function (element){
            container.appendChild(element);
            element.id = "push-list-items";
        });
        party.forEach(value =>{
            if(value.secular === true){
                let li = createElement("li");
                let checkbox = createElement("input", {type: "checkbox", checked: true});
                let label = createElement("label", {innerText: value.name, checked: true});
                //pushes the checkbox and label to the array
                partiesChecked.push([checkbox, label]);
                ul.appendChild(li);
                li.appendChild(checkbox);
                li.appendChild(label);
            }
        });
    }
    else if(settings === "Grote"){
        let ul = createElement("ul", {}, function (element){
            container.appendChild(element);
            element.id = "push-list-items";
        });
        party.forEach(value =>{
            if(value.size < 15){
                let li = createElement("li");
                let checkbox = createElement("input", {type: "checkbox", checked: true});
                let label = createElement("label", {innerText: value.name});

                partiesChecked.push([checkbox, label]);
                ul.appendChild(li);
                li.appendChild(checkbox);
                li.appendChild(label);
            }
        });
    }
    else{
        let ul = createElement("ul", {}, function (element){
            container.appendChild(element);
            element.id = "push-list-items";
        });
        party.forEach(value =>{
            let li = createElement("li");
            let checkbox = createElement("input", {type: "checkbox", checked: true});
            let label = createElement("label", {innerText: value.name});

            partiesChecked.push([checkbox, label]);
            ul.appendChild(li);
            li.appendChild(checkbox);
            li.appendChild(label);
        });
    }
//creates submit button
    createElement("div", {id: "sbutton-div"}, function (element) {
        container.appendChild(element);
    });
    createElement("button", {innerText: "Verzenden", onclick: function(){
            partiesinresult = [];
            partiesChecked.forEach(value =>{
                if(value[0].checked === true){
                    partiesinresult.push(value[1].innerText);
                }
            });
            score(answers, checkboxanswers, partiesinresult);
        }}, function (element){
        document.getElementById("sbutton-div").appendChild(element);
        element.style.backgroundColor = "black";
    });
    console.log(party);
}

function score(answers, checkboxanswers, partiesChecked){
    console.log("Received answers: {0}".format(answers));
    console.log("Received important subjects: {0}".format(checkboxanswers));
    console.log("Received parties: " + partiesChecked);

    let container = document.getElementById("container");

    questions = subjects;
    voteresult = {};


    while (container.firstChild) {
        container.firstChild.remove();
    }

    for(let i = 0; i < partiesChecked.length; i++){
        party = partiesChecked[i].toString();
        voteresult[party] = {"name":party, "matches": 0}
    }

    for(let j = 0; j < questions.length; j++){
        value = questions[j];
        parties = value.parties;
        for(let i = 0; i < partiesChecked.length; i++){
            parties.forEach(party =>{
                if(party.name === partiesChecked[i].toString()){
                    if(party.position === answers[i].toString()){
                        voteresult[party.name].matches++;
                        if(checkboxanswers[j].toString() === "true"){
                            voteresult[party.name].matches++;
                        }
                    }
                }
            })
        }
    }

    console.log(voteresult);
    createElement("div", {id: "result"}, function(element){
        container.appendChild(element);
    });
    Object.entries(voteresult).forEach(value =>{
        let div = createElement("div");
        let name = createElement("h1", {innerText: value[1].name});
        let matches = createElement("p", {innerText: ((value[1].matches / 60) * 100).round(0) + "%"});

        document.getElementById("result").appendChild(div);
        div.appendChild(name);
        div.appendChild(matches);
    });

}


var active = ['vvd','pvda','pvv','sp','cda','d66','cu','gl','sgp','pvdd','50plus','op','vnl','denk','nw','fvd','dbb','vp','pp','a1','ns','lp','lidk'];
var inactive = ['gp','jl','snl','pvmes','vdp'];


function loadParties(){
    active.forEach(value =>{
        let div = createElement("div", {classList: "white-logo-circle"});
        let img = createElement("img", {src: 'img/logos/' + value + '.png'});

        document.getElementById("div-1").appendChild(div);
        div.appendChild(img);
    });
    inactive.forEach(value =>{
        let div = createElement("div", {classList: "white-logo-circle"});
        let img = createElement("img", {src: 'img/logos/' + value + '.png'});

        document.getElementById("div-2").appendChild(div);
        div.appendChild(img);
    });
}

function updateProgressBar(count){
    document.getElementById('progress').style.width = [count]/30*100+'%';
}

function move(x) {
    x.style.position = 'relative';
    x.style.left = '-1vw';
}
function moveBack(x) {
    x.style.left = '0px';
}