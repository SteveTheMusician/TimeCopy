# Changelog

## General Information

Some versions were omitted from this changelog as they were released or merged into later updates.
As of version 0.8.7, *Time Copy* was transformed into a sidebar-based interface.

---

## Last important changes summary
- Fix filter not accepted after change

## V 1.3.22
* **Fixes**
- Show platform module list on start screen again
- Catch undefiened errors from filters and platforms
- Fix filter not accepted after change

* **Other Changes* **
- code cleanup (also storage changes)
- replace License url with Issue reporting
- update license and dokumentation

## V 1.3.21
* **Fixes**
- Module AmagProTime: regonize when textarea is filled at the beginning of the booking process and reload page
- Module AmagProTime: mark ProTime elements, when they didnt change as expected

* **Other Changes* **
- component error feedback
- code cleanup

## V 1.3.19
* **Fixes**
  * EE Error when time is up but changes to Statusbar happen

## V 1.3.18

* **Other Changes**
  * Code cleanup
  * Module Amag ProTime: Change click-overlay text + warning text
  * Module Amag ProTime: Push Tickets with failed Textarea-Status in to retry list

## V 1.3.17 (Release)

* **Fixes**
  * Module Amag ProTime: Fix booking problems, when an empty activity is maintained in protime
  * Module Amag ProTime: Wording fixes
  * Theme fixes
  * Fix first start screen display error

* **Other Changes**
  * Code cleanup

## V 1.3.16 - *Silver Fox Update

* **Features**
  * Add icon for toast
  * New theme "Silver Suit"
  * Strawberry Milkshake theme added

* **Fixes**
  * Hide First-Start-Screen, when user resets app and import profile directly after it

* **Other Changes**
  * Rename Notification to Toast
  * Fix Toast functions that arouses durning redevelopment
  * Add pattern to name input
  * Lots of other code clean up

## V 1.2.52 - *Silver Fox Update (Pre-Release)*

* **Features**
  * Detection-Items: 
    - can now be minimized
    - editable title for better orientation
    - dynamic content
  * Add new platform and filter modules
  * Show marker on tab-buttons, if something has to be maintained by the user

* **Fixes**
  * Module Amag ProTime: Return error message on reloading / changing website while inject-script is running
  * Module Amag ProTime: Fix observer polling (better observing of elements and values in ProTime)
  * Stylings
  * Fix app crash when creating a new filter module on update
  * Change the profile picture from the imported file if an image is already set.
  * Set empty profile name to default
  * Module-AmagProTime: show correct nomber of booked tickets, when retry-list was triggered
  * Module-Automatic: select correct platform module on web-url

* **Other Changes**
  * Code cleanup
  * Module-Items functionality & styling refactoring
  * Default "Modules" filter none and platform any added
  * Change dlc-namings to "modules"
  * Remove old theme

## V 1.2.34 (Release)

* **Fixes**
  * Show right messages on app crash in Statusbar
  * Move all statusbartexts to languaguage.json (For different languages in future)

* **Other Changes**
  * Better description in Filter-Modules

## V 1.2.33 (Release)

* **Features** *
  * Add status bar feedback text and change styling
  * Add Scrollbar for Platform-Modules with function-content

* **Fixes**
  * Show/Hide statusbar in startscreen

* **Other Changes**
  * Change Filter-Modules descriptions and add supported sources
  * Ability to export profile decoded (hidden option)

## V 1.2.27 (Release)

* **Fixes**
  * "IAPP-FIX": Fix matching error with single string in Tobias Excel Module

## V 1.2.26 (Release)

* **Features**
  * Module Tobias Excel: (cryptpad fix) Ability to filter informations from cryptpad

## V 1.2.25

* **Fixes**
  * Styling fixes
  * Fix theme import

* **Maintance**
    * Module Amag ProTime: Activity "AP01..." replaced with "Projekte & Change"



## V 1.2.24 (Release) - *Liquid Silver Update*

* **Features**

  * New theme: Liquid Silver
  * New technical theme: Oceans Ground
  * Profile pictures
  * Profile file encoding
  * Dropdown-based profile options
  * `*` in ticket names now allows assignment to any platform ("any-update")
  * Booking counter
  * App reset button (with loading screen)
  * Auto-select day from clipboard
  * Save last clicked configuration tab
  * Introduction-Screen added for new users
  * Module Amag ProTime: Toggle ticket number pasting as text
  * Module Amag ProTime: Show how many Tickets are booked successfully

* **Fixes**

  * Styling issues on small screens
  * Default value for `showAllMessages`
  * Import/export bugs
  * Ensure localStorage is created on startup
  * Module Amag ProTime: Error handling when overlay fails to hide
  * Theme select arrow positioning
  * Module AmagProTime - Team C Sync Error Fix: Match detection-items by additional prefix, no metter what order they have 
  * Module Amag ProTime: Throw error if Observer didn't get ProTime Element and break up booking
  * Module Amag ProTime: Catch zero hour working time and throw error to prevent BookingLoop-Error
  * Module Amag proTime: Fix ticketnumber with lower case booking error
  * Show warning, if no detection items are avaible after deleting all
  * Notification doubles removed

* **Other Changes**

  * Code cleanup and restructuring
  * Dynamic mapping of theme options
  * Profile redesign and cleanup
  * New profile file version (TCP1)
  * Dynamic rendering of themes and profile options
  * Profile import type added as HTML attribute
  * Disable high-latency mode on high ping
  * Changed high ping alert to message
  * Restart app if platform Module data is missing (edge case)
  * Display error if app is restarted too frequently
  * Load fonts offline to prevent long loading time on bad internet connection
  * Automatic-Module: Give error feedback when storage is not available
  * Show changelog url in update message
  * Npm update
  * Improve Tab-Focus style and detection on elements
  * Get detection items on change and update app
  * Change service option for proTime module & detections

---

## V 1.0.21

* **Fixes**

  * Export settings immediately after change

* **Other**

  * Added mini session storage service

## V 1.0.20

* **Features**

  * Limit messages to 20 items

* **Fixes**

  * Styles for small screens

* **Other**

  * Placeholder opacity adjustment
  * New profile version (backwards-compatible)
  * Code cleanup
  * Improved German translations
  * App version label

## V 1.0.01 (Release / v1.0.011 due to Chrome Store issue)

* **Fixes**

  * Messages not displaying after cache reset

* **Other**

  * Notification when ProTime test mode is active

## V 1.0.0 (Release) — *March Update*

* **Features**

  * Toggle visibility of messages via settings
  * Module AmagProTime: Multi-string match in detection items
  * Compatibility with older profile versions
  * Return a message when offline

* **Fixes**

  * Show error on corrupt profile import
  * Error alert when reimporting the same profile
  * Remove automatic error JSON feedback
  * Write default values when exporting from a new profile
  * Font fallbacks
  * General styling improvements

* **Other**

  * New profile version
  * New themes: Japan’s White & Oceans Ground
  * Improved documentation
  * Module cache restructuring
  * App blocks on critical errors
  * Removed test button from AmagProTime Module (use normal paste in test mode)
  * All JS messages now stored in language JSON (for future multilingual support)

---

## V 0.9.82 (Release)

* **Fixes**

  * Invisible text in some themes

* **Other**

  * Code cleanup
  * Renamed latency setting
  * Public folder restructured
  * Updated README, license, and documentation

## V 0.9.81 (Release)

* **Fixes**

  * Nostalgica theme styling
  * Notification overlapping Christmas Module

* **Other**

  * Removed unused permissions and storage keys

## V 0.9.80

* **Features**

  * Module Amag ProTime: Refactored, with latency mode and retry on errors
  * Input and text titles shown on hover (German)
  * New theme: Nostalgica

* **Other**

  * Pointer cursor for select fields
  * Theme refinements
  * Improved HTML structure

## V 0.9.72

* **Features**

  * Cancel button

* **Fixes**

  * Error logging when Chrome window is empty (Automatic & ProTime Modules)

* **Other**

  * New theme tweaks: Mr. White & Midnight Glow

## V 0.9.71

* **Features**

  * Responsive layout for detection items

## V 0.9.70

* **Features**

  * Responsive design for wide screens
  * Clear Module cache button
  * Loading spinner during paste
  * Lock action buttons while pasting

* **Fixes**

  * Detection item styling
  * Chrome tab execution error handling
  * Module AmagProTime: Reopen page/paste overlays
  * Module AmagProTime: Post-error overlay handling

* **Other**

  * Placeholder for empty message descriptions
  * Improved error handling
  * Dynamic Module import in project selector
  * Christmas update
  * Performance improvements in Module ProTime booking

## V 0.9.63 (Release)

* **Other**

  * Added detection activity filter

## V 0.9.62

* **Features**

  * New theme
  * "Clear all" message animation

* **Fixes**

  * Module SteveGoogleExcel (v1.2) bugs
  * Styling tweaks

* **Other**

  * Initial documentation
  * Code and data cleanup
  * Improved wording in Module
  * Removed unnecessary `console.log` entries

## V 0.9.60

* **Fixes**

  * Module SteveGoogleExcel data filter

* **Other**

  * Module ProTime: Timer improvements
  * Better Tobias theme

## V 0.9.50

* **Features**

  * Feedback messages

* **Other**

  * Refactored code
  * Improved message wording

## V 0.9.21

* **Fixes**

  * Automatic Module detection
  * Project detection errors
  * Module ProTime ticket validation
  * General styling

* **Other**

  * HTML structure refactored
  * Added logging

## V 0.9.20

* **Features**

  * Redesigned configuration UI
  * Module information dropdown
  * New and redesigned themes
  * ProTime test function in Module

* **Fixes**

  * Hidden tag detection
  * Fallback when theme is null
  * German labels for Module and themes

* **Other**

  * Dynamic Module imports
  * Renamed elements and storage keys
  * New profile version

## V 0.9.10

* **Fixes**

  * Fixed ES module import error

* **Other**

  * Webpack integration
  * Functions now load on DOM ready
  * Component restructuring
  * Additional delay added between H and ticket number (Module)

## V 0.9.00

* **Features**

  * New theme: Chrome Black
  * Module SteveGoogleExcel filter
  * Hidden tag support
  * Theme dropdown grouping

* **Fixes**

  * Error catching for empty ticket descriptions
  * Improved icons in settings

* **Other**

  * Timesheet filter refactored
  * Component reorganization
  * Theme renaming

## V 0.8.92

* **Features**

  * Instant plugin reload on config changes + notifications
  * Plugin reload before export
  * Timesheet filter icons
  * Notification timeout

* **Fixes**

  * Error catching: missing booking number
  * Default booking platform for empty profiles
  * ProTime overlay on double-click
  * Filter icon + text styling for small screens

* **Other**

  * Replaced `if` logic with `try/catch`
  * Optimized RegEx variables for timesheet
  * Added demo profiles for downloads

## V 0.8.80

* **Fixes**

  * Text label styling on small resolutions

* **Features**

  * Detect and label new "Master Booking Number" as ticket number (marked with "°")

* **Other**

  * Cleaned up booking platform ProTime code and logic
