# Snippet description
The following snippet powers the google spreedsheet @ https://docs.google.com/spreadsheets which delivers the RSVP data to the user via email and spreadsheet

The `RSVP` sheet's header row must be: `timestamp,email,party_names,rehearsal,mehndi,wedding,invite_code`

Each guest gets their own row with `YES`/`NO` for invited events and blank cells for uninvited events; `timestamp`, `email` and `invite_code` are only on the
party's first row, and an empty row separates parties.

Submissions are validated against the same `data/output.json` the website uses, fetched from the published site
(set `GUEST_LIST_URL`). A party is identified by its index in that array, so append new parties to the end of the
file rather than reordering it. After pasting this script, redeploy the web app and approve the new
"connect to an external service" permission that `UrlFetchApp` requires.

# Code
```
var TO_ADDRESS = "coreyj97@gmail.com"; // email to send the form data to

// Public URL of the website's data/output.json
var GUEST_LIST_URL = "https://raw.githubusercontent.com/coreymaroney/wedding-website/refs/heads/master/data/output.json";

// 271117 may only RSVP for one guest; 74774 may RSVP for their whole party
var INVITE_RULES = { "271117": { singleInvitee: true }, "74774": { singleInvitee: false } };
var RSVP_EVENTS = ["rehearsal", "mehndi", "wedding"];

function errorResponse(message) {
  return ContentService
        .createTextOutput(JSON.stringify({"result":"error", "message": message}))
        .setMimeType(ContentService.MimeType.JSON);
}

function loadGuestList() {
  var cache = CacheService.getScriptCache();
  var text = cache.get("guest_list");
  var rows;
  if (text) {
    rows = JSON.parse(text);
  } else {
    var response = UrlFetchApp.fetch(GUEST_LIST_URL, { muteHttpExceptions: true });
    if (response.getResponseCode() !== 200) {
      throw new Error("Guest list request failed with status " + response.getResponseCode());
    }
    text = response.getContentText();
    rows = JSON.parse(text);
    if (!Array.isArray(rows)) {
      throw new Error("Guest list is malformed");
    }
    cache.put("guest_list", text, 600);
  }
  return rows;
}

// Mirrors buildGuestIndex() in js/scripts.js: non-empty trimmed values, in column order
function getPartyMembers(partyId) {
  var row = loadGuestList()[partyId];
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return null;
  }
  var members = Object.keys(row).filter(function (column) {
    return /^Guest\d*$/.test(column);
  }).map(function (column) {
    return typeof row[column] === "string" ? row[column].trim() : "";
  }).filter(function (name) { return name.length > 0; });
  var tags = Array.isArray(row.tags) ? row.tags : [];
  var events = RSVP_EVENTS.filter(function (event) {
    return tags.some(function (tag) {
      return typeof tag === "string" && tag.trim().toLowerCase() === event;
    });
  });
  return members.length ? { members: members, events: events } : null;
}

// Splits newline-delimited names and YES/NO answers; null unless they align one-to-one
function parseResponses(data, events) {
  var split = function (text) {
    return text.split(/\r?\n/).map(function (line) { return line.trim(); });
  };
  if (typeof data.party_names !== "string" || !events.length) return null;
  var names = split(data.party_names);
  if (!names.every(function (name) { return name.length > 0; })) return null;
  var answers = {};
  var valid = RSVP_EVENTS.every(function (event) {
    if (typeof data[event] !== "string") return false;
    if (events.indexOf(event) === -1) {
      answers[event] = names.map(function () { return ""; });
      return data[event] === "";
    }
    answers[event] = split(data[event]);
    return answers[event].length === names.length && answers[event].every(function (answer) {
      return answer === "YES" || answer === "NO";
    });
  });
  return valid ? { names: names, answers: answers } : null;
}

/**
 * This method is the entry point.
 */
function doPost(e) {

  try {
    var inviteCode = String(e.parameter.invite_code || "").trim();
    if (!INVITE_RULES.hasOwnProperty(inviteCode)) { // validate invite code before saving data
      Logger.log("Incorrect Invite Code");
      return errorResponse("Sorry, your invite code is incorrect.");
    }

    var email = String(e.parameter.email || "").trim();
    if (!email) {
      return errorResponse("Please enter your email address.");
    }

    var rawPartyId = String(e.parameter.party_id || "").trim();
    var party = /^\d+$/.test(rawPartyId) ? getPartyMembers(Number(rawPartyId)) : null;
    if (!party) {
      return errorResponse("Sorry, we couldn't find your party on the guest list.");
    }

    var responses = parseResponses(e.parameter, party.events);
    if (!responses) {
      return errorResponse("Sorry, we couldn't read your RSVP. Please answer for every guest and try again.");
    }
    var partyNames = responses.names;
    if (INVITE_RULES[inviteCode].singleInvitee && partyNames.length > 1) {
      return errorResponse("Sorry, your invite code allows an RSVP for one guest only.");
    }

    // Every name must belong to the party, each used at most once
    var remaining = party.members.slice();
    for (var i = 0; i < partyNames.length; i++) {
      var index = remaining.indexOf(partyNames[i]);
      if (index === -1) {
        return errorResponse("Sorry, one or more names are not part of your party on the guest list.");
      }
      remaining.splice(index, 1);
    }
    if (!INVITE_RULES[inviteCode].singleInvitee &&
        (partyNames.length !== party.members.length || partyNames.some(function (name, memberIndex) {
          return name !== party.members[memberIndex];
        }))) {
      return errorResponse("Please respond for every member of your party in guest-list order.");
    }

    var mailData = {
      email: email,
      party_names: partyNames.join("\n"),
      invite_code: inviteCode
    };
    RSVP_EVENTS.forEach(function (event) {
      mailData[event] = party.events.indexOf(event) === -1 ? "" : responses.answers[event].join("\n");
    });
    
    record_data(mailData, party.events);
    
    MailApp.sendEmail({
      to: TO_ADDRESS,
      subject: "A new guest RSVP'd for your wedding",
      replyTo: mailData.email,
      htmlBody: formatMailBody(mailData)
    });

    return ContentService    // return json success results
          .createTextOutput(JSON.stringify({"result":"success","data": JSON.stringify(mailData) }))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(error) { // if error return this
    Logger.log(error);
    return errorResponse("Sorry, there is an issue with the server.");
  }
}


/**
 * This method inserts one row per guest into the sheet, followed by an empty separator row.
 */
function record_data(data, events) {
  var responses = parseResponses(data, events);
  if (!responses) {
    throw new Error("Invalid RSVP responses");
  }
  var lock = LockService.getScriptLock();
  lock.waitLock(10000); // keep concurrent parties from interleaving rows
  try {
    var doc     = SpreadsheetApp.getActiveSpreadsheet();
    var sheet   = doc.getSheetByName('RSVP'); // select the RSVP sheet
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    if (headers.join(",") !== "timestamp,email,party_names,rehearsal,mehndi,wedding,invite_code") {
      throw new Error("RSVP sheet headers do not match the event schema");
    }
    var lastRow = sheet.getLastRow();
    // Skip one row after the previous party; it stays empty as the separator
    var nextRow = lastRow > 1 ? lastRow + 2 : lastRow + 1;
    var timestamp = new Date().toUTCString();
    var rows = responses.names.map(function (name, p) {
      return headers.map(function (header) {
        if (header === "party_names") return name;
        if (RSVP_EVENTS.indexOf(header) !== -1) return responses.answers[header][p];
        if (p > 0) return ""; // shared fields only on the party's first row
        if (header === "timestamp") return timestamp;
        return data.hasOwnProperty(header) ? data[header] : "";
      });
    });
    rows.push(headers.map(function () { return ""; }));
    sheet.getRange(nextRow, 1, rows.length, headers.length).setValues(rows);
    SpreadsheetApp.flush();
  }
  catch(error) {
    Logger.log(error);
    throw error; // propagate so doPost reports the failure instead of success
  }
  finally {
    lock.releaseLock();
  }
}


function escapeHtml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/**
 * This method is just to prettify the email.
 */
function formatMailBody(obj) { // function to spit out all the keys/values from the form in HTML
  var result = "";
  for (var key in obj) { // loop over the object passed to the function
    result += "<h4 style='text-transform: capitalize; margin-bottom: 0'>" + escapeHtml(key) + "</h4><div>" + escapeHtml(obj[key]).replace(/\n/g, "<br>") + "</div>";
  }
  return result; // once the looping is done, `result` will be one long string to put in the email body
}
```