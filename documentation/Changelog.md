# Changelog

## General Information

Some versions were omitted from this changelog as they were released or merged into later updates.
As of version 0.8.7, *Time Copy* was transformed into a sidebar-based interface.

---

## Last important changes summary

* **Filter-DLCs:**
  * "IAPP-FIX": Fix matching error with single string in Tobias Excel DLC
  * Add Scrollbar for Platform-DLCs with function-content

## V 1.2.47

* **Features** *
  * Detection-Items: 
    - can now be minimized
    - editable title for better orientation
    - dynamic content

* **Fixes:**
  * DLC Amag ProTime: Return error message on reloading / changing website while inject-script is running
  * DLC Amag ProTime: Fix observer polling (better observing of elements and values in ProTime)
  * Stylings
  * Fix app crash when creating a new filter dlc on update
  * Change the profile picture from the imported file if an image is already set.

* **Other Changes:**
  * Code cleanup
  * DLC-Items functionality & styling refactoring
  * Default "DLCs" filter none and platform any added

## V 1.2.34 (Release)

* **Fixes:**
  * Show right messages on app crash in Statusbar
  * Move all statusbartexts to languaguage.json (For different languages in future)

* **Other Changes:**
  * Better description in Filter-DLCs

## V 1.2.33 (Release)

* **Features** *
  * Add status bar feedback text and change styling
  * Add Scrollbar for Platform-DLCs with function-content

* **Fixes:**
  * Show/Hide statusbar in startscreen

* **Other Changes:**
  * Change Filter-DLCs descriptions and add supported sources
  * Ability to export profile decoded (hidden option)

## V 1.2.27 (Release)

* **Fixes:**
  * "IAPP-FIX": Fix matching error with single string in Tobias Excel DLC

## V 1.2.26 (Release)

* **Features:**
  * DLC Tobias Excel: (cryptpad fix) Ability to filter informations from cryptpad

## V 1.2.25

* **Fixes:**
  * Styling fixes
  * Fix theme import

* **Maintance**
    * DLC Amag ProTime: Activity "AP01..." replaced with "Projekte & Change"



## V 1.2.24 (Release) - *Liquid Silver Update*

* **Features:**

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
  * DLC Amag ProTime: Toggle ticket number pasting as text
  * DLC Amag ProTime: Show how many Tickets are booked successfully

* **Fixes:**

  * Styling issues on small screens
  * Default value for `showAllMessages`
  * Import/export bugs
  * Ensure localStorage is created on startup
  * DLC Amag ProTime: Error handling when overlay fails to hide
  * Theme select arrow positioning
  * DLC AmagProTime - Team C Sync Error Fix: Match detection-items by additional prefix, no metter what order they have 
  * DLC Amag ProTime: Throw error if Observer didn't get ProTime Element and break up booking
  * DLC Amag ProTime: Catch zero hour working time and throw error to prevent BookingLoop-Error
  * DLC Amag proTime: Fix ticketnumber with lower case booking error
  * Show warning, if no detection items are avaible after deleting all
  * Notification doubles removed

* **Other Changes:**

  * Code cleanup and restructuring
  * Dynamic mapping of theme options
  * Profile redesign and cleanup
  * New profile file version (TCP1)
  * Dynamic rendering of themes and profile options
  * Profile import type added as HTML attribute
  * Disable high-latency mode on high ping
  * Changed high ping alert to message
  * Restart app if platform DLC data is missing (edge case)
  * Display error if app is restarted too frequently
  * Load fonts offline to prevent long loading time on bad internet connection
  * Automatic-DLC: Give error feedback when storage is not available
  * Show changelog url in update message
  * Npm update
  * Improve Tab-Focus style and detection on elements
  * Get detection items on change and update app
  * Change service option for proTime dlc & detections

---

## V 1.0.21

* **Fixes:**

  * Export settings immediately after change

* **Other:**

  * Added mini session storage service

## V 1.0.20

* **Features:**

  * Limit messages to 20 items

* **Fixes:**

  * Styles for small screens

* **Other:**

  * Placeholder opacity adjustment
  * New profile version (backwards-compatible)
  * Code cleanup
  * Improved German translations
  * App version label

## V 1.0.01 (Release / v1.0.011 due to Chrome Store issue)

* **Fixes:**

  * Messages not displaying after cache reset

* **Other:**

  * Notification when ProTime test mode is active

## V 1.0.0 (Release) — *March Update*

* **Features:**

  * Toggle visibility of messages via settings
  * DLC AmagProTime: Multi-string match in detection items
  * Compatibility with older profile versions
  * Return a message when offline

* **Fixes:**

  * Show error on corrupt profile import
  * Error alert when reimporting the same profile
  * Remove automatic error JSON feedback
  * Write default values when exporting from a new profile
  * Font fallbacks
  * General styling improvements

* **Other:**

  * New profile version
  * New themes: Japan’s White & Oceans Ground
  * Improved documentation
  * DLC cache restructuring
  * App blocks on critical errors
  * Removed test button from AmagProTime DLC (use normal paste in test mode)
  * All JS messages now stored in language JSON (for future multilingual support)

---

## V 0.9.82 (Release)

* **Fixes:**

  * Invisible text in some themes

* **Other:**

  * Code cleanup
  * Renamed latency setting
  * Public folder restructured
  * Updated README, license, and documentation

## V 0.9.81 (Release)

* **Fixes:**

  * Nostalgica theme styling
  * Notification overlapping Christmas DLC

* **Other:**

  * Removed unused permissions and storage keys

## V 0.9.80

* **Features:**

  * DLC Amag ProTime: Refactored, with latency mode and retry on errors
  * Input and text titles shown on hover (German)
  * New theme: Nostalgica

* **Other:**

  * Pointer cursor for select fields
  * Theme refinements
  * Improved HTML structure

## V 0.9.72

* **Features:**

  * Cancel button

* **Fixes:**

  * Error logging when Chrome window is empty (Automatic & ProTime DLCs)

* **Other:**

  * New theme tweaks: Mr. White & Midnight Glow

## V 0.9.71

* **Features:**

  * Responsive layout for detection items

## V 0.9.70

* **Features:**

  * Responsive design for wide screens
  * Clear DLC cache button
  * Loading spinner during paste
  * Lock action buttons while pasting

* **Fixes:**

  * Detection item styling
  * Chrome tab execution error handling
  * DLC AmagProTime: Reopen page/paste overlays
  * DLC AmagProTime: Post-error overlay handling

* **Other:**

  * Placeholder for empty message descriptions
  * Improved error handling
  * Dynamic DLC import in project selector
  * Christmas update
  * Performance improvements in DLC ProTime booking

## V 0.9.63 (Release)

* **Other:**

  * Added detection activity filter

## V 0.9.62

* **Features:**

  * New theme
  * "Clear all" message animation

* **Fixes:**

  * DLC SteveGoogleExcel (v1.2) bugs
  * Styling tweaks

* **Other:**

  * Initial documentation
  * Code and data cleanup
  * Improved wording in DLC
  * Removed unnecessary `console.log` entries

## V 0.9.60

* **Fixes:**

  * DLC SteveGoogleExcel data filter

* **Other:**

  * DLC ProTime: Timer improvements
  * Better Tobias theme

## V 0.9.50

* **Features:**

  * Feedback messages

* **Other:**

  * Refactored code
  * Improved message wording

## V 0.9.21

* **Fixes:**

  * Automatic DLC detection
  * Project detection errors
  * DLC ProTime ticket validation
  * General styling

* **Other:**

  * HTML structure refactored
  * Added logging

## V 0.9.20

* **Features:**

  * Redesigned configuration UI
  * DLC information dropdown
  * New and redesigned themes
  * ProTime test function in DLC

* **Fixes:**

  * Hidden tag detection
  * Fallback when theme is null
  * German labels for DLC and themes

* **Other:**

  * Dynamic DLC imports
  * Renamed elements and storage keys
  * New profile version

## V 0.9.10

* **Fixes:**

  * Fixed ES module import error

* **Other:**

  * Webpack integration
  * Functions now load on DOM ready
  * Component restructuring
  * Additional delay added between H and ticket number (DLC)

## V 0.9.00

* **Features:**

  * New theme: Chrome Black
  * DLC SteveGoogleExcel filter
  * Hidden tag support
  * Theme dropdown grouping

* **Fixes:**

  * Error catching for empty ticket descriptions
  * Improved icons in settings

* **Other:**

  * Timesheet filter refactored
  * Component reorganization
  * Theme renaming

## V 0.8.92

* **Features:**

  * Instant plugin reload on config changes + notifications
  * Plugin reload before export
  * Timesheet filter icons
  * Notification timeout

* **Fixes:**

  * Error catching: missing booking number
  * Default booking platform for empty profiles
  * ProTime overlay on double-click
  * Filter icon + text styling for small screens

* **Other:**

  * Replaced `if` logic with `try/catch`
  * Optimized RegEx variables for timesheet
  * Added demo profiles for downloads

## V 0.8.80

* **Fixes:**

  * Text label styling on small resolutions

* **Features:**

  * Detect and label new "Master Booking Number" as ticket number (marked with "°")

* **Other:**

  * Cleaned up booking platform ProTime code and logic
