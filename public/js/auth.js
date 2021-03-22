// May not be needed, currently living in login.js
// Doesn't get called because Passport auth prevents page from being loaded
const accessToken = localStorage.getItem('accessToken')
console.log(localStorage)

$.ajax({
  url: '/',
  headers: {
      'Authorization':`Bearer ${accessToken}`,
      'Content-Type':'application/json'
  },
  method: 'GET',
  dataType: 'json',
  // data: YourData,
  success: function(){
    console.log('succes:');
  }
});