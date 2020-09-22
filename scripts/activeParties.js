var abbreviationsActive = ['vvd','pvda','pvv','sp','cda','d66','cu','gl','sgp','pvdd','50plus','op','vnl','denk','nw','fvd','dbb','vp','pp','a1','ns','lp','lidk'];
var abbreviationsNonActive = ['gp','jl','snl','pvmes','vdp'];

for(i=0; i<subjects.length-abbreviationsActive.length-2; i++){
    document.getElementById('div-2').innerHTML += '<div class="white-logo-circle"><img src="img/logos/' + abbreviationsNonActive[i] + '.png"></div>';
}