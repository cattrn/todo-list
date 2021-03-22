$('.login form').attr('novalidate')

$('.login form').submit((e) => {
  console.log(document.cookie)
  const accessToken = document.cookie.split('; ').find(row => row.startsWith('atok=')).split('=')[1] // can I access it like this if the cookie is http only??
  // localStorage.setItem('accessToken', `${accessTokenCookie}`)
  const formData = {
    email: $('#email').val(),
    password: $('#password').val()
  }
  
  $.ajax({
    url: '/login',
    headers: {
        'Authorization':`Bearer ${accessToken}`,
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: JSON.stringify(formData),
  //   beforeSend: function (xhr) {
  //     xhr.setRequestHeader ("Authorization", "Bearer " + `${accessToken}`);
  // },
    success: function(){
      console.log('succes! '+data);
    }
  })

  $.ajax({
    url: '/',
    headers: {
      'Authorization':`Bearer ${accessToken}`
    },
    method: 'GET'
  })
})

