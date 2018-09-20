$( document ).ready(function() {
  console.log( "ready!" );

  $("#our-form").submit(function(e) {
    e.preventDefault();
    // Get some values from elements on the page:
    let $form = (this),
      username = $form.find( "input[name='username']" ).val(),
      password = $form.find( "input[name='password" ).val(),
      first = $form.find( "input[first='first" ).val(),
      last = $form.find( "input[first='last" ).val(),

      url = $form.attr("action");

    // Send the data using post
    let posting = $.post( '/sign-up', { username: username, password: password, first: first, last: last } );

    Cookies.set('token', posting);
    // To redirect add:
    window.location.href = "/";
  });

});

document.getElementById("sign-up-btn").onclick = function () {
  location.href = "/sign-up";
};
