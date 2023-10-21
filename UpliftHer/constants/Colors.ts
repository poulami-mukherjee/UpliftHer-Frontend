const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';
export const mainColor = "#3498db";
export const secondaryColor = "rgb(255, 140, 0)";
export const headerBackground = mainColor;
export const contentBackground = "#f9f9f9";

export const AlertColor = {
  success: '#28a745', // Green color for success messages
  error: '#dc3545',   // Red color for error messages
  warning: '#ffc107', // Yellow color for warning messages
  info: '#17a2b8',    // Blue color for informational messages
};

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  }
};
