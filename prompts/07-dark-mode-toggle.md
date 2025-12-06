# Dark Mode Toggle for Survey Application

Implement a dark mode theme toggle that allows conference attendees to switch between light and dark color schemes, reducing eye strain in low-light conditions. The feature should respect system preferences, persist user choices, and provide instant theme switching without layout shifts or flash of unstyled content (FOUC).

## Requirements

- User can toggle between light and dark modes using a visible, accessible control
- Application automatically detects and applies system dark mode preference on first visit
- Theme preference persists across browser sessions and page reloads
- Theme applies immediately on page load without flashing the wrong theme first (no FOUC)
- All text and UI elements meet WCAG 2.1 AA contrast requirements in both light and dark modes
- Focus indicators remain clearly visible in dark mode
- Theme toggle is keyboard accessible and announces state changes to screen readers
- Theme switching is instant with no layout shift or jarring transitions
- Works consistently across Chrome, Safari, Firefox, and Edge browsers

## Rules

- [rules/react-rules.md](../rules/react-rules.md)
- [rules/design-rules.md](../rules/design-rules.md)
- [rules/state-management-rules.md](../rules/state-management-rules.md)
- [rules/typescript-rules.md](../rules/typescript-rules.md)
- [rules/clean-code.md](../rules/clean-code.md)

## Extra Considerations

- **FOUC Prevention**: Theme must be applied before React hydration to avoid flash of wrong theme. Consider inline script in `index.html` to set data-attribute based on localStorage/system preference before app loads.

- **System Preference Listening**: Monitor `prefers-color-scheme` media query for changes while app is open (user might change system theme).

- **Accessibility - Focus Indicators**: Ensure focus outlines have sufficient contrast in dark mode (may need to adjust from brand blue to lighter variant).

- **Accessibility - Screen Reader Announcements**: Theme toggle should announce "Switched to dark mode" / "Switched to light mode" when activated, not just "Theme toggle button".

- **Performance**: Theme switching should not cause re-renders of entire component tree - use Mantine's built-in `ColorSchemeProvider` which is optimized for this.

- **Responsive Design**: Theme toggle placement should work on mobile (375px) and desktop - consider header placement that doesn't clutter mobile navigation.

- **Logo Handling**: Equal Experts logo may need a variant for dark mode (white/light version). Check if `https://www.equalexperts.com/wp-content/uploads/2024/10/2024-Logo.svg` adapts to dark backgrounds or if a separate light logo URL exists.

- **Mantine Components**: All Mantine components should automatically adapt to dark mode through theme provider - verify all custom components follow same pattern.

- **Color Contrast Testing**: Use WebAIM contrast checker to validate all color combinations in dark theme meet 4.5:1 for normal text, 3:1 for large text.

- **Browser Compatibility**: `prefers-color-scheme` media query is supported in all modern browsers, but verify fallback behavior in older browsers.

## Testing Considerations

**Unit Tests:**
- Theme context provides correct default based on localStorage
- Theme context falls back to system preference when localStorage empty
- Theme toggle switches between light and dark
- Theme preference persists to localStorage on change

**Integration Tests:**
- Theme applies to all pages (survey, thank you, admin if applicable)
- All Mantine components render correctly in dark mode
- Custom question components adapt to dark theme
- Form validation errors visible in dark mode

**Accessibility Tests:**
- Theme toggle is keyboard accessible (Tab, Enter, Space)
- Theme toggle announces state to screen reader
- Focus indicators meet contrast requirements in dark mode
- All text meets WCAG AA contrast in both themes

**Visual Regression Tests:**
- Survey page renders correctly in light mode
- Survey page renders correctly in dark mode
- No layout shift when switching themes
- Logo displays correctly in both themes

**Manual Testing:**
- No FOUC when loading page with dark mode preference
- Theme persists across page reloads
- System preference detection works on first visit
- Works on mobile Safari, Chrome Mobile, Firefox Mobile
- Works on desktop Chrome, Firefox, Safari, Edge

## Implementation Notes

**Technology Choices:**
- Use Mantine's built-in `ColorSchemeProvider` and `useMantineColorScheme` hook
- Use `localStorage` for persistence (simpler than cookies, no server-side needed)
- Use CSS custom properties (CSS variables) for theme values to enable instant switching
- Use `prefers-color-scheme` media query for system preference detection

**FOUC Prevention Strategy:**
- Add inline `<script>` in `index.html` before app bundle to immediately set `data-mantine-color-scheme` attribute on `<html>` element based on localStorage or system preference
- This ensures correct theme CSS applies before React mounts
- Mantine will hydrate with matching theme, preventing flash

**Performance Optimization:**
- Theme switching should only re-render components that consume theme context
- Use Mantine's optimized color scheme provider (already memoized)
- Avoid prop drilling - use Mantine's built-in hooks instead

**State Management:**
- Use Mantine's `ColorSchemeProvider` (built on React Context)
- Persist to localStorage on every theme change
- No complex state management needed (follows RULE-101 from state-management-rules.md)

**Styling Approach:**
- Define dark theme palette in Mantine theme configuration
- Let Mantine components automatically adapt
- For custom components, use `useMantineTheme()` hook to access current colors
- Avoid hardcoded colors - always reference theme values

**Accessibility Implementation:**
- Theme toggle button with `aria-label="Toggle theme. Current theme: light mode"` that updates dynamically
- Use `aria-live="polite"` region to announce theme changes
- Ensure toggle has visible focus indicator in both themes
- Icon should be semantic (sun for light, moon for dark) but not relied upon alone

## Specification by Example

### Example 1: First-Time Visitor with System Dark Mode
**Given:** User has dark mode enabled in their macOS/iOS/Windows settings
**When:** User opens survey for the first time (no localStorage preference)
**Then:**
- Survey displays in dark mode immediately (no flash of light theme)
- Dark background (#1a1b1e), light text (#c1c2c5)
- Theme toggle shows moon icon indicating current dark state
- Theme toggle is present in header/navigation

### Example 2: Manual Theme Toggle
**Given:** User is viewing survey in light mode
**When:** User clicks the theme toggle button in the header
**Then:**
- Theme instantly switches to dark mode with smooth transition (200ms max)
- All colors invert appropriately (backgrounds, text, buttons, cards)
- Toggle icon changes from sun to moon
- Screen reader announces "Switched to dark mode"
- Preference saved to localStorage as `{ "color-scheme": "dark" }`

### Example 3: Returning User with Saved Preference
**Given:** User previously set theme to dark mode (localStorage: `{ "color-scheme": "dark" }`)
**When:** User returns to survey and loads any page
**Then:**
- Page renders in dark mode from first pixel (no FOUC)
- Saved preference overrides system preference
- Theme persists across all pages (survey, thank you page)

### Example 4: Keyboard Navigation
**Given:** User navigating survey with keyboard only
**When:** User tabs to theme toggle and presses Enter or Space
**Then:**
- Theme switches between light and dark
- Focus remains on toggle button after activation
- Focus indicator clearly visible in both themes
- Screen reader announces new theme state

### Example 5: Dark Mode Color Contrast
**Given:** Survey in dark mode
**When:** User views question cards, buttons, and form inputs
**Then:**
- Primary text (#c1c2c5) on dark background (#1a1b1e) = 10.7:1 contrast ✓
- Button text white on Equal Blue (#1795d4) = 4.5:1 contrast ✓
- Error text red-300 on dark background = 4.5:1 contrast ✓
- All interactive elements have visible borders/outlines
- Focus indicators use light blue (#60a5fa) = sufficient contrast

### Example 6: Responsive Behavior
**Given:** User on mobile device (375px width)
**When:** User accesses theme toggle
**Then:**
- Toggle is accessible in mobile header (not hidden in menu)
- Touch target is minimum 44x44px
- Icon is visible and clearly indicates current theme
- Works identically to desktop behavior

## Verification

- [ ] Theme toggle button is present and visible in header on all pages
- [ ] Clicking toggle switches between light and dark mode instantly
- [ ] Theme preference persists after page reload
- [ ] System dark mode preference is detected and applied on first visit
- [ ] No flash of wrong theme on page load (FOUC prevented)
- [ ] All text meets WCAG AA contrast in light mode (4.5:1 normal, 3:1 large)
- [ ] All text meets WCAG AA contrast in dark mode (4.5:1 normal, 3:1 large)
- [ ] Focus indicators clearly visible in both themes
- [ ] Theme toggle is keyboard accessible (Tab to focus, Enter/Space to activate)
- [ ] Theme toggle has proper ARIA label indicating current state
- [ ] Screen reader announces theme changes (test with VoiceOver/NVDA)
- [ ] Theme switch has no layout shift or jarring animation
- [ ] All Mantine components render correctly in dark mode
- [ ] Custom question components adapt to dark theme colors
- [ ] Survey cards, buttons, inputs styled correctly in dark mode
- [ ] Logo displays appropriately in both themes
- [ ] Works in Chrome 120+ (desktop and mobile)
- [ ] Works in Safari 17+ (desktop and mobile)
- [ ] Works in Firefox 120+ (desktop and mobile)
- [ ] Works in Edge 120+ (desktop)
- [ ] Theme persists across all pages (survey, thank you, admin)
- [ ] Mobile touch target is minimum 44x44px
- [ ] Responsive behavior works from 375px to 1920px
- [ ] Equal Experts brand colors maintained in both themes
- [ ] No console errors related to theme switching
- [ ] localStorage updates correctly on theme change
