document.querySelector("#signin").classList.add("target");

if (document.querySelector(".alert-message").innerHTML == "") {
    document.querySelector(".alert-message").style.opacity = 0;
    document.querySelector(".alert-message").style.display = 'none';
} else {
    document.querySelector(".alert-message").style.opacity = 1;
    document.querySelector(".alert-message").style.display = 'block';
    setTimeout(function () {
        document.querySelector(".alert-message").style.opacity = 0;
        setTimeout(function () {
            document.querySelector(".alert-message").style.display = 'none';
        }, 500);
    }
        , 3000);

}