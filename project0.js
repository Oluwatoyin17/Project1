// javascript for project one
var database = firebase.database();

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

$("#signUp").on("click", function () {
	event.preventDefault();
	//var userName = 
	console.log($("#inputEmail").val() == undefined ? '' : $("#inputEmail").val().trim());
	var userName = $("#inputName").val() == undefined ? '' : $("#inputName").val().trim();
	var userEmail = $("#inputEmail").val() == undefined ? '' : $("#inputEmail").val().trim();
	var password = $("#password").val() == undefined ? '' : $("#password").val().trim();
	var repeatPassword = $("#passwordRepeat").val() ==undefined ? '' : $("#passwordRepeat").val().trim();

	if (password === repeatPassword){
		console.log("Passwords Match!" , "continue to firebase");
		database.ref().push({
			name: userName,
			email: userEmail,
			password: password,
			//dateAdded: firebase.database.serverValue.TIMESTAMP
		});
		
	}else{
		alert("passwords do not match!!");
	}
});

//when there is a new entry to the database...
database.ref().on("child_added", function(childSnapshot){

	snap = childSnapshot.val();
	console.log(snap);
});

$("#loginBtn").on("click" , function(){
	event.preventDefault();
	console.log("I work!");

});


$('#id01').on('shown.bs.modal', function () {
	$('#myInput').trigger('focus')
})


$("#submit").on("click", function (event) {
	event.preventDefault();

	var address = $("#address").val().trim();
	var longitude;
	var latitude;
	var apiArray = [
		"f0236529f3a885d0f84f69ada3bd541e",
		//"P6SP3YQDM2IL5XINGMQHQIJDYNQTZPYXJMBLMJLFTBUH4PYTMV" , 
		//"22546c4a3636b34204b7b4c7d3d682b" ,
		"AIzaSyAOJy5-QBRK20FJ5SsYtPUkb1Urvyt_jy8"];
	var queryArray = [
		"https://api.openweathermap.org/data/2.5/weather?zip=" + (adddress) + "&units=imperial&APPID=" + apiArray[0],
		//"https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=" + apiArray[1] , 
		//"https://api.meetup.com/2/events?key=" + apiArray [2] + "&group_urlname=ny-tech&sign=true" , 
		//"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&key=" + apiArray[1] , 
		"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=500&key=" + apiArray[1]
	];


	//for(i = 0; i < apiArray.length;i++){

	//var APIKey = apiArray[i];
	console.log(queryArray[0]);
	//var queryURL = queryArray[i];

	$.ajax({
		url: queryArray[0],
		method: "GET"
	}).then(function (response) {
		//console.log(queryURL);
		console.log(response);
		longitude = response.coord.lon;
		latitude = response.coord.lat;
		console.log(latitude, longitude);
		//console.log(queryURL);
		queryArray[1] = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=500&key=" + apiArray[1];
		$("#weather-data").html("<div id='cTemp'>" + "Current Temperature: " + response.main.temp + " F </div>");
		$("#weather-data").append("<div id='cCond'>" + "Current Conditions: " + response.weather["0"].main + "</div>");
		$("#weather-data").append("<div id='humid'>" + "Humidity: " + response.main.humidity + "</div>");
	console.log (weather-data);
	}).then(function () {
		$.ajax({
			url: queryArray[1],
			method: "GET"
		}).then(function (response) {
			console.log(response);
		});

	});

	//}





})
