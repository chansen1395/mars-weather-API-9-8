import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import MarsCam from './mars-cam.js';

function clearFields() {
  $('#location').val("");
  $('.showAPOD').text("");
  $('.showMarsCam').text("");
  $('.showDONKI').text("");
}

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let earth_date = $('#date').val();
    clearFields();
    let promise = MarsCam.getMarsCam(earth_date);
    promise.then(function(response) {
      const body = JSON.parse(response);
      $(".showMarsCam").append(`<img src='` + body.photos[0].img_src + `'style='height:350px; width:400px;'/>`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
    
    let promise1 = MarsCam.getAPOD(earth_date);
    promise1.then(function(response) {
      const body = JSON.parse(response);
      $(".showAPOD").append(`<img src='` + body.hdurl + `'/><br>
      <p>Explanation: ` + body.explanation + `</p>`);
    });

    let promise2 = MarsCam.getDONKI();
    promise2.then(function(response) {
      const body = JSON.parse(response);
      let i = 0;
      if (body.length > 3) {
        i = body.length - 3;
      }
      while (i < body.length) {
        $(".showDONKI").append(`<p>Flare Name: ` + body[i].instruments[0].displayName + `</p>`);
        $(".showDONKI").append(`<p>Peak Time: ` + body[i].peakTime + `</p>`);
        $(".showDONKI").append(`<p>Flare Class: ` + body[i].classType + `</p>`);
        i++;
      }
    });
  });
});
