(function($){
  $(function(){

    // Init GUI
    $('.sidenav').sidenav();
    $('.tabs').tabs({ "swipeable": true });
  }); // end of document ready
})(jQuery); // end of jQuery name space.

function data() {
    jQuery.each( data_info['modules'], function( i, mp){
        $('.collapsible').first().append('<li><div class="collapsible-header">'+mp['code']+'. '+mp['name']+'</div><div class="collapsible-body"><div class="row"></div></div></li>');
        jQuery.each(mp['ufs'], function(x, uf){
            $('.row').last().append('<div class="col s6 m4">'+uf['code']+'. '+uf['name']+'</div>');
        })
    });
}

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    $(document).ready(function(){
        $('.collapsible').collapsible();
        data();
    });
    
    
}
