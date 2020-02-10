function onload(){
    createElement("button", {onclick: start, innerText: "Start"}, function(element){
        document.getElementById("container").appendChild(element);
    });

}

function start(){
    document.getElementById("container").firstChild.remove();
    question();
}

function question(index = 0, data = {eens: 0, oneens: 0, geen: 0}){
    let container = document.getElementById("container");
    while(container.firstChild){
        container.firstChild.remove();
    }

    questionInfo = subjects[index];
    party = questionInfo.parties;

    createElement("h1", {innerText: questionInfo.title}, function(element){
        container.appendChild(element);
    });
    createElement("h2", {innerText: questionInfo.statement}, function(element){
        container.appendChild(element);
    });

    Object.keys(data).forEach(value =>{
        createElement("button", {innerText: value.capitalize(), onclick: function(){
                data[value]++;
                index++;
                question(index, data);
            }}, function(element){
            container.appendChild(element);
        })
    });

    console.log(JSON.stringify(data));

    questionInfo.parties.forEach(value =>{
        createElement("p", {innerText: "Naam: " + value.name}, function(element){
            container.appendChild(element);
            console.log(questionInfo.parties.name);
        });
        createElement("p", {innerText: "Mening: " + value.opinion}, function(element){
            container.appendChild(element);
        });
    })

}