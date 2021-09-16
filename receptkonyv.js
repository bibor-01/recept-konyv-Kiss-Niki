var receptek=[];
var fejlec=["Név", "elkészítés idő", "Kép", "Leírás", "Hozzávalok"];
var sorID;
var rh0={};
var rh1={};
var rh2={};
$(function(){

    $.ajax(
        {url: "etelek.json",
        success: function(result){
        console.log(result);
        receptek=result.receptkonyv;
        console.log(receptek);
        megjelenit();
        rh0=receptek[0].hozzavalok;
        rh1=receptek[1].hozzavalok;
        rh2=receptek[2].hozzavalok;
        
        //$("footer").append(JSON.stringify(rh0));
        $("#h0").append(JSON.stringify(rh0).replace(/[""{}[-]+/gi, ' ').replace(/]/, ''));
        $("#h1").append(JSON.stringify(rh1).replace(/[""{}[-]+/gi, ' ').replace(/]/, ''));
        $("#h2").append(JSON.stringify(rh2).replace(/[""{}[-]+/gi, ' ').replace(/]/, ''));

        }}
    );

});

function megjelenit(){
    $("article").append("<table>");
    $("article table").append("<tr id='fejlec'>");
    for (let index = 0; index < fejlec.length; index++) {
        //const element = fejlec[index];
        $("article tr").append("<th>"+fejlec[index]);
    }
    //$("article").append("</tr>");

    //$("article").append("<tr>");
    //$("article").append("<td>"+receptek[0].nev+"</td>"+"<td>"+receptek[0].elkIdo+"</td>"+"<td>"+receptek[0].kep+"</td>"+"<td>"+receptek[0].leiras+"</td>"+"<td>"+receptek[0].hozzavalok+"</td>");

    for (let index = 0; index < receptek.length; index++) {
            $("article table").append("<tr id='"+index+"'><td>"+receptek[index].nev+"</td>"+"<td>"+receptek[index].elkIdo+"</td>"+"<td>"+receptek[index].kep+"</td>"+"<td>"+receptek[index].leiras+"</td>"+"<td id='h"+index+"'><td>"/*+receptek[index].hozzavalok+"</td></tr>"*/);
        }

    /*var txt = 
        "<tr id='fejlec'><th>Név</th><th>Elkészítés idő</th><th>Kép</th><th>Leírás</th><th>Hozzávalok</th>";
    for (var i = 0; i < receptek.length; i++) {
        txt += "<tr id='"+i+"'>";

        for (var item in receptek[i]) {
                txt+= "<td>"+receptek[i][item]+"</td>";
        }
        txt += "</td>";
    }
    $("article table").append(txt);*/
    $("article table tr").hover(hatter);
    $("tr").on("click", kepMegjelenit);
    $("#bal").on("click", balKatt);
    $("#jobb").on("click", jobbKatt);
}

function hatter(){
    console.log($(this).attr("id"));
    $(this).toggleClass("hatter");
}

function kepMegjelenit(){
    /*$("#kep").empty();
    i=$(this).attr("id");
    $("#kep").append("<img src='"+receptek[i].kep+"' alt='"+receptek[i].nev+"'>");
    $("#kep").append("<div id=tartalom>");
    $("#tartalom").append(receptek[i].nev+"<br>"+receptek[i].elkIdo+"<br>"+receptek[i].leiras+"<br>");
    */

   $("#kep").empty();
   $("#kep").append("<img src=''>");
   if($(this).attr("id") !== "fejlec"){
       sorID = Number($(this).attr("id"));
       console.log(receptek[sorID].kep);
       $("#kep img").attr("src", receptek[sorID].kep);
       $("#kep img").attr("alt", receptek[sorID].nev);
       $("#kep").append("<p>"+receptek[sorID].nev+"</p>");
       $("#kep").append("<h5>Hozzávalok:</h5>");
       
       if (sorID==0){
        for (let index = 0; index < rh0.length; index++) {
            valami=rh0[index];
            $("#kep").append(JSON.stringify(valami).replace(/[""{}[-]+/gi, ' ').replace(/]/, ''));
            $("#kep").append("<br>");
        }
       }
       if (sorID==1){
            for (let index = 0; index < rh1.length; index++) {
                valami=rh1[index];
                $("#kep").append(JSON.stringify(valami).replace(/[""{}[-]+/gi, ' ').replace(/]/, ''));
                $("#kep").append("<br>");
            }
        }
        if (sorID==2){
            for (let index = 0; index < rh2.length; index++) {
                valami=rh2[index];
                $("#kep").append(JSON.stringify(valami).replace(/[""{}[-]+/gi, ' ').replace(/]/, ''));
                $("#kep").append("<br>");
            }
        }
       //$("#kep").append(JSON.stringify(valami).replace(/[""{}[-]+/gi, ' ').replace(/]/, ''));
   }
}

/*function balKatt(){
    $("#kep").empty();
    
}*/

var index=0;
function balKatt(){
    megjelenes(index);
    //$("#kep img").attr("src",receptek[index].kep);
    index--;
    if(index<0){
        index=receptek.length-1;
    }
}
function jobbKatt(){
    megjelenes(index);
    index++;
    if(index>receptek.length-1){
        index=0;
    }
}

function megjelenes(x) {
    $("#kep").empty();
    $("#kep").append("<img src=''>");
    $("#kep img").fadeOut(3000);
    $("#kep img").attr("src",receptek[x].kep);
    $("#kep img").fadeIn(3000);
    $("#kep").append(receptek[x].nev);
    //$("#kep").eq(0).html(receptek[x].leiras);
}