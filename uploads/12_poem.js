//Part 1 - Define the extra information section for the poem
$("#info").html("<p>Extra info will go here.</p>");

// Part 2 - Display the poem and allow for clicking on words
$.getJSON("poem.json", function(data){ // data variable is the JSON object
  let poemText; // Define a new variable to hold all text
  poemText = "<blockquote><p>"; // Open the starting tags
  // Now you can iterate (map) over the data variable’s .lines property:
  data.lines.map(function(line){ // We get a variable, line
    // Define a blank lineText.
    let lineText = "";
    // Now iterate over each line. This part should be familiar to you from before
    line.map(function(word){
      let wordString;
      wordString = word.text;
      if (word.info){
        wordString = "<a href='#' data-info='" + word.info + "'>" + wordString + "</a>";
      }
      lineText = lineText + wordString + " "; // Add the word to the lineText variable with spacing
    });
    // Add lineText with a line break to the poemText
    poemText = poemText + lineText + "<br/>";
  });
  // Close the poemText tags
  poemText = poemText + "</p></blockquote>";
  // Replace the content of #poem
  $("#poem").html(poemText);
  // Now that we have the data, we can add the click event to the poem
  $("#poem a").click(function(){
    let infoText, clickedWord, clickedInfo;
    clickedWord = $( this ).text();
    // .data("info") looks for the data-info HTML attribute
    clickedInfo = $( this ).data("info");
    infoText = clickedInfo;
    $("#info").html(infoText);
  });
}); // Close the getJSON method and callback function