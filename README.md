#Monthly.js
A jQuery based responsive calendar plugin by <a href="https://twitter.com/kthornbloom" target="_blank">@kthornbloom</a>

<a href="http://kthornbloom.com/monthly" target="_blank">Live Demo</a>

##Features

- Use as a date picker, or a full fledged calendar
- Fully responsive design
- Intuitive event labels
- Event list detail mode
- Handles multiple instances on the same page
- Well commented code for easy customization

##Setup & Config
View the <a href="https://github.com/kthornbloom/Monthly/wiki">wiki</a>.

##Bugs
If you've spotted an issue, please create an <a href="https://github.com/kthornbloom/Monthly/issues">issue</a>.

##Support
Did this plugin help you out? Support open source development! <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=6GHHZGMCV5GNE">Donate Via Paypal</a>

##Changelog

🆕 v 2.2.0 - A good deal of edits (see details <a href="https://github.com/kthornbloom/Monthly/pull/41">here</a>) including localization, code cleanup & json events. <b>A big thank you to <a href="https://github.com/richardtallent">Richard Tallent</a> for this one!</b>

v 2.1.0 - Fixed a bug where the event list would animate <i>in</i> but not <i>out</i>. Merged a pull request to include json support. (Thanks marekstodolny!) Made buttons more visible in header for closing event list & reverting to the current month.

v 2.0.7 - Fixed a bug where divs were left behind when advancing through months. Merged a pull request fixing day name options.

v 2.0.6 - Fixed a bug where AM and PM would show up even if there's no time specified. Also fixed a bug where long event titles weren't being truncated. Added xml error handling.

v 2.0.5 - Dropped flexbox 😞 in favor of display:table-cell to support 💩💩IE9💩💩

v 2.0.4 - Added more vendor prefixes to support older versions of iOS

v 2.0.3 - Fixed a big caused by using Monday as the start of the week, and months where the first day is Sunday.

v 2.0.2 - Fixed a bug caused by using zero indexed days or months in the xml file. Fixed another bug where setting eventList to false didn't work.

v 2.0.1 - Fixed a ton o' bugs in IE & Safari related to incorrect setting of the first day, day heights, and the event listing day names.

v 2.0.0 - New method for viewing event details within the calendar rather than a separate list. Added ability to have event times.

v 1.0.1 - Fixed a bug that produced the wrong number of days in the month. (Thanks <a href="https://github.com/igor1980">igor1980</a>)

v 1.0.0 - Launched
