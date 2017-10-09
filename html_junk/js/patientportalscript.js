// $("header div, .mainbody *").hide();
// $("header div, .mainbody *").fadeIn(900);

var patientAddress = getUrlParameter('address');

loadProviderInfo();
updatePortalLinks();

// $(".submitForm").submit(function(e){
// 	e.preventDefault();
// 	incentiveselect = $(".incentiveSelect").val();
// 	console.log("incentiveselect=" + incentiveselect + "&address=" + patientAddress);
// 	sendIncentiveSelectToPHP("incentiveselect=" + incentiveselect + "&address=" + patientAddress);
// 	var link = "./patient3.html";
// 	location.href = link + '?address=' + patientAddress + '&incentivetype=' + incentiveselect;
// });



// function sendIncentiveSelectToPHP(dataInput){ //read about JS Asynchronous nature
// 	$.post("php/insertIncentiveType.php", dataInput, function(data){ 
// 		console.log(data);
// 	});
// };

function loadProviderInfo(){
	var data = "address=" + patientAddress;
 	$.post("php/getPatientInfo.php", data, function(data){ 
 		var data = data.split("|");
 		var first_name = data[0];
 		var timestamp = data[1];

 		$(".patientname").text(first_name);
 		$(".patientportal-uportaddress").append(patientAddress);
 		$(".patientportal-lastlogin").append(timestamp);
 	});
}

function updatePortalLinks(){
	$(".patientportal a").each(function(i){
		var link = $(this).attr("href");
		$(this).attr("href", link + "?address=" + patientAddress);
	});
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};