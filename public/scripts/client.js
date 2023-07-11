/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  //escape function to prevent Cross site Scripting/ code inhection
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const jsEscape = function (str) {
    return String(str).replace(/[^\w. ]/gi, function (c) {
      return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4);
    });
  };

  //Dynamically build the HTML to display the tweet
  const createTweetElement = function (tweet) {
    const html = `<article>
<header>
  <div>
  <img src = ${tweet.user.avatars} class ="avatar"/>
  <span>${tweet.user.name}</span>          
</div>
  <p>${tweet.user.handle}</p>
</header>          
  <p>
   ${(tweet.content.text)} 
  </p> 

  <hr>  
  <footer>
  <div> ${timeago.format(tweet.created_at)}</div>
<div>
    <i class="fa-brands fa-font-awesome"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
  </div>
</footer>
</article>`;

    return html;
  };

  //Render the tweet from an array of tweets
  const renderTweets = function (tweetArray) {
    tweetArray.forEach((item) => {
      let $article = createTweetElement(item);
      $("#tweets-container").prepend($article);
    });
  };

  //Validation for correctness of the user input
  const validate = function () {
    const myTweet = $("#tweet-text").val();
    if (myTweet.length > 140) {
      return "The tweet charater cannot be greater than 140 in length";
    } else if (myTweet == null) {
      return "The tweet cannot be blank";
    } else if (myTweet.trim() === "") {
      return "The tweet cannot be empty";
    }
    return null;
  };

  //Posting to \tweets route to submit user tweet

  $("#targetForm").on("submit", function (event) {
    event.preventDefault();
    const result = validate();
    if (result) {
      $("#errorLabel").text(result);
      $("#errorLabel").css("display", "block");
      return false;
    } else {
      $("#tweet-text").val(jsEscape($("#tweet-text").val()));
    }
    const data = $("#targetForm").serialize();
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: data,
    })
      .then(function () {
        refresh();
        loadTweets();
      })
      .catch(function () {
        $("#errorLabel").text("Unable to submit tweet");
        $("#errorLabel").css("display", "block");
      });
  });

  //load the tweet
  function loadTweets() {
    $.ajax("/tweets", { method: "GET" })
      .then(function (data) {
        renderTweets(data);
      })
      .catch(function () {
        $("#errorLabel").text("Unable to fetch tweet");
        $("#errorLabel").css("display", "block");
      });
  }
  //Refresh the tweet to avoid duplications
  function refresh() {
    $("#tweet-text").val("");
    $("#errorLabel").css("display", "none");
    $("#tweets-container").html("");
  }
  loadTweets();
});
