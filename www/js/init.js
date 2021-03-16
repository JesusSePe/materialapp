(function($){
  $(function(){

    // Init GUI
    $('.sidenav').sidenav();
    $('.tabs').tabs({ "swipeable": true });
  }); // end of document ready
})(jQuery); // end of jQuery name space


$("#searchbutton").click(function() {
  band = $('#searchbar').val();
  $.ajax({
    method: "GET",
    url: "https://musicbrainz.org/ws/2/artist?query="+band,
    dataType: "json",
  }).done(function(msg){
    showResults(msg);
  }).fail(function(){
    alert("Ajax Error");
  });
});

function showResults(result) {
  $('.collection:first-of-type').empty();
  var bands = result["artists"];
  for (let index = 0; index < bands.length; index++) {
    const element = bands[index];
    $('.collection:first-of-type').append('<li artistid="'+element["id"]+'" class="collection-item">'+element["name"]+'<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></li>');
  }

  $('.secondary-content').click(function() {
    // Save the parent node in a variable
    varParent = $(this).parent();
    // Clone parent, delete children and get the inner text
    parentText = varParent.clone().children().remove().end().text();
    var tabs = document.getElementById("tabs");
    var tabsInstance = M.Tabs.getInstance(tabs);
    tabsInstance.select("test-swipe-2");
    
    // Print artist info on second screen
    $.ajax({
      method: "GET",
      url: "https://musicbrainz.org/ws/2/artist/"+varParent.attr("artistid"), // Artist ID on custom tag
      dataType: "json",
    }).done(function(msg){
      showDetails(msg);
    }).fail(function(){
      alert("Ajax Error");
    });
        /*
        // Tab 2
        var tabs = document.getElementById("tabs-swipe-demo");
        var tabsInstance = M.Tabs.getInstance(tabs);
        tabsInstance.select("tab2");
        */
  });
}

function showDetails(info) {
  $('.details').empty();
  console.log(info);
  console.log(info["name"]);
  $('<h3>'+info["name"]+'</h3>').appendTo('.details');
  $('<p><b>Type:</b> '+info["type"]+'</p>').appendTo('.details');
  $('<p><b>Country:</b> '+info["area"]["sort-name"]+'</p>').appendTo('.details');
  $('<p><b>Life-span:</b> '+info["life-span"]["begin"]+' to '+info["life-span"]["end"]+'</p>').appendTo('.details');
}

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

}
