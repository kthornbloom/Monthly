#Monthly.js
A jQuery based responsive calendar plugin.
<a href="http://kthornbloom.com/monthly" target="_blank">View Demo</a>

##Features

- Use as a date picker, or a full fledged calendar
- Fully responsive design
- Intuitive event labels
- Event list detail mode
- Handles multiple instances on the same page
- Well commented code for easy customization

##Usage
- Simply add a div with a class of "monthly" and a unique id.

```
<div class="monthly" id="mycalendar"></div>
```

- Include CSS in the header or via whatever preprocessor magic you use these days.

```
<link rel="stylesheet" href="css/monthly.css">
```

- Add the Javascript after calling jQuery

```
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/monthly.js"></script>
	<script type="text/javascript">
		$(window).load( function() {
		$('#mycalendar').monthly();
		 });
	</script>
```

##Events

###Event XML
- Events should be managed in an XML file. It should be structured like this, although additional fields are OK to add:

```
<?xml version="1.0"?>
<monthly>

	<event>
		<id>1</id>
		<name>Event Name 1</name>
		<startdate>2015-12-28</startdate>
		<enddate>2016-1-1</enddate> <!-- optional -->
		<starttime>9:00</starttime> <!-- optional -->
		<endtime>10:00</endtime> <!-- optional -->
		<color>#ffb128</color> <!-- optional -->
		<url>http://www.yourlink.com</url> <!-- optional -->
	</event>

</monthly>
```

- The 'id' fields don't neccessarily need to be in any particular order, but make sure they are unique to each event.
- Dates must be in the YYYY-MM-D format in your XML.
- If it is a single day event, leave the 'enddate' field blank
- The 'color' field allows you to set a custom color for that event's indicator.
- The 'url' field will be the location of the link on the event

###Event JS
You will need to set options to let Monthly know that it's an event calendar, and where the events are.

```
$('#mycalendar').monthly({
	mode: 'event',
	xmlUrl: 'events.xml'
});
```

##Date Picker
To function as a date picker, simply set options to tell Monthly how you'd like it to work:

```
$('#mycalendar2').monthly({
	mode: 'picker',
	// The element that will have its value set to the date you picked
	target: '#mytarget',
	// Set to true if you want monthly to appear on click
	startHidden: true,
	// Element that you click to make it appear
	showTrigger: '#mytarget',
	// Add a style to days in the past
	stylePast: true,
	// Disable clicking days in the past
	disablePast: true
});
```

##All Options:
<table class="rwd-table">
	<tbody><tr>
		<td><b>Name</b></td>
		<td><b>Description</b></td>
		<td><b>Options</b></td>
		<td><b>Default</b></td>
	</tr>
	<tr>
		<td>weekStart</td>
		<td>What day should weeks start on?</td>
		<td>'Sun' or 'Mon'</td>
		<td>'Sun'</td>
	</tr>
	<tr>
		<td>mode</td>
		<td>Events mode or normal?</td>
		<td>'event' or 'picker'</td>
		<td>''</td>
	</tr>
	<tr>
		<td>xmlUrl</td>
		<td>Path to events XML file</td>
		<td>'path/to/events.xml'</td>
		<td>''</td>
	</tr>
	<tr>
		<td>target</td>
		<td>Element that will have its value set to selected date</td>
		<td>'#example'</td>
		<td>''</td>
	</tr>
	<tr>
		<td>eventList</td>
		<td>Show listing of events under calendar?</td>
		<td>true or false</td>
		<td>true</td>
	</tr>
	<tr>
		<td>maxWidth</td>
		<td>Sets a maximum width on the calendar</td>
		<td>EX: '300px' or false</td>
		<td>false</td>
	</tr>
	<tr>
		<td>startHidden</td>
		<td>Hides calender until trigger is clicked.</td>
		<td>true or false</td>
		<td>false</td>
	</tr>
	<tr>
		<td>showTrigger</td>
		<td>Element that when clicked, shows calendar</td>
		<td>'#example'</td>
		<td>''</td>
	</tr>
	<tr>
		<td>stylePast</td>
		<td>Add style to days in the past</td>
		<td>true or false</td>
		<td>false</td>
	</tr>
	<tr>
		<td>disablePast</td>
		<td>Prevent clicking on past days (Date Picker mode only)</td>
		<td>true or false</td>
		<td>false</td>
	</tr>
</tbody></table>

##Licensing
Free to use and modify personally or commercially. Not for resale.

##Help & Feedback
Submit issues or feature requests here on Github. Connect with me on <a href="https://twitter.com/kthornbloom" target="_blank">twitter for quick questions.</a>

##FAQs
<b>Browser Support?</b>
- Essentially, all browsers except IE10 and down due to flexbox. 

<b>Events aren't working!</b>
- They won't work in a local environment, or if the XML is at another domain.
- Make sure the path to your XML is set correctly

<b>I want the dates formatted differently</b>
- There's currently not an option for this. It's farily easy to modify the plugin though. Check out lines 154, 157, and 271.

<b>I need to drag & drop events, show the calendar in Klingon, and launch a rocket into orbit every time you pick a date!!</b>
- First of all... you sound like you need to chill out. Secondly, this calendar isn't meant to do everything under the sun, but rather be a simple solution to most calendar related problems. Maybe check out <a href="http://fullcalendar.io/">Fullcalendar</a>

##Changelog

v 2.0.4 - Added more vendor prefixes to support older versions of iOS

v 2.0.3 - Fixed a big caused by using Monday as the start of the week, and months where the first day is Sunday.

v 2.0.2 - Fixed a bug caused by using zero indexed days or months in the xml file. Fixed another bug where setting eventList to false didn't work.

v 2.0.1 - Fixed a ton o' bugs in IE & Safari related to incorrect setting of the first day, day heights, and the event listing day names.

v 2.0.0 - New method for viewing event details within the calendar rather than a separate list. Added ability to have event times.

v 1.0.1 - Fixed a bug that produced the wrong number of days in the month. (Thanks <a href="https://github.com/igor1980">igor1980</a>)

v 1.0.0 - Launched
