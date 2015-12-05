/*
Smoothslides 2.2.0 by Kevin Thornbloom is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.
*/

(function($) {
	$.fn.extend({
		monthly: function(options) {
			// These are overridden by options declared in footer
			var defaults = {
				weekStart: 'Sun',
				mode: '',
				xmlUrl: '',
				target: '',
				eventList: true,
				maxWidth: false,
				startHidden: false,
				showTrigger: ''
			}

			var options = $.extend(defaults, options),
				that = this,
				uniqueId = $(this).attr('id'),
				d = new Date(),
				currentMonth = d.getMonth() + 1,
				currentYear = d.getFullYear(),
				currentDay = d.getDate(),
				monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		if (options.maxWidth != false){
			$('#'+uniqueId).css('maxWidth',options.maxWidth);
		}

		if (options.startHidden == true){
			$('#'+uniqueId).addClass('monthly-pop').css({
				'position' : 'absolute',
				'display' : 'none'
			});
			$(document).on('focus', ''+options.showTrigger+'', function (e) {
				$('#'+uniqueId).show();
				e.preventDefault();
			});
			$(document).on('click', ''+options.showTrigger+', .monthly-pop', function (e) {
				e.stopPropagation();
				e.preventDefault();
			});
			$(document).on('click', function (e) {
				$('#'+uniqueId).hide();
			});
		}

		// Add Day Of Week Titles
		if (options.weekStart == 'Sun') {
			$('#' + uniqueId).append('<div class="monthly-day-title-wrap"><div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div></div><div class="monthly-day-wrap"></div>');
		} else if (options.weekStart == 'Mon') {
			$('#' + uniqueId).append('<div class="monthly-day-title-wrap"><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div></div><div class="monthly-day-wrap"></div>');
		} else {
			console.log('Incorrect entry for weekStart variable.')
		}

		$('#' + uniqueId).prepend('<div class="monthly-header"><div class="monthly-header-title"></div><a href="#" class="monthly-prev"></a><a href="#" class="monthly-next"></a></div>').append('<div class="monthly-event-list"></div>');

		function daysInMonth(m, y){
			return m===2?y&3||!(y%25)&&y&15?28:29:30+(m+(m>>3)&1);
		}

		function setMonthly(m, y){
			$('#' + uniqueId).data('setMonth', m).data('setYear', y);

			// Get number of days
			var dayQty = daysInMonth(currentMonth, currentYear),
				// Get day of the week the first day is
				firstDay = new Date(m + ' 1, ' + y).getDay();
				

			// Remove old days
			$('#' + uniqueId + ' .monthly-day, #' + uniqueId + ' .monthly-day-blank').remove();
			// Print out the days
			if (options.mode == 'event') {
				for(var i = 0; i < dayQty; i++) {
					// Fix 0 indexed days
					var day = i + 1;
					$('#' + uniqueId + ' .monthly-day-wrap').append('<div class="monthly-day" data-number="'+day+'"><div class="monthly-day-number">'+day+'</div><div class="monthly-indicator-wrap"></div></div>');
				}
			} else {
				for(var i = 0; i < dayQty; i++) {
					// Fix 0 indexed days
					var day = i + 1;
					$('#' + uniqueId + ' .monthly-day-wrap').append('<a href="#" class="monthly-day" data-number="'+day+'"><div class="monthly-day-number">'+day+'</div><div class="monthly-indicator-wrap"></div></a>');
				}
			}

			// Set Today
			var setMonth = $('#' + uniqueId).data('setMonth'),
				setYear = $('#' + uniqueId).data('setYear');
			if (setMonth == currentMonth && setYear == currentYear) {
				$('#' + uniqueId + ' *[data-number="'+currentDay+'"]').addClass('monthly-today');
			}

			// Reset button
			if (setMonth == currentMonth && setYear == currentYear) {
				$('#' + uniqueId + ' .monthly-header-title').html(monthNames[m - 1] +' '+ y);
			} else {
				$('#' + uniqueId + ' .monthly-header-title').html(monthNames[m - 1] +' '+ y +'<a href="#" class="monthly-reset"></a> ');
			}
			

			// Account for empty days at start
			if(options.weekStart == 'Sun' && firstDay != 7) {
				for(var i = 0; i < firstDay; i++) {
					$('#' + uniqueId + ' .monthly-day-wrap').prepend('<div class="monthly-day-blank"><div class="monthly-day-number"></div></div>');
				}
			} else if (options.weekStart == 'Mon' && firstDay != 1) {
				for(var i = 0; i < (firstDay - 1); i++) {
					$('#' + uniqueId + ' .monthly-day-wrap').prepend('<div class="monthly-day-blank" ><div class="monthly-day-number"></div></div>');
				}
			}

			//Account for empty days at end
			var numdays = $('#' + uniqueId + ' .monthly-day').length,
				numempty = $('#' + uniqueId + ' .monthly-day-blank').length,
				totaldays = numdays + numempty,
				roundup = Math.ceil(totaldays/7) * 7,
				daysdiff = roundup - totaldays;
			if(totaldays % 7 != 0) {
				for(var i = 0; i < daysdiff; i++) {
					$('#' + uniqueId + ' .monthly-day-wrap').append('<div class="monthly-day-blank"><div class="monthly-day-number"></div></div>');
				}
			}

			// Events
			if (options.mode == 'event') {
				// Remove previous events
				$('#'+uniqueId+' .monthly-event-list').empty();
				// Add Events
				$.get(''+options.xmlUrl+'', function(d){
					$(d).find('event').each(function(){
						// Year [0]   Month [1]   Day [2]
						var fullstartDate = $(this).find('startdate').text(),
							startArr = fullstartDate.split("-"),
							fullendDate = $(this).find('enddate').text(),
							endArr = fullendDate.split("-"),
							eventURL = $(this).find('url').text(),
							eventTitle = $(this).find('name').text(),
							eventColor = $(this).find('color').text(),
							eventId = $(this).find('id').text(),
							eventLink = '';
						if (eventURL){
							var eventLink = 'href="'+eventURL+'"';
						}
						

						function updateList(){
							if (fullendDate && options.eventList == true) {
								$('#' + uniqueId + ' .monthly-event-list').append('<a '+eventLink+'  data-eventid="'+ eventId +'"><div class="monthly-list-date">'+monthNames[startArr[1] - 1]+' '+startArr[2]+' '+startArr[0]+' - '+monthNames[endArr[1] - 1]+' '+endArr[2]+' '+endArr[0]+'</div><div class="monthly-event-indicator" style="background:'+eventColor+'"></div> '+eventTitle+'</a>');
							
							} else if(options.eventList == true) {
								$('#' + uniqueId + ' .monthly-event-list').append('<a '+eventLink+'  data-eventid="'+ eventId +'"><div class="monthly-list-date">'+monthNames[startArr[1] - 1]+' '+startArr[2]+' '+startArr[0]+'</div><div class="monthly-event-indicator" style="background:'+eventColor+'"></div> '+eventTitle+'</a>');
							}
						}

						// If event is one day & within month
						if (!fullendDate && startArr[1] == setMonth && startArr[0] == setYear) {
							// Add Indicators
							$('#'+uniqueId+' *[data-number="'+startArr[2]+'"] .monthly-indicator-wrap').append('<a '+eventLink+' class="monthly-event-indicator"  data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</a>');
							updateList();
						// If event is multi day & within month
						} else if (startArr[1] == setMonth && startArr[0] == setYear && endArr[1] == setMonth && endArr[0] == setYear){
							for(var i = parseInt(startArr[2]); i <= parseInt(endArr[2]); i++) {
								if (i == parseInt(startArr[2])) {
									$('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<a '+eventLink+' class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</a>');
								} else {
									$('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<a '+eventLink+' class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'"></a>');
								}								
							}
							updateList();
						// If event is multi day, starts in prev month, and ends in current month
						} else if ((endArr[1] == setMonth && endArr[0] == setYear) && ((startArr[1] < setMonth && startArr[0] == setYear) || (startArr[0] < setYear))) {
							for(var i = 0; i <= parseInt(endArr[2]); i++) {
								if (i==1){
									$('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<a '+eventLink+' class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</a>');
								} else {
									$('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<a '+eventLink+' class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'"></a>');
								}
							}
							updateList();
						// If event is multi day, starts in this month, but ends in next
						} else if ((startArr[1] == setMonth && startArr[0] == setYear) && ((endArr[1] > setMonth && endArr[0] == setYear) || (endArr[0] > setYear))){
							for(var i = parseInt(startArr[2]); i <= dayQty; i++) {
								if (i == parseInt(startArr[2])) {
									$('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<a '+eventLink+' class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</a>');
								} else {
									$('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<a '+eventLink+' class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'"></a>');
								}
							}
							updateList();
						// If event is multi day, starts in a prev month, ends in a future month
						} else if (((startArr[1] < setMonth && startArr[0] == setYear) || (startArr[0] < setYear)) && ((endArr[1] > setMonth && endArr[0] == setYear) || (endArr[0] > setYear))){
							for(var i = 0; i <= dayQty; i++) {
								if (i == 1){
									$('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<a '+eventLink+' class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</a>');
								} else {
									$('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<a '+eventLink+' class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'"></a>');
								}								
							}
							updateList();
						}
					});
				});
			}
			
		}

		// Set the calendar the first time
		setMonthly(currentMonth, currentYear);

		// Advance months
		$(document.body).on('click', '#'+uniqueId+' .monthly-next', function (e) {
			var setMonth = $('#' + uniqueId).data('setMonth'),
				setYear = $('#' + uniqueId).data('setYear');
			if (setMonth == 12) {
				var newMonth = 1,
					newYear = setYear + 1;
				setMonthly(newMonth, newYear);
			} else {
				var newMonth = setMonth + 1,
					newYear = setYear;
				setMonthly(newMonth, newYear);
			}
			e.preventDefault();
		});

		// Go back in months
		$(document.body).on('click', '#'+uniqueId+' .monthly-prev', function (e) {
			var setMonth = $('#' + uniqueId).data('setMonth'),
				setYear = $('#' + uniqueId).data('setYear');
			if (setMonth == 1) {
				var newMonth = 12,
					newYear = setYear - 1;
				setMonthly(newMonth, newYear);
			} else {
				var newMonth = setMonth - 1,
					newYear = setYear;
				setMonthly(newMonth, newYear);
			}
			e.preventDefault();
		});

		// Reset Month
		$(document.body).on('click', '#'+uniqueId+' .monthly-reset', function (e) {
			setMonthly(currentMonth, currentYear);
			e.preventDefault();
			e.stopPropagation();
		});

		// Hover an event within the list & highlight the days it occurs on
		$(document.body).on('mouseover', '#'+uniqueId+' .monthly-event-list a', function (e) {
			var whichEvent = $(this).data('eventid');
			$('#'+uniqueId+' .monthly-day').css('opacity','.5');
			$('#'+uniqueId+' .monthly-day .monthly-event-indicator').css('opacity','.25');
			$('#'+uniqueId+' .monthly-day .monthly-event-indicator[data-eventid="'+whichEvent+'"]').css('opacity','1').parents('.monthly-day').css('opacity','1');
		});
		$(document.body).on('mouseout', '#'+uniqueId+' .monthly-event-list a', function (e) {
			$('#'+uniqueId+' .monthly-day, #'+uniqueId+' .monthly-day .monthly-event-indicator').css('opacity','1');
		});

		// Click to select date
		$(document.body).on('click', '#'+uniqueId+' a.monthly-day', function (e) {
			var whichDay = $(this).data('number'),
				setMonth = $('#' + uniqueId).data('setMonth'),
				setYear = $('#' + uniqueId).data('setYear');
			$(''+options.target+'').val(setMonth+'/'+whichDay+'/'+setYear);
			if(options.startHidden == true) {
				$('#'+uniqueId).hide();
			}
			e.preventDefault();
		});
		}
	});
})(jQuery);