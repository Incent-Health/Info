var providerAddress = getUrlParameter('address');

setProviderPortalLink();

function setProviderPortalLink(){
	var link = $(".linkProviderPortal").attr("href");
	$(".linkProviderPortal").attr("href",link + "?address=" + providerAddress);
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
