// $("header div, .mainbody *").hide();
// $("header div, .mainbody *").fadeIn(900);

var providerAddress = getUrlParameter('address');

loadProviderInfo();

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
	var data = "address=" + providerAddress;
 	$.post("php/getProviderInfo.php", data, function(data){ 
 		var data = data.split("|");
 		var name = data[0];
 		var timestamp = data[1];

 		$(".providername").text(name);
 		$(".providerportal-uportaddress").append(providerAddress);
 		$(".providerportal-lastlogin").append(timestamp);
 	});
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};