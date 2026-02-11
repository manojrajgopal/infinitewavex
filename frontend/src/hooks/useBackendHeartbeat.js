import { useEffect } from 'react';

// Custom hook to call backend every 5 minutes when frontend is open
// Uses keepalive to ensure the request is sent even if the page is closing
function useBackendHeartbeat(backendUrl, intervalMs = 300000) { // 5 minutes = 300000ms
  
  useEffect(() => {
    // Make the initial call immediately
    makeHeartbeatCall(backendUrl);
    
    // Set up the interval
    const intervalId = setInterval(() => {
      makeHeartbeatCall(backendUrl);
    }, intervalMs);
    
    // Cleanup: clear interval when component unmounts (tab is closed)
    return () => {
      clearInterval(intervalId);
    };
  }, [backendUrl, intervalMs]);
}

// Fire-and-forget function to call backend
function makeHeartbeatCall(backendUrl) {
  if (!backendUrl) return;
  
  // Create a fetch request with keepalive to ensure it completes even during page unload
  // Using keepalive: true and a small fetch to avoid CORS issues
  const url = `${backendUrl}/api/health` || `${backendUrl}/`;
  
  fetch(url, {
    method: 'GET',
    keepalive: true,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(() => {
    // Silent success - no logging to avoid console clutter
  })
  .catch(() => {
    // Silent error - don't disturb the main frontend
    // The call was attempted, which is what matters
  });
}

export default useBackendHeartbeat;
