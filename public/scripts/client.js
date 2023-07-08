/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const DaysBetween = function(timestamp){
  const dateFormat = new Date(timestamp);
  const today = new Date();
  const daysago =  (today.getTime() - dateFormat.getTime())/ (1000 * 3600 *24)
  return Math.round(daysago);
}

const createTweetElement = function(tweet) {
const html = `<article>
<header>
  <div>
  <i class="fa-solid fa-user-large"></i> 
  <span>${tweet.user.name}</span>          
</div>
  <p>@SirIssac</p>
</header>          
  <p>
   ${tweet.content.text} 
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
</article>`

return html;
}

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}



const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
//$('#tweets-container').append($tweet); 