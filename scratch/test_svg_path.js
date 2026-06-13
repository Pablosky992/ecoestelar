// Mathematically simulate the SVG path filling for M 60 12 A 48 48 0 0 0 60 108 A 33.6 48 0 0 1 60 12
// and print it as ASCII art.

const R = 48;
const rx = 33.6;
const ry = 48;
const cx = 60;
const cy = 60;

function printMoon(sweepOuter, sweepInner) {
  console.log(`\n--- Moon Phase Simulation (sweepOuter = ${sweepOuter}, sweepInner = ${sweepInner}) ---`);
  
  // Grid of 40x20 to show shape
  for (let y = 12; y <= 108; y += 4.8) {
    let line = "";
    for (let x = 12; x <= 108; x += 2.4) {
      // Check if point is inside the moon circle
      const dx = x - cx;
      const dy = y - cy;
      if (dx*dx + dy*dy > R*R) {
        line += " ";
        continue;
      }
      
      // Now check if it is inside the illuminated path.
      // Arc 1 (outer): from (60,12) to (60,108)
      // sweepOuter = 0: left semi-circle (x <= 60)
      // sweepOuter = 1: right semi-circle (x >= 60)
      const inOuter = (sweepOuter === 0) ? (x <= cx) : (x >= cx);
      
      // Arc 2 (inner): from (60,108) to (60,12)
      // rx = 33.6, ry = 48
      // Equation of inner ellipse boundary: dx^2 / rx^2 + dy^2 / ry^2 = 1
      // At y, the boundary x is: cx - rx * sqrt(1 - dy^2 / ry^2) (left) or cx + rx * sqrt(1 - dy^2 / ry^2) (right)
      const innerLimit = rx * Math.sqrt(Math.max(0, 1 - (dy*dy) / (ry*ry)));
      
      // sweepInner = 1 (clockwise, left side of chord) -> boundary is x = cx - innerLimit
      // sweepInner = 0 (counter-clockwise, right side of chord) -> boundary is x = cx + innerLimit
      const boundaryX = (sweepInner === 1) ? (cx - innerLimit) : (cx + innerLimit);
      
      // Let's determine if the point is inside the path:
      let inside = false;
      
      if (sweepOuter === 0) {
        // Outer arc is on the left (x <= cx).
        if (sweepInner === 1) {
          // Inner arc is on the left (boundaryX = cx - innerLimit).
          // Path goes from (60,12) left/down to (60,108) and then left/up to (60,12).
          // So x must be between the outer boundary (cx - R_limit) and the inner boundary (cx - innerLimit).
          const outerLimit = R * Math.sqrt(Math.max(0, 1 - (dy*dy) / (R*R)));
          inside = (x >= cx - outerLimit && x <= boundaryX);
        } else {
          // Inner arc is on the right (boundaryX = cx + innerLimit).
          // Path goes from (60,12) left/down to (60,108) and then right/up to (60,12).
          // So x must be between the outer left boundary (cx - outerLimit) and the inner right boundary (cx + innerLimit).
          const outerLimit = R * Math.sqrt(Math.max(0, 1 - (dy*dy) / (R*R)));
          inside = (x >= cx - outerLimit && x <= boundaryX);
        }
      } else {
        // Outer arc is on the right (x >= cx).
        if (sweepInner === 0) {
          // Inner arc is on the right (boundaryX = cx + innerLimit).
          // Path goes from (60,12) right/down to (60,108) and then right/up to (60,12).
          // So x must be between the inner right boundary (cx + innerLimit) and the outer right boundary (cx + outerLimit).
          const outerLimit = R * Math.sqrt(Math.max(0, 1 - (dy*dy) / (R*R)));
          inside = (x >= boundaryX && x <= cx + outerLimit);
        } else {
          // Inner arc is on the left (boundaryX = cx - innerLimit).
          // Path goes from (60,12) right/down to (60,108) and then left/up to (60,12).
          // So x must be between the inner left boundary (cx - innerLimit) and the outer right boundary (cx + outerLimit).
          const outerLimit = R * Math.sqrt(Math.max(0, 1 - (dy*dy) / (R*R)));
          inside = (x >= boundaryX && x <= cx + outerLimit);
        }
      }
      
      line += inside ? "#" : ".";
    }
    console.log(line);
  }
}

// Print all four cases
printMoon(0, 1); // Waning crescent (North)
printMoon(0, 0); // Waning gibbous (North)
printMoon(1, 0); // Waxing crescent (North)
printMoon(1, 1); // Waxing gibbous (North)
