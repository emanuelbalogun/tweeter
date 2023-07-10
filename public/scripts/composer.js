$(document).ready(function () {
  $(window).on("scroll", function () {
    $("#scrollbutton").css("display", "block");
  });

  $("#scrollbutton").on("submit", function (event) {
    event.preventDefault();
    $(window).scrollTop();
  });
});
