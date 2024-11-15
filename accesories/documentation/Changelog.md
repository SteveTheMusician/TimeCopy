# Changelog

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
- feature: cancel button
- fix: error log on empty chrome window for Automatic and ProTime DLC
- feature: DLC Amag ProTime - recode,