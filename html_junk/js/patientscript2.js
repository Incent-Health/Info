// $("header div, .mainbody *").hide();
// $("header div, .mainbody *").fadeIn(900);

var incentivetype;
var patientAddress = getUrlParameter('address');

$(".submitForm").submit(function(e){
	e.preventDefault();
	incentivetype = $(".incentiveSelect").val();
	console.log('?address=' + patientAddress + '&incentivetype=' + incentivetype);
	var link = "./patient3.html";
	location.href = link + '?address=' + patientAddress + '&incentivetype=' + incentivetype;
});

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};