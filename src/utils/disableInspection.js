// File: utils/disableInspection.js

export function disableInspection() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Disable right-click
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    document.onkeydown = function(e) {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || // Ctrl+Shift+I or Ctrl+Shift+J
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Disable developer tools
    function disableDevTools() {
      if (
        window.outerWidth - window.innerWidth > 160 ||
        window.outerHeight - window.innerHeight > 160
      ) {
        // Assumed developer tools are open
        document.body.innerHTML = 'Developer tools are not allowed on this site.';
      }
    }

    setInterval(disableDevTools, 1000);
  }
}