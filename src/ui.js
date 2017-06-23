var $ = require("jquery");

var ui = module.exports = {};

ui.init = function() {
  console.log(true);
  $("#button-pause").click(pauseToggle)
  $("#button-no").click(pauseToggle)
  $("#button-sound").click(function() {
    if ($("#sound-icon").attr('src') === "assets/buttons/sound_on.png")  {
      $("#sound-icon").attr('src', "assets/buttons/sound_off.png")
    } else {
      $("#sound-icon").attr('src', "assets/buttons/sound_on.png")
    }
  })
}

function pauseToggle() {
  console.log(true);
  $(".active").toggle();
  $(".pause").toggle();
}
