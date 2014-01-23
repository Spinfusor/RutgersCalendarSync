javascript: (function () {
  var script = document.createElement("SCRIPT");
  script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
  script.type = 'text/javascript';
  document.getElementsByTagName("head")[0].appendChild(script);
  var checkReady = function (callback) {
    if (window.jQuery) {
      callback(jQuery);
    } else {
      window.setTimeout(function () {
        checkReady(callback);
      }, 100);
    }
  };f
  checkReady(function ($) {
    $(function () {
      var courses = $('div.ca,div.cd,div.b,div.nk,div.l,div.cm,div.u');

      function bake(start, end, day, name, cherry, semester) {
        var cheesecake = "\nBEGIN:VEVENT\nUID:" + cherry.toString() + "\nDTSTAMP:20130331T044700Z\nORGANIZER;CN=Rutgers:MAILTO:webreg@rutgers.edu";
        var date = "";
        var endDate = "";
        if (semester === null || semester === 2) {
          if (day == "TU") {
            date = "20140527T";
            endDate = "20140812T";
          } else if (day == "WE") {
            date = "20140528T";
            endDate = "20140813T";
          } else if (day == "TH") {
            date = "20140529T";
            endDate = "20140807T";
          } else if (day == "FR") {
            date = "20140530T";
            endDate = "20140808T";
          } else if (day == "MO") {
            date = "20140602T";
            endDate = "20140811T";
          }
        } else if (semester === 1) {
          if (day == "TU") {
            date = "20140121T";
            endDate = "20140429T";
          } else if (day == "WE") {
            date = "20140122T";
            endDate = "20140430T";
          } else if (day == "TH") {
            date = "20140123T";
            endDate = "20140501T";
          } else if (day == "FR") {
            date = "20140124T";
            endDate = "20140502T";
          } else if (day == "MO") {
            date = "20140127T";
            endDate = "20140505T";
          }
        } else {
          if (day == "TU") {
            date = "20140902T";
            endDate = "20141209T";
          } else if (day == "WE") {
            date = "20140903T";
            endDate = "20141210T";
          } else if (day == "TH") {
            date = "20140904T";
            endDate = "20141204T";
          } else if (day == "FR") {
            date = "20140905T";
            endDate = "20141205T";
          } else if (day == "MO") {
            date = "20140908T";
            endDate = "20141208T";
          }
        }
        start = "DTSTART:".concat(date.concat(start));
        end = "DTEND:".concat(date.concat(end));
        cheesecake = cheesecake.concat("\n" + start + "\n" + end + "\n" + "SUMMARY:" + name + "\nRRULE:FREQ=WEEKLY;UNTIL=" + endDate + "010101Z;BYDAY=" + day + "\nEND:VEVENT");
        return cheesecake;
      }
      $('tr td').each(function (index, item) {
        if ($(item).children().length > 0) $($($(item).children()[0]).children()[0]).attr('day', index % 5);
      });
      var output = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//hacksw/handcal//NONSGML v1.0//EN";
      var number = Math.floor((Math.random() * 100) + 1);
      var choice = $('h2').text().split("»")[1].split(" ")[1];
      if (choice === "Summer") {
        choice = 2;
      } else if (choice === "Spring") {
        choice = 1;
      } else {
        choice = 3;
      }
      courses.each(function (index, course) {
        var class_day = $(course).attr('day');
        if (class_day === '0') {
          class_day = "MO";
        } else if (class_day === '1') {
          class_day = "TU";
        } else if (class_day === '2') {
          class_day = "WE";
        } else if (class_day === '3') {
          class_day = "TH";
        } else if (class_day === '4') {
          class_day = "FR";
        }
        var class_time = $(course).find("span.time").html();
        var start = class_time.split(" - ")[0];
        start = time_converter(start);
        var end = class_time.split(" - ")[1];
        var class_name = $(course).find("b").html();
        end = time_converter(end);
        console.log(end);
        var pumpkin = bake(start, end, class_day, class_name, number, choice);
        number++;
        output += pumpkin;
        console.log("Pumpkin: " + pumpkin);
      });
      output += "\nEND:VCALENDAR";
      console.log(output);
      var $popup = $('<div></div>');
      $popup.css({
        height: '50%',
        position: 'absolute',
        top: '30%',
        left: '25%',
        width: '50%',
        'z-index': 9998,
      });
      $popup.html("<div>Copy this text into a plaintext document, and save it with an .ical extension.</div>");
      var $textarea = $('<textarea></textarea>');
      $textarea.css({
        height: '90%',
        width: '90%',
        'z-index': 9999,
      });
      $popup.val("This is some text");
      $textarea.val(output);
      $textarea.appendTo($popup);
      $popup.appendTo('body');

      function time_converter(time) {
        var i = time.length - 2;
        var morning = true;
        var hours = 0;
        var minutes = 0;
        if (time.charAt(i) === 'P') {
          morning = false;
        }
        time = time.substring(0, time.length - 2);
        if (time.charAt(1) === ':') {
          hours = Number(time.charAt(0));
          time = time.substring(2, 4);
        } else {
          hours = Number(time.substring(0, 2));
          time = time.substring(3, 5);
        } if (morning) {
          if (hours === 12) {
            hours = 0;
          }
        } else {
          if (!(hours === 12)) {
            hours += 12;
          }
        }
        minutes = Number(time);
        if (hours < 10) {
          hours = "0".concat(hours.toString());
        } else {
          hours = hours.toString();
        } if (minutes < 10) {
          minutes = "0".concat(minutes.toString());
        } else {
          minutes = minutes.toString();
        }
        return hours.concat(minutes.concat("00"));
      }
    });
  });
})();