# Mobile Testing Guide

## Testing Checklist for Mobile Devices

### Screen Sizes to Test

- ✅ **320px** - iPhone SE, small Android phones
- ✅ **375px** - iPhone 12/13 Mini
- ✅ **390px** - iPhone 14 Pro
- ✅ **412px** - Pixel 7
- ✅ **768px** - iPad Mini, small tablets
- ✅ **1024px** - iPad, large tablets
- ✅ **1280px+** - Desktop

### Portrait vs Landscape

Test both orientations on tablets and large phones:
- Portrait: Vertical stacking should work
- Landscape: Should adapt to wider layout

---

## Feature Testing on Mobile

### ✅ Vehicle State Panel
- [ ] Progress bars are visible and clear
- [ ] Numbers are readable without zoom
- [ ] Color coding is clear (green/amber/red)
- [ ] Touch doesn't interfere with scrolling

### ✅ Next Point Recommendation
- [ ] Card fits within viewport
- [ ] "ARRIVE AT CHECKPOINT" button is easily tappable (44px min)
- [ ] Text hierarchy is clear on small screens

### ✅ Map Visualization
- [ ] SVG renders correctly
- [ ] Points are tappable (not too small)
- [ ] Legend is readable
- [ ] No horizontal scrolling required
- [ ] Vehicle and route are clearly visible

### ✅ Simulation Controls
- [ ] All four buttons are tappable
- [ ] Icons and labels are visible
- [ ] Status indicator updates correctly
- [ ] No accidental double-taps

### ✅ Feasibility Panel
- [ ] Checkmarks and crosses are clear
- [ ] Point cards don't overflow
- [ ] Scrolling works smoothly
- [ ] Constraint details are readable

### ✅ Mathematical Scoring
- [ ] Formula displays without horizontal scroll
- [ ] Sliders are draggable with finger
- [ ] Coefficient values update in real-time
- [ ] Description text is readable

### ✅ Point Ranking Table
- [ ] Desktop table hidden on mobile
- [ ] Mobile cards display instead
- [ ] Cards are tappable
- [ ] All information is visible without scrolling horizontally
- [ ] Score values are prominent

### ✅ Checkpoint Verification Modal
- [ ] Modal centers on screen
- [ ] Sliders work with touch
- [ ] Text is readable
- [ ] Buttons are large enough
- [ ] Modal doesn't overflow viewport

### ✅ Event Log
- [ ] Events are readable
- [ ] Timestamps are clear
- [ ] Icons display correctly
- [ ] Scrolling works smoothly
- [ ] New events animate in properly

### ✅ Decision Trace
- [ ] Mathematical notation is readable
- [ ] Boxes stack vertically on mobile
- [ ] No content is cut off
- [ ] Color coding is preserved

---

## Performance Testing

### Load Time
- [ ] Initial load < 3 seconds on 4G
- [ ] Optimizations appear immediately after changes
- [ ] No lag when dragging sliders
- [ ] Animations are smooth (60fps)

### Memory Usage
- [ ] No memory leaks during extended use
- [ ] Event log caps at 50 events
- [ ] No accumulation of unused data

### Battery Impact
- [ ] Reasonable battery drain
- [ ] No excessive re-renders
- [ ] Animations don't cause overheating

---

## Touch Interaction Testing

### Gestures
- [ ] **Tap**: Selects collection points
- [ ] **Scroll**: Navigates page smoothly
- [ ] **Pinch-zoom**: Disabled (intentional for app-like feel)
- [ ] **Pull-to-refresh**: Disabled (prevents accidental refresh)

### Button Feedback
- [ ] Visual feedback on tap (color change)
- [ ] No delay between tap and action
- [ ] No accidental activations
- [ ] Disabled buttons clearly look disabled

### Slider Interaction
- [ ] Easy to grab and drag
- [ ] Doesn't jump to extreme values
- [ ] Shows current value while dragging
- [ ] Releases smoothly

---

## Browser Compatibility (Mobile)

### iOS Safari
- [ ] Layout renders correctly
- [ ] Touch events work
- [ ] Sliders are draggable
- [ ] No viewport issues
- [ ] Dark mode adapts

### Chrome Mobile (Android)
- [ ] Full functionality works
- [ ] Performance is good
- [ ] PWA install prompt appears
- [ ] Notifications work (if implemented)

### Samsung Internet
- [ ] Renders correctly
- [ ] Touch interactions work
- [ ] PWA features available

### Firefox Mobile
- [ ] Layout is correct
- [ ] All features functional
- [ ] Acceptable performance

---

## PWA Testing

### Installation
- [ ] Install prompt appears after visit
- [ ] "Add to Home Screen" works
- [ ] App icon displays correctly
- [ ] Splash screen shows (if configured)

### Standalone Mode
- [ ] Opens without browser chrome
- [ ] Full-screen experience
- [ ] Navigation is intuitive
- [ ] Back button works as expected

### Offline Capability (Future)
- [ ] Service worker registered
- [ ] Critical assets cached
- [ ] Offline fallback page
- [ ] Sync when connection returns

---

## Accessibility on Mobile

### Touch Targets
- [ ] Minimum 44x44px for all interactive elements
- [ ] Adequate spacing between buttons
- [ ] No overlapping touch areas

### Text Readability
- [ ] Minimum 14px font size
- [ ] Good contrast ratios (WCAG AA)
- [ ] Line height allows easy reading
- [ ] No text requires horizontal scrolling

### Screen Reader Testing (if available)
- [ ] VoiceOver (iOS) reads content correctly
- [ ] TalkBack (Android) navigates properly
- [ ] Labels are descriptive
- [ ] Reading order makes sense

---

## Network Conditions Testing

### 4G Connection
- [ ] Loads in < 3 seconds
- [ ] All assets load
- [ ] Interactions are responsive

### 3G Connection
- [ ] Acceptable load time (< 5 seconds)
- [ ] Progressive loading works
- [ ] Core functionality available

### Slow 3G / Edge
- [ ] Eventually loads
- [ ] Loading indicators show
- [ ] Doesn't appear broken

### Offline
- [ ] Graceful error message (future)
- [ ] Cached version loads (if PWA)
- [ ] User understands the issue

---

## Real Device Testing Log

| Device | OS | Browser | Screen | Status | Notes |
|--------|-------|---------|--------|--------|-------|
| iPhone 14 Pro | iOS 17 | Safari | 390px | ⏳ | Not tested yet |
| iPhone SE | iOS 16 | Safari | 320px | ⏳ | Not tested yet |
| Pixel 7 | Android 13 | Chrome | 412px | ⏳ | Not tested yet |
| Samsung S21 | Android 12 | Samsung | 360px | ⏳ | Not tested yet |
| iPad | iPadOS 16 | Safari | 768px | ⏳ | Not tested yet |

**Legend:** ✅ Pass | ❌ Fail | ⚠️ Issues | ⏳ Pending

---

## Chrome DevTools Mobile Simulation

Quick test process:

1. **Open DevTools** - F12 or Cmd+Option+I (Mac)
2. **Toggle device toolbar** - Cmd+Shift+M (Mac) or Ctrl+Shift+M (Win/Linux)
3. **Select device** - Choose from preset or enter custom dimensions
4. **Rotate** - Toggle between portrait and landscape
5. **Throttle network** - Test with Fast 3G or Slow 3G
6. **Simulate touch** - Enable touch simulation

### Quick Test Sequence

```
1. iPhone SE (320x568) - Portrait
2. iPhone 14 Pro (390x844) - Portrait  
3. iPhone 14 Pro (844x390) - Landscape
4. Pixel 7 (412x915) - Portrait
5. iPad (768x1024) - Portrait
6. iPad (1024x768) - Landscape
7. Custom (375x667) - iPhone 8
```

For each:
- Check layout doesn't break
- Test touch interactions
- Verify all text is readable
- Ensure no horizontal scroll

---

## Common Mobile Issues & Fixes

### Issue: Text too small
**Fix**: Increase base font size in `index.css` for mobile breakpoint

### Issue: Buttons too close together
**Fix**: Increase gap in grid layouts, add more padding

### Issue: Sliders hard to drag
**Fix**: Increase slider height, add larger touch target

### Issue: Modal doesn't fit screen
**Fix**: Add max-height and scrolling, ensure padding

### Issue: Horizontal scroll appears
**Fix**: Find overflowing element, add `overflow-x-hidden` or fix width

### Issue: Tap delay
**Fix**: Already implemented `touch-action: manipulation` in CSS

### Issue: Zoom on input focus (iOS)
**Fix**: Ensure input font-size is at least 16px

---

## Mobile Optimization Checklist

### Performance
- [x] Lazy loading for off-screen components
- [x] Debounced slider interactions
- [x] Efficient re-renders (React.memo where needed)
- [x] Optimized SVG rendering
- [x] Minimal bundle size

### User Experience
- [x] Touch targets ≥ 44px
- [x] No hover-dependent functionality
- [x] Clear visual feedback on interactions
- [x] Smooth animations (60fps)
- [x] Error messages are helpful

### Layout
- [x] Mobile-first responsive design
- [x] Vertical stacking on narrow screens
- [x] No horizontal scrolling
- [x] Content fits within viewport
- [x] Proper spacing for touch

### Accessibility
- [x] Semantic HTML
- [x] ARIA labels where needed
- [x] Keyboard navigation (for devices with keyboard)
- [x] Color contrast meets WCAG AA
- [x] No color-only information

---

## Testing Script for Team

```bash
# 1. Start dev server with network access
npm run dev -- --host

# 2. Find your IP address
# Linux/Mac:
ip addr | grep "inet " | grep -v 127.0.0.1

# Windows:
ipconfig | findstr IPv4

# 3. Access from mobile device
# Open: http://YOUR_IP:3000
# Example: http://192.168.1.100:3000

# 4. Run through feature checklist above

# 5. Document any issues found
```

---

## Sign-Off Checklist

Before considering mobile testing complete:

- [ ] Tested on at least 2 physical iOS devices
- [ ] Tested on at least 2 physical Android devices
- [ ] Tested on at least 1 tablet
- [ ] All critical features work on 320px width
- [ ] All critical features work on 768px width
- [ ] PWA installs successfully on mobile
- [ ] Performance is acceptable on mid-range devices
- [ ] No critical accessibility issues
- [ ] Screenshots/video captured for documentation

---

## Automated Testing (Future Enhancement)

Consider adding:
- **Playwright**: End-to-end testing on mobile browsers
- **Lighthouse**: Performance, accessibility, PWA audits
- **BrowserStack**: Real device testing in cloud
- **Percy**: Visual regression testing

---

**Last Updated**: [Date]  
**Tested By**: [Name]  
**Device Used**: [Device info]
