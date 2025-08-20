import React from "react";

const Copyright = () => {
  // Inline style to hide on mobile screens
  const hideOnMobile = {
    display: "block",
  };

  // Check screen width
  if (window.innerWidth <= 767) {
    hideOnMobile.display = "none";
  }

  return (
    <>
      <div className="colorlib-footer" style={hideOnMobile}>
        <p>
          Copyright &copy; {new Date().getFullYear()} All rights reserved | This template is made with{" "}
          <i className="fa fa-heart" aria-hidden="true"></i> by{" "}
          <a
            href="https://manojrajgopal.github.io/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            InfiniteWaveX
          </a>
        </p>
        <ul>
          <li>
            <a href="#">
              <i className="fa fa-facebook"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-linkedin"></i>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Copyright;
