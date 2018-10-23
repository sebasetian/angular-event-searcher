function checkForm() {
	document.getElementById("need-validation").addEventListener("change", function () {
		let form = document.getElementById('need-validation');
		let submitBtn = document.getElementById('submitBtn');
		let StartLocationOther = document.getElementById('StartLocationOther');
		if (StartLocationOther.checked === true) {
			document.getElementById('location').disabled = false;
		} else {
			document.getElementById('location').disabled = true;
		}
		if (form.checkValidity() === false) {
			submitBtn.disabled = true;
		} else {
			submitBtn.disabled = false;
		}
	});
}