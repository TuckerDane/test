/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  _____           _              __        __    _ _                                                       
 |_   _|   _  ___| | _____ _ __  \ \      / /_ _| | | _____ _ __                                                              
   | || | | |/ __| |/ / _ \ '__|  \ \ /\ / / _` | | |/ / _ \ '__|                                                             
   | || |_| | (__|   <  __/ |      \ V  V / (_| | |   <  __/ |                                                                
   |_| \__,_|\___|_|\_\___|_|       \_/\_/ \__,_|_|_|\_\___|_|                                                                                                                                         

[x] Requirements Met:
  [x] Webpage is presentable as a whole
    [x] User Friendly Interface; Text easy to read
    [x] Contains pictures and videos
  [x] Contains a home page
  [X] Contains 3 sub-pages (landing page, 404, 500 pages; each section of the home page)
  [x] Contains a horizontal menu that leads to other pages (links to subsections of home page)
  [x] Homepage has a picture carousel animation (on landing page)
  [x] Has a scroll box in one page (entire home page is a scrollbox)
  [x] Contains an unordered HTML list with several entries (the navbar is an unordered HTML list)
  [x] There is a button to download files (The entire About section is a link to download my resume)
    [x] The downloaded file can open in browser or download to the local computer
  [x] There is a link that leads outside the webpage (Projects section links to Github)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

// SET UP EXPRESS AND HANDLEBARS
///////////////////////////////////////////////
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({

    // HANDLEBARS HELPERS
    ///////////////////////////////////////////////
    helpers: {
        // Courtesy of Arlo Carreon: http://arlocarreon.com/blog/javascript/handlebars-js-everyother-helper/
        everyOther: function (index, amount, scope){
          if ( ++index % amount) 
          {
            return scope.inverse(this);
          }
          else 
          {
            return scope.fn(this);          
          }
        }
    },
    defaultLayout: 'main'
});

var bodyParser = require('body-parser');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

/////////////////////////////////////////////////////////////////////////
//
//  genContext
//  description:      generates a context 
//
//  @return context   information to be returned based on if the request
//                    was via GET or POST
//
/////////////////////////////////////////////////////////////////////////
function genTitle(subtitle, backgroundImage){
  var context = {"sub": subtitle, "img": backgroundImage};
  return context;
}

// HANDLES MAIN LANDING PAGE
///////////////////////////////////////////////
app.get('/',function(req,res){

  // slideshow mages courtousy of: https://www.behance.net/ashrafomar
  var firstImage = "/images/slide1.gif";
  var slideshow = [];
  for (let i = 1; i < 6; i++)
  {
    slideshow.push({'link':'/images/slide' + (i+1) + '.gif'});
  }
  var context = {"sub" : "Main"}
  context.img = firstImage;
  context.bodyList = slideshow;
  res.render('landing_page', context);
});

// HANDLES HOME PAGE
///////////////////////////////////////////////
app.get('/home',function(req,res){
  var image = "/images/4.jpg";

  //  DATA / WEBSITE CONTENT
  //////////////////////////////////////////////////////////////////////

  // ABOUT
  var aboutContent = [];
  aboutContent.push(
      {
        "picture": "/images/Tucker.jpg",
        "description": "I have both a strong work and play ethic. \
                        When I am not striving for excellence on my career goals, \
                        you can find me floating the Santiam River, climbing out at Smith Rock, \
                        or tinkering with a side-project. I have a diverse set of interests, \
                        and an intense focus on each. To maintain a work-life balance, I remain well-organized; \
                        one of my favorite tools is the simple whiteboard I keep with a running list of tasks! \
                        Primarily, I am a Computer Science student at Oregon State University. \
                        I have always been interested in pursuing a career in Software Engineering, \
                        and in 2015 decided to formally begin that journey. I am particularly interested in \
                        Machine Learning, 3D Graphics, and VR/AR Technology. I have taken coursework in C, C++, \
                        and Assembly Language. I am familiar with GitHub, and have a strong understanding of Data Structures. \
                        I am also an Officer in the Army National Guard. It has always been important to me that \
                        I give back to those around me; in 2011, I decided that the best way to do so would be by serving. \
                        It is a profession that remains an extremely rewarding part of my life. I have an excellent team, \
                        and am humbled by the privilege of serving with and learning from them. \
                        When not working on my degree or serving in the Guard, I’m in the business of pursuing side projects and interests! \
                        I currently work as a Rock Gym Coach at Nike World Headquarters. Climbing is a huge part of my life and you can often \
                        find me in the gym training for the next outdoor trip. For many years, I’ve volunteered or worked as a Whitewater Raft Guide, \
                        and every so often I’ll get back out there on the river. I am a habitual tinkerer. During my off-hours I will spend \
                        time building games in Unity and learning JavaScript, developing an independent board game, or fiddling around with my 3D printer.",
        "link": "/resume"
      }
  );

  // PROJECTS
  var projectContent = [];
  projectContent.push(
      {
          "link": "https://github.com/TuckerDane/2017_OpenGL_Projects",
          "title": "OpenGL Projects",
          "description": "A series of projects I'm doing as I learn OpenGL",
          "image": "/images/OpenGL.png"
      },

      {
          "link": "https://github.com/TuckerDane/2016_OSU_ComputerScienceII_FinalProject",
          "title": "Text-Based Game",
          "description": "Final Project for Computer Science II taken at OSU",
          "image": "/images/CS162FP.png"
      },

      {
          "link": "/",
          "title": "TuckerDane",
          "description": "A website displaying my work!",
          "image": "/images/website.png"
      }
  );

  // INTERESTS
  var interestContent = [];
  interestContent.push(
      {
        "title": "La Dura Dura",
        "description": "Chris Sharma and Adam Ondra Climbing Something Hard",
        "video": "https://www.youtube.com/embed/V1P97VVt6_k"
      }
  );


  // CONTACT
  // var contactContent = []; // I'll finish this later...

      var content = [];
        content.push(
          {
            'name':'About',
            'content': aboutContent
          }, 

          {
            'name':'Projects',
            'content': projectContent
          }, 

          {
            'name':'Interests',
            'content': interestContent
          }, 

          {
            'name':'Contact',
            'content': "Send me a message!" // contactContent
          }

        ); 
        
        var context = genTitle("Home", image);
        context.bodyList = content;
        res.render('home', context);  
});

// HANDLES FILE DOWNLOAD
///////////////////////////////////////////////
app.get('/resume', function(req, res){
  var file = 'public/Resume.pdf';
  res.download(file); // Set disposition and send it.
});

// HANDLES 404 PAGE NOT FOUND
///////////////////////////////////////////////
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

// HANDLES CODING ERRORS
///////////////////////////////////////////////
app.use(function(err, req, res, next){
  console.log("ERROR");
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

// LISTEN ON INDICATED PORT
///////////////////////////////////////////////
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
