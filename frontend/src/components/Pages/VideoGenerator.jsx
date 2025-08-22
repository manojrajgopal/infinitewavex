import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const VideoGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [numFrames, setNumFrames] = useState(16);
  const [videoId, setVideoId] = useState(null);
  const [status, setStatus] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);

  const handleGenerate = async () => {
    setStatus("sending request...");
    setVideoId(null);
    setVideoUrl(null);

    try {
      const res = await axios.post(`${BACKEND_URL}/api/video/generate`, {
        prompt,
        num_frames: numFrames
      });
      setVideoId(res.data.video_id);
      setStatus("processing...");
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  };

  useEffect(() => {
    if (!videoId) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/video/status/${videoId}`);
        setStatus(res.data.status);

        if (res.data.status !== "processing") {
          setVideoUrl(`${BACKEND_URL}/api/video/download/${videoId}`);
          clearInterval(interval);
        }
      } catch (err) {
        setStatus("Error checking status: " + err.message);
        clearInterval(interval);
      }
    }, 5000); // poll every 5 seconds

    return () => clearInterval(interval);
  }, [videoId]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Video Generator</h2>
      <textarea
        placeholder="Enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        cols={50}
      />
      <br />
      <input
        type="number"
        min="1"
        value={numFrames}
        onChange={(e) => setNumFrames(parseInt(e.target.value))}
      />
      <button onClick={handleGenerate}>Generate Video</button>

      <p>Status: {status}</p>

      {videoUrl && (
        <div>
          <h3>Video Preview</h3>
          <video src={videoUrl} controls width="480" />
          <br />
          <a href={videoUrl} download>
            Download Video
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoGenerator;
