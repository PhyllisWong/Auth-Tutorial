
$( document ).ready(() => {
  $("#signup").submit(function(e) {
    let form = $(this);
    let url = form.attr('action');
    $.post({
      url: url,
      data: form.serialize(),
      success: ( res ) => {
        Cookies.set('token', res);
        window.location.href = "/success";
      }
    });
    e.preventDefault();
  });

$('#sign-up-btn').on('click', function(e) {
  e.preventDefault(); // <= force the form to not redirect

  location.href = "/sucess";
})


