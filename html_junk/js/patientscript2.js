// $("header div, .mainbody *").hide();
// $("header div, .mainbody *").fadeIn(900);

var incentiveselect;
var patientAddress = getUrlParameter('address');

$(".submitForm").submit(function(e){
	e.preventDefault();
	incentiveselect = $(".incentiveSelect").val();
	console.log("incentiveselect=" + incentiveselect + "&address=" + patientAddress);
	sendIncentiveSelectToPHP("incentiveselect=" + incentiveselect + "&address=" + patientAddress);
	var link = "./patient3.html";
	location.href = link + '?address=' + patientAddress + '&incentivetype=' + incentiveselect;
});



function sendIncentiveSelectToPHP(dataInput){ //read about JS Asynchronous nature
	$.post("php/insertIncentiveType.php", dataInput, function(data){ 
		console.log(data);
	});
};

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};