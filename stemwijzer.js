function onload() {
    createElement("button", {onclick: start, innerText: "Start"}, function (element) {
        document.getElementById("container").appendChild(element);
    });

}

function start() {
    document.getElementById("container").firstChild.remove();
    question();
}

function question(index = 0, answers = []) {
    let container = document.getElementById("container");
    data = {Eens: "pro", Oneens: "contra", Geen: "none"};
    questions = subjects;
    checkboxes = [];
    questionInfo = subjects[index];
    while (container.firstChild) {
        container.firstChild.remove();
    }

    if (subjects.length <= index){
        let ul = createElement("ul", {}, function (element){
            container.appendChild(element);
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
        createElement("button", {innerText: "Verzenden", onclick: function(){
            checkboxanswers = [];
            checkboxes.forEach(value =>{
               checkboxanswers.push(value.checked);
            });
            includedParties(answers, checkboxanswers);
            }}, function (element){
            container.appendChild(element);
        });
    }
    else{

        createElement("h1", {innerText: questionInfo.title}, function (element) {
            container.appendChild(element);
        });
        createElement("h2", {innerText: questionInfo.statement}, function (element) {
            container.appendChild(element);
        });

        Object.keys(data).forEach(value => {
            createElement("button", {
                innerText: value.capitalize(), onclick: function () {
                    answers[index] = data[value];
                    index++;
                    question(index, answers);
                }
            }, function (element) {
                container.appendChild(element);
            })
        });
        if(index > 0){
            createElement("button", {innerText: "Vorige stelling", onclick: function(){
                    index--;
                    question(index, answers)
                }}, function (element){
                container.appendChild(element);
            });
        }
        createElement("button", {innerText: "Vraag overslaan", onclick: function(){
                answers[index] = "overgeslagen";
                index++;
                question(index, answers)
            }}, function (element){
            container.appendChild(element);
        });

        questionInfo.parties.forEach(value => {
            createElement("p", {innerText: "Naam: " + value.name}, function (element) {
                container.appendChild(element);
            });
            createElement("p", {innerText: "Mening: " + value.opinion}, function (element) {
                container.appendChild(element);
            });
        });
    }


}

function includedParties(answers, checkboxanswers, settings = "all") {
    let container = document.getElementById("container");
    while (container.firstChild) {
        container.firstChild.remove();
    }
    party = parties;
    partiesChecked = [];

    ["Alles", "Seculaire", "Grote"].forEach(value =>{
        createElement("button", {innerText: value, onclick: function () {
                includedParties(answers, checkboxanswers, value)
            }}, function(element){
            container.appendChild(element);
        });
    });

    if(settings === "Seculaire"){
        let ul = createElement("ul", {}, function (element){
            container.appendChild(element);
        });
        party.forEach(value =>{
            if(value.secular === true){
                let li = createElement("li");
                let checkbox = createElement("input", {type: "checkbox", checked: true});
                let label = createElement("label", {innerText: value.name, checked: true});

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

    createElement("button", {innerText: "Verzenden", onclick: function(){
        partiesinresult = [];
        partiesChecked.forEach(value =>{
           if(value[0].checked === true){
               partiesinresult.push(value[1].innerText);
           }
        });
            score(answers, checkboxanswers, partiesinresult);
        }}, function (element){
        container.appendChild(element);
    });
}

function score(answers, checkboxanswers, partiesChecked){
    console.log("Received answers: {0}".format(answers));
    console.log("Received important subjects: {0}".format(checkboxanswers));
    console.log("Received parties: " + partiesChecked);

    let container = document.getElementById("container");

    questions = subjects;
    voteresult = {};

    //todo antwoord controleren of ze hetzelfde zijn als een partij
    //todo alle belangrijke punten dubbel laten tellen voor alle partijen die dezelfde vote hebben
    //todo de geselecteerde partijen eruit filteren

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

    Object.entries(voteresult).forEach(value =>{
        let div = createElement("div");
        let name = createElement("h1", {innerText: value[1].name});
        let matches = createElement("p", {innerText: ((value[1].matches / 60) * 100).round(0) + "%"});

        container.appendChild(div);
        div.appendChild(name);
        div.appendChild(matches);
    });

}

























