# Changelog

## General Information

Some versions in the changelog were skipped because they were released or pushed 
as part of a later version.
Time Copy was converted into a side-bar version from version 0.8.7.

## V 0.8.80
- fix: text-label styling on small resolution
- feature: get new "Master-Booking-Number" marked with "°" as Ticketnumber, when exists.
- other: code and logic clean-up for bookingplatform ProTime

## V 0.8.92
- feature: reload plugin instantly on config-changes and show notification
- feature: reload plugin before exporting file
- feature: timesheet-filter icons
- feature: notification timeout
- fix: catch error, wehen booking number is missing in ticket and project-detection
- fix: booking-platform automatic as default on "empty" profile in localStorage
- fix: proTime double click overlay
- fix: Filter-Icon and Text style on small screen
- other: rewrite ifs to try and catch
- other: timesheet-tobias - regExep varables optimization
- other: demp profiles (downloads tcprofile)

## V 0.9.00
- feature: new theme "chrome black"
- feature: dlc - steve google excel filter
- feature: add hidden tag
- (feature: language - taken out)
- feature: theme dropdown groups
- fix: error catch, when ticket has no discription
- fix: better icons for configurations
- other: timesheet filter code refactor
- other: components restructure
- other: theme renaming

## V 0.9.10
- fix: error: import statement outside module
- other: webpack integration
- other: load functions on dom 
- other: component restructure
- other: add more delay between h and ticket number (proTime dlc)

## V 0.9.20
- feature: new configuratin ui design
- feature: dlc information dropdown 
- feature: new themes and theme redesign
- feature: protime test function in protime dlc
- fix: hidden tag detection (detection-filtering)
- fix: if theme is null, set default
- fix: dlc informations and theme headlines in german 
- other: dlc dynamic import
- other: changes on different elements and storages naming
- other: new Profile-Version

## V 0.9.21
- fix: DLC-Automatic detection
- fix: Project-Detection error
- fix: DLC-ProTime Ticket validating
- fix: styles
- other: HTML refactor
- other: logs added

## V 0.9.50
- feature: message feedback
- other: code refactor
- other: wordings in messages

## V 0.9.60
- fix: DLC SteveGoogleExcel data filter
- other: DLC ProTime - Timer
- other: better tobias theme

## V 0.9.62
- feature: new theme
- feature: clear all message animation
- fix: DLC SteveGoogleExcel V 1.2
- fix: styles
- other: documentation init
- other: code cleanup
- other: cleanup data
- other: DLC wordings
- other: clean console.logs

## V 0.9.63 (Release)
- other: detection activity filter added

## V 0.9.70
- feature: responsive style for large width
- feature: button to clear DLC-Cache
- fix: detection item style
- other: placeholder text for empty message details
- other: better error handling and response
- feature: show loading spinner on pasting and lock action buttons
- fix: catch chrome tab exec-error
- fix: DLC AmagProTime - Renew page click overlay when reopen TimeCopy / paste again
- fix: DLC AmagProTime - Show page click overlay after error 
- other: Dynamic DLC-Import in Project-Detection select
- other: XMas Update
- other: DLC ProTime - get page js speed for better booking performance

## V 0.9.71
- feature: responsive style for detection Items

## V 0.9.72
- feature: cancel button
- fix: error log on empty chrome window for Automatic and ProTime DLC
- other: Theme changes - Mr.White & Midnight GLow

## V 0.9.80 
- feature: DLC Amag ProTime - recode, latency-mode and retry function on booking error
- feature: Input- and Text-Titles on hover (DE)
- feature: new theme nostalgica
- other: cursor pointer for select
- other: Theme adjustments and fixes
- other: better html

## V 0.9.81 (Release)
- fix: nostalgica theme
- fix: notification style in front of xmas dlc
- other: remove storage and declarative Content premission

## V 0.9.82 (Release)
- fix: invisible texts in themes
- other: code clean up
- other: renaming low latency to high latency
- other: new public file structure
- other: readme, license, documentation

### March Update

## V 1.0.0 (Release)
- feature: configuration to show / hide messages
- feature: amagprotime dlc - multiple string matches in detection item
- feature: compatibility with older profile versions / supported profile version list
- feature: return message, if browser is offline
- fix: show error notification when trying to import currupt profile
- fix: show error notification after reimport same profile
- fix: remove automatic error json feedback
- fix: write default values into exported file on fresh profile
- fix: font fallback
- fix: style fixes
- other: new profile version
- other: new Theme "Japan's White" & "Oceans ground"
- other: documentation
- other: restructure dlc cache
- other: block app on critical errors
- other: amagprotime dlc - remove test-button (use regular paste-button in test-mode)
- other: js messages are now stored in a language json (other languages can be added in feature)

## V 1.0.01 (Release / V 1.0.011 cuz chromestore upload issue)
- fix: messages not showing after reset cache
- other: showing message, when ProTime test-Mode is activated

## V 1.0.20
- feature: maximal 20 message items
- fix: style on small screen
- other: placeholder opacity
- other: new profile version & compatibility to older versions
- other: code cleanup
- other: de html texts
- other: app version name

## V 1.0.21
- fix: export configs directly after changes
- other: mini service for session storage

## V 1.0.22 - 1.1.80
- feature: dlc amag protime - turn ticketnomber pasting into text on and off
- feature: liquid silver theme
- feature: oceansground technical theme
- feature: profile picture
- feature: profile file encoding
- feature: profile options as dropdown
- feature: any-update -> every ticket can now applied to an platform via "*" in the ticketname
- feature: booking counter
- feature: reset app button (loading screen)
- feature: auto select day function, if it is in clipboard
- fix: small screen styles
- fix: showAllMessages default value
- fix: other import/export issues
- fix: create lstorasge on startup
- fix: dlc amag protime - catch error when overlay is not hiding
- fix: themes select arrow position
- other: restructure and clean up code
- other: map theme select dynamicaly
- other: profile cleanup (redesign and select options)
- other: new profile file version (TCP1)
- other: render theme and options dynamicaly to html
- other: profile import type as dynamic attribute to html
- other: disable highlatency-function on high ping
- other: change high-ping notification to message
- other: restart app if platform dlc informations are not there (edge case)
- other: show error, if app was restarted too many times or too fast