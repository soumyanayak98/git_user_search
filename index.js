const userName = document.getElementById("uName");
const userFName = document.getElementById("uFName");
const userImage = document.getElementById("uImg");
let userArr = [];
let temp = {};
searchBtnClicked = () => {
	let searchtext = document.querySelector("#search").value.trim();
	let searchUrl = `https://api.github.com/users/${searchtext}`;
	if (searchtext.length <= 0) {
		alert("Please Enter a Git User Name");
	} else {
		//api call
		fetchUser(searchUrl);
	}
};

function fetchUser(url) {
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			if (data.message === "Not Found") {
				alert("user not found");
			} else {
				displayCard(data);
			}
		})
		.catch((error) => {
			console.log(error);
		});
}

function displayCard(data) {
	document.getElementsByClassName("card_content")[0].style.display = "block";
	userImage.setAttribute("src", data.avatar_url);
	userName.textContent = data.login;
	userFName.textContent = data.name;
	let userData = {
		username: data.login,
		email: data.email,
		name: data.name,
		location: data.location,
	};
	temp = userData;
	console.log("tempdata->", temp);
}

function addToTable() {
	console.log("adding...");
	if (!userArr.includes(temp)) {
		userArr.push(temp);
	} else {
		alert("User already added");
	}
	update();
}

update = () => {
	t_body = document.getElementById("table_body");
	t_body.innerHTML = "";
	userArr.map((ele, index) => {
		t_body.innerHTML += `<tr>
		<td>${index + 1}</td>
		<td>${ele.username}</td>
		<td>${ele.name}</td>
		<td>${ele.location}</td>
		<td>
		<button onClick={deleteEle(${index})}>Delete</button>
		</td>
		</tr>`;
	});
};

function deleteEle(itemIndex) {
	console.log(`deleting ${itemIndex}`);
	userArr.splice(itemIndex, 1);
	update();
}
