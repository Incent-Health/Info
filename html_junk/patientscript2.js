var incentiveselect;

	// incentiveselect = $(".incentiveSelect").val();
	// console.log("incentiveselect=" + incentiveselect + "&address=" + getUrlParameter('address'));
	// sendIncentiveSelectToPHP("incentiveselect=" + incentiveselect + "&address=" + getUrlParameter('address'));

$(".submitButton").click(function(){
	incentiveselect = $(".incentiveSelect").val();
	console.log("incentiveselect=" + incentiveselect + "&address=" + getUrlParameter('address'));
	sendIncentiveSelectToPHP("incentiveselect=" + incentiveselect + "&address=" + getUrlParameter('address'));
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