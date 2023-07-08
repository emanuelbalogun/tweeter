/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready (function() {

const DaysBetween = function (timestamp) {
  const dateFormat = new Date(timestamp);
  const today = new Date();
  const daysago = (today.getTime() - dateFormat.getTime()) / (1000 * 3600 * 24);
  return Math.round(daysago);
};

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
   ${escape(tweet.content.text)} 
  </p> 

  <hr>  
  <footer>
  <div>${DaysBetween(tweet.created_at)} days ago</div>
<div>
    <i class="fa-brands fa-font-awesome"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
  </div>
</footer>
</article>`;

  return html;
};

const renderTweets = function (tweetArray) {
  tweetArray.forEach((item) => {
    let $article = createTweetElement(item);
    $("#tweets-container").prepend($article);
  });
};


const validate = function() {
  const myTweet = $("#tweet-text").val();
    if(myTweet.length > 140) {

    return "The tweet charater cannot be greater than 140 in length";
  } 
  else if(myTweet == null) {
    return "The tweet cannot be blank";
  }
  else if (myTweet.trim() === ""){
    return "The tweet cannot be empty";
  }
  return null;
}

$("#targetForm").on("submit", function (event) {
  event.preventDefault(); 
  const result = validate();
  if(result) {
    $("#errorLabel").text(result);
    $("#errorLabel").css('display', 'block');
    return false;
  }
  const data = $("#targetForm").serialize();
  $.ajax({
    type: "POST",
    url: "/tweets",
    data: data
  }).then (function() {loadTweets()});

   
});

//load the tweet
function loadTweets() {
  
  $.ajax('/tweets', { method: 'GET' })
  .then(function (data) {    
    renderTweets(data);
})};

loadTweets(); 
});
