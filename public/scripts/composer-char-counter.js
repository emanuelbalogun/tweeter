$(document).ready(function() {
  // --- our code goes here ---
  
  $("#tweet-text").on("keyup", function() {
    const inputlength = $(this).val().length;
    $(".counter").val(140 - inputlength);
    if(inputlength > 140) {
      $(".counter").css("color" ,"red")
    }
    else {
      $(".counter").css("color" ,"black")
    }
    
  })
  
});