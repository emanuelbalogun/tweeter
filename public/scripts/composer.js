$(document).ready(function () {
  $(window).on("scroll", function () {
    $("#scrollbutton").css("display", "block");
  });

  $("#scrollbutton").on("click", function (event) { 
    event.preventDefault();
    // window.scrollTo(0,0);
$("html").scrollTop(0);
  });
});
