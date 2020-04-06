"use strict";

// Intro section remove selected status of navigation
function saveFn(data, userData) {
  var json = jQuery.toJSON(data);
  $('#saveOutput').text(JSON.stringify(data, null, 2));
}
/*for flag*/

/* Edit function is called when team label is clicked */


function edit_fn(container, data, place, time, doneCb) {
  var input = $('<input type="text">');
  input.val(data ? data.flag + ':' + data.name : '');
  container.html(input);
  input.focus();
  input.blur(function () {
    var inputValue = input.val();

    if (inputValue.length === 0) {
      doneCb(null); // Drop the team and replace with BYE
    } else {
      var flagAndName = inputValue.split(':'); // Expects correct input

      doneCb({
        flag: flagAndName[0],
        name: flagAndName[1]
      });
    }
  });
}

function render_fn(container, data, score, state) {
  switch (state) {
    case "empty-bye":
      container.append("No team");
      return;

    case "empty-tbd":
      container.append("Upcoming");
      return;

    case "entry-no-score":
    case "entry-default-win":
    case "entry-complete":
      container.append('<img src="dist/img/flags/' + data.flag + '.png" /> ').append(data.name).append();
      return;
  }
}

$(function () {
  $.getJSON("data-32.json", function (data) {
    window.br = $('div#playoff .demo').bracket({
      dir: 'lr',
      teamWidth: 264,
      scoreWidth: 20,
      matchMargin: 45,
      roundMargin: 32,
      centerConnectors: true,
      init: data,
      // save: function () {
      // }, /* without save() labels are disabled */
      decorator: {
        edit: edit_fn,
        render: render_fn
      }
    });
    var r, m, matches;
    var rounds = $('.round');
    console.log('matches', matches);

    for (r = 0; r < rounds.length; r++) {
      matches = rounds.eq(r).find('.match');
      console.log('matches', matches);

      if (data.results[r]) {
        for (m = 0; m < matches.length; m++) {
          matches.eq(m).find('.teamContainer').prepend('<div class="match-label"><div class="match-location">' + data.results[r][m][2] + '</div><div class="match-date">' + data.results[r][m][3] + '</div><div class="match-id">' + data.results[r][m][4] + '</div></div>');
        }
      }
    } // add class for specific rounds number print


    if ($('.round').length === 7) {
      $("body").addClass("seven-rounds");
    }

    if ($('.round').length === 6) {
      $("body").addClass("six-rounds");
    }

    if ($('.round').length === 5) {
      $("body").addClass("five-rounds");
    }

    if ($('.round').length === 4) {
      $("body").addClass("four-rounds");
    }

    if ($('.round').length === 3) {
      $("body").addClass("three-rounds");
    }
  });
});