$(document).ready(function () {

    /***************** Waypoints ******************/

    $('.wp1').waypoint(function () {
        $('.wp1').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp2').waypoint(function () {
        $('.wp2').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp3').waypoint(function () {
        $('.wp3').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp4').waypoint(function () {
        $('.wp4').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp5').waypoint(function () {
        $('.wp5').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp6').waypoint(function () {
        $('.wp6').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp7').waypoint(function () {
        $('.wp7').addClass('animated fadeInUp');
    }, {
        offset: '75%'
    });
    $('.wp8').waypoint(function () {
        $('.wp8').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp9').waypoint(function () {
        $('.wp9').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });

    /***************** Initiate Flexslider ******************/
    $('.flexslider').flexslider({
        animation: "slide"
    });

    /***************** Initiate Fancybox ******************/

    $('.single_image').fancybox({
        padding: 4
    });

    $('.fancybox').fancybox({
        padding: 4,
        width: 1000,
        height: 800
    });

    /***************** Tooltips ******************/
    $('[data-toggle="tooltip"]').tooltip();

    /***************** Nav Transformicon ******************/

    /* When user clicks the Icon */
    $('.nav-toggle').click(function () {
        $(this).toggleClass('active');
        $('.header-nav').toggleClass('open');
        event.preventDefault();
    });
    /* When user clicks a link */
    $('.header-nav li a').click(function () {
        $('.nav-toggle').toggleClass('active');
        $('.header-nav').toggleClass('open');

    });

    /***************** Header BG Scroll ******************/

    $(function () {
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll >= 20) {
                $('section.navigation').addClass('fixed');
                $('header').css({
                    "border-bottom": "none",
                    "padding": "35px 0"
                });
                $('header .member-actions').css({
                    "top": "26px",
                });
                $('header .navicon').css({
                    "top": "34px",
                });
            } else {
                $('section.navigation').removeClass('fixed');
                $('header').css({
                    "border-bottom": "solid 1px rgba(255, 255, 255, 0.2)",
                    "padding": "50px 0"
                });
                $('header .member-actions').css({
                    "top": "41px",
                });
                $('header .navicon').css({
                    "top": "48px",
                });
            }
        });
    });
    /***************** Smooth Scrolling ******************/

    $(function () {

        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 90
                    }, 2000);
                    return false;
                }
            }
        });

    });

    /********************** Social Share buttons ***********************/
    var share_bar = document.getElementsByClassName('share-bar');
    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    po.src = 'https://apis.google.com/js/platform.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);

    for (var i = 0; i < share_bar.length; i++) {
        var html = '<iframe allowtransparency="true" frameborder="0" scrolling="no"' +
            'src="https://platform.twitter.com/widgets/tweet_button.html?url=' + encodeURIComponent(window.location) + '&amp;text=' + encodeURIComponent(document.title) + '&amp;via=ramswarooppatra&amp;hashtags=ramandantara&amp;count=horizontal"' +
            'style="width:105px; height:21px;">' +
            '</iframe>' +

            '<iframe src="//www.facebook.com/plugins/like.php?href=' + encodeURIComponent(window.location) + '&amp;width&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;share=true&amp;height=21&amp;appId=101094500229731&amp;width=150" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:150px; height:21px;" allowTransparency="true"></iframe>' +

            '<div class="g-plusone" data-size="medium"></div>';

        // '<iframe src="https://plusone.google.com/_/+1/fastbutton?bsv&amp;size=medium&amp;url=' + encodeURIComponent(window.location) + '" allowtransparency="true" frameborder="0" scrolling="no" title="+1" style="width:105px; height:21px;"></iframe>';

        share_bar[i].innerHTML = html;
        share_bar[i].style.display = 'inline-block';
    }

    /********************** Embed youtube video *********************/
    $('.player').YTPlayer();


    /********************** Toggle Map Content **********************/
    $('#btn-show-map').click(function () {
        $('#map-content').toggleClass('toggle-map-content');
        $('#btn-show-content').toggleClass('toggle-map-content');
    });
    $('#btn-show-content').click(function () {
        $('#map-content').toggleClass('toggle-map-content');
        $('#btn-show-content').toggleClass('toggle-map-content');
    });

    /********************** Add to Calendar **********************/
    var myCalendar = createCalendar({
        options: {
            class: '',
            // You can pass an ID. If you don't, one will be generated for you
            id: ''
        },
        data: {
            // Event title
            title: "Corey and Carina's Wedding",

            // Event start date
            start: new Date('Sept 11, 2027 3:00'),

            // Event duration (IN MINUTES)
            // duration: 120,

            // You can also choose to set an end time
            // If an end time is set, this will take precedence over duration
            end: new Date('Sept 12, 2027 12:00'),

            // Event Address
            address: '536 N. Quidnessett Rd, North Kingstown, RI 02852, USA',

            // Event Description
            description: "We can't wait to see you on our big day. For any queries or issues, please contact Corey @ (401)219-6319."
        }
    });

    $('#add-to-cal').html(myCalendar);


    /********************** RSVP **********************/
    // Keyed by MD5 of the invite code: 271117 (single invitee), 74774 (whole party)
    var RSVP_CODES = {
        'b0e53b10c1f55ede516b240036b88f40': {singleInvitee: true},
        'aa3f1b9374b921839be33e33cf44f4cd': {singleInvitee: false}
    };
    var RSVP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyOU2I9ITql0ewtYT554ExhtlmSDzFuUxyAAse2PfV-I0SROyduec-924l1YPgGnd99Cw/exec';
    var MAX_SUGGESTIONS = 8;

    var rsvpState = {code: null, config: null, selection: null, attendance: [], submitting: false, session: 0};
    var guestIndex = null;
    var guestIndexRequest = null;
    var suggestions = [];
    var activeSuggestion = -1;

    /* ---- Guest list loading ---- */
    function loadGuestIndex() {
        if (!guestIndexRequest) {
            var deferred = $.Deferred();
            $.ajax({url: 'data/output.json', dataType: 'json'})
                .done(function (rows) {
                    try {
                        deferred.resolve(buildGuestIndex(rows));
                    } catch (err) {
                        deferred.reject();
                    }
                })
                .fail(function () {
                    deferred.reject();
                });
            // Allow a later retry if loading failed
            deferred.fail(function () {
                guestIndexRequest = null;
            });
            guestIndexRequest = deferred;
        }
        return guestIndexRequest.promise();
    }

    /* ---- Predictive guest search ---- */
    var searchInput = $('#guest_search');
    var suggestionList = $('#guest-suggestions');

    function setSearchMessage(text, isError) {
        $('#guest-search-message').text(text).toggleClass('text-danger', !!isError);
    }

    function closeSuggestions() {
        suggestions = [];
        activeSuggestion = -1;
        suggestionList.addClass('hidden').empty();
        searchInput.attr('aria-expanded', 'false').removeAttr('aria-activedescendant');
    }

    function highlightSuggestion(index) {
        var items = suggestionList.children('[role=option]');
        items.removeClass('active').attr('aria-selected', 'false');
        activeSuggestion = index;
        if (index < 0) {
            searchInput.removeAttr('aria-activedescendant');
            return;
        }
        var item = items.eq(index).addClass('active').attr('aria-selected', 'true');
        searchInput.attr('aria-activedescendant', item.attr('id'));

        var list = suggestionList[0], el = item[0];
        if (el.offsetTop < list.scrollTop) {
            list.scrollTop = el.offsetTop;
        } else if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight) {
            list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight;
        }
    }

    function updateSuggestions() {
        var query = searchInput.val();
        closeSuggestions();
        if (!guestIndex || !$.trim(query)) {
            setSearchMessage('');
            return;
        }
        suggestions = searchGuests(guestIndex, query, MAX_SUGGESTIONS);
        if (!suggestions.length) {
            setSearchMessage('No guests found. Check the spelling or try just your first name.', true);
            return;
        }
        $.each(suggestions, function (i, option) {
            $('<li role="option" aria-selected="false"></li>')
                .attr('id', 'guest-option-' + i)
                .text(option.label)
                .appendTo(suggestionList);
        });
        suggestionList.removeClass('hidden');
        searchInput.attr('aria-expanded', 'true');
        setSearchMessage(suggestions.length + (suggestions.length === 1 ? ' match' : ' matches') +
            ' found. Choose your name from the list.');
    }

    function selectGuest(option) {
        var party = guestIndex.parties[option.partyId];
        var members = rsvpState.config.singleInvitee
            ? [{name: option.name}]
            : party.members.map(function (name) {
                return {name: name};
            });

        rsvpState.selection = {partyId: option.partyId, members: members};
        rsvpState.attendance = members.map(function () {
            return null;
        });
        searchInput.val(option.name);
        closeSuggestions();
        setSearchMessage('Selected: ' + option.label + '.');
        $('#alert-wrapper').html('');
        renderParty();
    }

    function clearSelection() {
        rsvpState.selection = null;
        rsvpState.attendance = [];
        $('#party-members').empty();
        $('#party-section').addClass('hidden');
    }

    searchInput.on('input', function () {
        if (rsvpState.selection) {
            clearSelection();
        }
        updateSuggestions();
    });

    searchInput.on('keydown', function (e) {
        var open = suggestions.length > 0;
        switch (e.which) {
            case 40: // ArrowDown
                e.preventDefault();
                if (!open && !rsvpState.selection) {
                    updateSuggestions();
                }
                if (suggestions.length) {
                    highlightSuggestion((activeSuggestion + 1) % suggestions.length);
                }
                break;
            case 38: // ArrowUp
                if (open) {
                    e.preventDefault();
                    highlightSuggestion(activeSuggestion <= 0 ? suggestions.length - 1 : activeSuggestion - 1);
                }
                break;
            case 13: // Enter
                if (open) {
                    e.preventDefault();
                    if (activeSuggestion >= 0) {
                        selectGuest(suggestions[activeSuggestion]);
                    }
                }
                break;
            case 27: // Escape
                if (open) {
                    e.preventDefault();
                    closeSuggestions();
                }
                break;
        }
    });

    searchInput.on('blur', closeSuggestions);

    // mousedown would blur the input before the click registers
    suggestionList.on('mousedown', function (e) {
        e.preventDefault();
    });
    suggestionList.on('click', '[role=option]', function () {
        var option = suggestions[$(this).index()];
        if (option) {
            selectGuest(option);
        }
    });

    /* ---- Party attendance ---- */
    function renderParty() {
        var container = $('#party-members').empty();
        $.each(rsvpState.selection.members, function (i, member) {
            var nameId = 'party-member-' + i;
            var row = $('<div class="party-member" role="radiogroup"></div>').attr('aria-labelledby', nameId);
            $('<span class="party-member-name"></span>').attr('id', nameId).text(member.name).appendTo(row);
            var choices = $('<span class="party-member-choices"></span>').appendTo(row);
            $.each([[true, 'Will attend'], [false, 'Will not attend']], function (j, choice) {
                var label = $('<label class="attendance-option"></label>');
                $('<input type="radio">')
                    .attr({name: 'attendance-' + i, value: choice[0] ? 'yes' : 'no'})
                    .data({member: i, attending: choice[0]})
                    .appendTo(label);
                label.append(document.createTextNode(' ' + choice[1]));
                choices.append(label);
            });
            container.append(row);
        });
        $('#party-section').removeClass('hidden');
    }

    $('#party-members').on('change', 'input[type=radio]', function () {
        rsvpState.attendance[$(this).data('member')] = $(this).data('attending');
        $(this).closest('.party-member').removeClass('attendance-missing').removeAttr('aria-invalid');
    });

    /* ---- Flow control ---- */
    function setSubmitting(on) {
        rsvpState.submitting = on;
        $('#rsvp-fieldset').prop('disabled', on);
        $('#rsvp-form').attr('aria-busy', on ? 'true' : 'false');
        $('#rsvp-submit').text(on ? 'Sending...' : 'Send RSVP');
    }

    function resetRsvpState() {
        rsvpState.session++;
        rsvpState.code = null;
        rsvpState.config = null;
        setSubmitting(false);
        clearSelection();
        closeSuggestions();
        $('#rsvp-form')[0].reset();
        searchInput.prop('disabled', true);
        setSearchMessage('');
        $('#alert-wrapper').html('');
    }

    function showCodeStage() {
        resetRsvpState();
        $('#rsvp-form').addClass('hidden');
        $('#rsvp-code-alert').html('');
        $('#invite_code').val('').removeAttr('aria-invalid');
        $('#rsvp-code-form').removeClass('hidden');
    }

    $('#rsvp-code-form').on('submit', function (e) {
        e.preventDefault();
        var code = $.trim($('#invite_code').val());
        var hash = MD5(code);
        var config = RSVP_CODES.hasOwnProperty(hash) ? RSVP_CODES[hash] : null;

        if (!config) {
            $('#rsvp-code-alert').html(alert_markup('danger', '<strong>Sorry!</strong> Your invite code is incorrect.'));
            $('#invite_code').attr('aria-invalid', 'true').focus();
            return;
        }

        resetRsvpState();
        rsvpState.code = code;
        rsvpState.config = config;
        var session = rsvpState.session;

        $('#party-heading').text(config.singleInvitee ? 'Will you be joining us?' : 'Let us know who will be joining us');
        $('#rsvp-code-alert').html('');
        $('#invite_code').removeAttr('aria-invalid');
        $('#rsvp-code-form').addClass('hidden');
        $('#rsvp-form').removeClass('hidden');
        setSearchMessage('Loading the guest list...');

        loadGuestIndex()
            .done(function (index) {
                if (session !== rsvpState.session) {
                    return;
                }
                guestIndex = index;
                setSearchMessage('');
                searchInput.prop('disabled', false).focus();
            })
            .fail(function () {
                if (session !== rsvpState.session) {
                    return;
                }
                setSearchMessage('Sorry, we couldn\'t load the guest list. Please refresh the page and try again.', true);
            });
    });

    $('#rsvp-change-code').on('click', function () {
        showCodeStage();
        $('#invite_code').focus();
    });

    /* ---- Submission ---- */
    function guestSelectionError() {
        if (!guestIndex) {
            return 'The guest list hasn\'t loaded yet. Please refresh the page and try again.';
        }
        var query = $.trim(searchInput.val());
        if (!query) {
            return 'Please search for your name and choose it from the list.';
        }
        var key = query.toLowerCase();
        var exact = $.grep(guestIndex.options, function (option) {
            return option.key === key;
        });
        if (exact.length > 1) {
            return 'More than one guest is named "' + escape_html(query) + '". Please choose the right one from the suggestions.';
        }
        if (!searchGuests(guestIndex, query, 1).length) {
            return 'No guests found matching "' + escape_html(query) + '".';
        }
        return 'Please choose your name from the suggestions.';
    }

    $('#rsvp-form').on('submit', function (e) {
        e.preventDefault();
        if (rsvpState.submitting) {
            return;
        }
        if (!rsvpState.config) {
            showCodeStage();
            return;
        }

        var selection = rsvpState.selection;
        if (!selection) {
            $('#alert-wrapper').html(alert_markup('danger', guestSelectionError()));
            searchInput.focus();
            return;
        }

        var rows = $('#party-members .party-member');
        var missing = [];
        $.each(selection.members, function (i, member) {
            var unanswered = rsvpState.attendance[i] !== true && rsvpState.attendance[i] !== false;
            rows.eq(i).toggleClass('attendance-missing', unanswered).attr('aria-invalid', unanswered ? 'true' : null);
            if (unanswered) {
                missing.push(escape_html(member.name));
            }
        });
        if (missing.length) {
            $('#alert-wrapper').html(alert_markup('danger', 'Please choose <strong>Will attend</strong> or <strong>Will not attend</strong> for: ' + missing.join(', ') + '.'));
            rows.filter('.attendance-missing').first().find('input').first().focus();
            return;
        }

        var partyNames = selection.members.map(function (member) {
            return member.name;
        });
        var responses = rsvpState.attendance.map(function (attending) {
            return attending ? 'YES' : 'NO';
        });

        var payload = {
            email: $.trim($('#rsvp_email').val()),
            party_names: partyNames.join('\n'),
            rsvp: responses.join('\n'),
            invite_code: rsvpState.code,
            party_id: selection.partyId
        };
        var session = rsvpState.session;

        setSubmitting(true);
        $('#alert-wrapper').html(alert_markup('info', '<strong>Just a sec!</strong> We are saving your details.'));

        $.post(RSVP_ENDPOINT, payload)
            .done(function (response) {
                if (session !== rsvpState.session) {
                    return;
                }
                setSubmitting(false);
                if (!response || response.result !== 'success') {
                    var message = response && response.message ? escape_html(response.message) : '<strong>Sorry!</strong> There is some issue with the server.';
                    $('#alert-wrapper').html(alert_markup('danger', message));
                    return;
                }
                showCodeStage();
                $('#rsvp-modal').modal('show');
            })
            .fail(function () {
                if (session !== rsvpState.session) {
                    return;
                }
                setSubmitting(false);
                $('#alert-wrapper').html(alert_markup('danger', '<strong>Sorry!</strong> There is some issue with the server. Your answers are still here, please try again.'));
            });
    });

});

/********************** Guest list **********************/

// Each output.json row is one party; its non-empty values, in column order, are the members
function buildGuestIndex(rows) {
    if (!Array.isArray(rows)) {
        throw new Error('Guest list must be an array');
    }
    var parties = {};
    var options = [];
    var nameCounts = {};

    rows.forEach(function (row, partyId) {
        if (!row || typeof row !== 'object' || Array.isArray(row)) {
            return;
        }
        var members = Object.keys(row).map(function (column) {
            return typeof row[column] === 'string' ? row[column].trim() : '';
        }).filter(Boolean);
        if (!members.length) {
            return;
        }
        parties[partyId] = {partyId: partyId, members: members};
        members.forEach(function (name, memberIndex) {
            var key = name.toLowerCase();
            nameCounts[key] = (nameCounts[key] || 0) + 1;
            options.push({partyId: partyId, memberIndex: memberIndex, name: name, key: key});
        });
    });

    if (!options.length) {
        throw new Error('Guest list is empty');
    }

    // Shared names are labelled with their party so each option is unambiguous
    var labelCounts = {};
    options.forEach(function (option) {
        option.label = option.name;
        if (nameCounts[option.key] > 1) {
            var others = parties[option.partyId].members.filter(function (name, i) {
                return i !== option.memberIndex;
            });
            option.label += others.length ? ' (with ' + others.join(' & ') + ')' : ' (on their own)';
        }
        var labelKey = option.label.toLowerCase();
        labelCounts[labelKey] = (labelCounts[labelKey] || 0) + 1;
    });
    options.forEach(function (option) {
        if (labelCounts[option.label.toLowerCase()] > 1) {
            option.label += ' - party ' + (option.partyId + 1);
        }
    });

    return {parties: parties, options: options};
}

// Exact matches first, then word-prefix, then substring; dataset order within each group
function searchGuests(index, query, limit) {
    var q = String(query).trim().toLowerCase();
    if (!q) {
        return [];
    }
    var groups = [[], [], []];
    index.options.forEach(function (option) {
        var pos = option.key.indexOf(q);
        if (pos === -1) {
            return;
        }
        if (option.key === q) {
            groups[0].push(option);
        } else if (pos === 0 || /\s/.test(option.key.charAt(pos - 1))) {
            groups[1].push(option);
        } else {
            groups[2].push(option);
        }
    });
    // Never hide an exact-name duplicate behind the limit
    return groups[0].concat(groups[1], groups[2]).slice(0, Math.max(limit, groups[0].length));
}

/********************** Extras **********************/

// Google map
function initMap() {
    var location = {lat: 41.63716317228391, lng: -71.41553176506918};
    var house = {lat: 41.6369746245853, lng: -71.43399731832613};
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 15,
        center: location,
        scrollwheel: false,
    });

    var marker = new google.maps.Marker({
        position: house,
        map: map
    });
}

function initBBSRMap() {
    var la_fiesta = {lat: 20.305826, lng: 85.85480189999998};
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 15,
        center: la_fiesta,
        scrollwheel: false
    });

    var marker = new google.maps.Marker({
        position: la_fiesta,
        map: map
    });
}

// alert_markup
function alert_markup(alert_type, msg) {
    return '<div class="alert alert-' + alert_type + '" role="alert">' + msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span>&times;</span></button></div>';
}

function escape_html(text) {
    return $('<div>').text(text).html().replace(/"/g, '&quot;');
}

// MD5 Encoding
var MD5 = function (string) {

    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x, y, z) {
        return (x & y) | ((~x) & z);
    }

    function G(x, y, z) {
        return (x & z) | (y & (~z));
    }

    function H(x, y, z) {
        return (x ^ y ^ z);
    }

    function I(x, y, z) {
        return (y ^ (x | (~z)));
    }

    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    function WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }

    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

    return temp.toLowerCase();
};