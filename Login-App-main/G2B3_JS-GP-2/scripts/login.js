function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var creds = [];

  $.getJSON("data/Cred.json", function(data) {
    $.each(data.credentials, function(key, value) {
      creds.push(value);
    });

    console.log(creds);

    var loginSuccessful = false;

    $.each(creds, function(key, value) {
      if (value.username == username && value.password == password) {
        loginSuccessful = true;

        // Use pushState to add a new history entry and replace the current URL with a new one
        var newUrl = "../pages/resume.html";
        window.history.pushState(null, null, newUrl);

        // Navigate to the new page
        window.location.href = newUrl;
      }
    });

    if (!loginSuccessful) {
      alert("Invalid username or password");
    }
  });

}
