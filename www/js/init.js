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
    $('.collection:first-of-type').append('<li class="collection-item"><div>'+element["name"]+'<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>');
  }

  $('.secondary-content').click(function() {
    // Save the parent node in a variable
    varParent = $(this).parent();
    // Clone parent, delete children and get the inner text
    parentText = varParent.clone().children().remove().end().text();
    var tabs = document.getElementById("tabs");
    var tabsInstance = M.Tabs.getInstance(tabs);
    tabsInstance.select("test-swipe-2");
    // console.log(parentText);
    
        /*
        // Tab 2
        var tabs = document.getElementById("tabs-swipe-demo");
        var tabsInstance = M.Tabs.getInstance(tabs);
        tabsInstance.select("tab2");
        */
  });
}

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

}
