const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/blogDB")

const homeStartingContent = "Welcome to Blog Website - Your Source for Inspiration, Information, and Connection!🌟 Discover a World of Ideas: Dive into a treasure trove of engaging and insightful articles covering a wide range of topics. Whether you're passionate about technology, travel, lifestyle, or anything in between, we've got something for everyone.📚 Knowledge Hub: Our blog is more than just a collection of articles; it's a knowledge hub where you can explore in-depth guides, how-to tutorials, and expert advice. Stay informed and empowered with the latest trends and insights.🤝 Join the Community: Connect with like-minded individuals from around the globe. Share your thoughts, experiences, and expertise in our vibrant community forum. Engage in meaningful discussions and forge connections that last a lifetime.";
const aboutContent = "What We Offer: Diverse Content: Our  blog covers a wide range of topics, from technology and science to travel, lifestyle, and personal development. No matter your interests, you're sure to find something here that captivates your mind and sparks your curiosity.Expert Contributors: Our team of expert writers and contributors are dedicated to providing you with well-researched, informative, and engaging content. They bring a wealth of knowledge and experience to each article they produce. Community Engagement: We believe in the power of community. Our blog isn't just a platform for us to share our thoughts; it's a space for you to share your opinions, engage in discussions, and connect with like-minded individuals. Regular Updates: We strive to keep our content fresh and up-to-date. You can expect new articles, stories, and insights regularly, so be sure to check back often.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postSchema={
  title: String,
  content: String
};
  const Post  = mongoose.model("Post",postSchema);




  //Home Route
app.get("/", function(req, res){
  Post.find({},function(err,posts){
    res.render("home",{
      startingContent: homeStartingContent,
      posts: posts
    });
  })
});



//about Page
app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

//compose Page
app.get("/compose",function(req,res){
  res.render("compose")
})


//contact Page
app.get("/contact", function(req, res){
  res.render("contact");
});




//compose Page 
app.get("/compose", function(req, res){
  res.render("compose");
});

//parseing compose content to the home page 
app.post("/compose", function(req, res){

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save(function(err){
    if(!err){
      res.render("/")
    }
  });

 
 

  res.redirect("/");

});

//creating dynamic route using the express routing parameter for each post
app.get("/posts/:postId", function(req, res){
  const requestedId = req.params.postId;
  Post.findOne({_id:requestedId},function(err,post){
    res.render("post",{
      title:post.title,
      content: post.content
    });
  });


});


//establishing port connection on server
app.listen(8080, function() {
  console.log("Server started on port 8080");
});
