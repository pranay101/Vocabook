// Animations init

(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();



/// word of the day


  function wordOfTheDay(){
    //const search_input =  document.getElementById("search_input").value;
    //var data = "{\n	username \"jhon123\",\n	password : \"12345\"\n}";
    //console.log(process.env.API_KEY);
  
    var xhr = new XMLHttpRequest();
  
    //xhr.open("GET", "https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key="+ process.env.API_KEY,true);
    xhr.open("GET", "/data/word_of_the_day",true);
  
    xhr.onload = function(){
      console.log("inside onload")
      render_html_word_of_the_day(JSON.parse(this.responseText));
    
    }
  
  xhr.send();
  
  
  }
  
  function render_html_word_of_the_day(data) {
    var render_text = "";
    var examples = "";
    var word  = data.word;
    document.getElementById("word_name").innerHTML = " Word : " + word;
    for(var key in data.definitions){
      // console.log(data.definitions[key].text);
      render_text += data.definitions[key].text;
      render_text += "<br>" +" Part of Speech : "+ data.definitions[key].partOfSpeech +"<br><br>";
      
    }
    for(var key2 in data.examples){
      // console.log(data.definitions[key].text);
      examples += data.examples[key2].text +"<br><br>";
     // examples += "<br>" +" Part of Speech : "+ data.definitions[key].partOfSpeech ;
      
    }

    document.getElementById("word_definition").innerHTML = "Definitions : <br><br>" + render_text;
    document.getElementById("example").innerHTML = "Examples : "+ examples;
    document.getElementById("note").innerHTML = "Note  : "+ data.note;

  
  }
  

  function word_search(){
    // make structure visible
    document.getElementById('search_result').style.visibility = 'visible';



    const search_word = document.getElementById("search_word").value;
    const word = document.getElementById("word");
    const example_search = document.getElementById("example_search");
    const meaning = document.getElementById("meaning");
   

    var xhr1 = new XMLHttpRequest();
    //xhr1.open('GET', 'https://api.wordnik.com/v4/word.json/' + search_word + '/definitions?limit=10&includeRelated=false&useCanonical=false&includeTags=false&api_key=' + process.env.API_KEY, true);
    xhr1.open('GET', '/data/search/' + search_word  ,true);
    xhr1.onload = function(){
      var data = JSON.parse(this.response);
      //var data = this.response;
      //console.log(data);
        if (xhr1.status >= 200 && xhr1.status < 400) {
            var i = Math.ceil(Math.random() * 10);      //  get a random number from 1 to 10
            word.innerHTML = "Word : " + data[i].word;      //  get a random definition
            meaning.innerHTML = "Definition : <br> "+data[i].text;
        } else {
            word.innerHTML = "Error";
            definition.innerHTML = "Error";
        }
    }
    xhr1.send();


    /// for examples

    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', '/data/searchexample/'+ search_word, true);
    xhr2.onload = function(){
      var data2 = JSON.parse(this.response);
        if (xhr2.status >= 200 && xhr2.status < 400) {
            example_search.innerHTML = "Examples : <br>" + data2.text;
        } else {
            example_search.innerHTML = "Error";
        }
    }

    xhr2.send();

  }
    


  //// send site review

  // function send_site_message(){
  //   const site_review = document.getElementById("site_review").value;
  //   if(site_review){
  //     var mailer = new XMLHttpRequest();
  //     mailer.open('POST')
  //   }
  // }