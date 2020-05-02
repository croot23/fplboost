import getCookie from '../../Cookies/get_cookies.js'

/* Functoin to set initial league on page load from either a cookie or first dropdown option */
export default function setInitialLeague(leagues) {
	var last_viewed_league = getCookie('last_viewed_league');
	var selectBox = document.getElementById("selectLeague");
	
	if (last_viewed_league != "") {
		selectBox.value = last_viewed_league;
	} else {
		selectBox.value = leagues[0].id;
	}
}
