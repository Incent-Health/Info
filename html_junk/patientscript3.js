var patientAddress = getUrlParameter('address');
var data = "address=" + patientAddress;
var healthprovider, providertimestamp;

getInfoPHP(patientAddress);

function getInfoPHP(patientAddress){ //read about JS Asynchronous nature
	$.post("php/getInfo.php", data, function(data){ 
		// console.log(data);
		// data = data.split("|");
		// healthprovider = data[0];
		// providertimestamp = data[1];
		// console.log(data);
		// console.log(healthprovider);
		// console.log(providertimestamp);
		// $(".providerText").text(healthprovider);
		// $(".providerInviteTime").text(providertimestamp);
		console.log(data);
		data = data.split("|");
		$(".AddressInput").text(data);
	});
};

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
