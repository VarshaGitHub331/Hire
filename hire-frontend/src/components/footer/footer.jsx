import React from "react";
import "./footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            <span>Graphics & Design</span>
            <span>Digital Marketing</span>
            <span>Writing & Translation</span>
            <span>Video & Animation</span>
            <span>Music & Audio</span>
            <span>Programming & Tech</span>
            <span>Data</span>
            <span>Business</span>
            <span>Lifestyle</span>
            <span>Photography</span>
            <span>Sitemap</span>
          </div>
          <div className="item">
            <h2>About</h2>
            <span>Press & News</span>
            <span>Partnerships</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Intellectual Property Claims</span>
            <span>Investor Relations</span>
            <span>Contact Sales</span>
          </div>
          <div className="item">
            <h2>Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on Hire</span>
            <span>Buying on Hire</span>
          </div>
          <div className="item">
            <h2>Community</h2>
            <span>Customer Success Stories</span>
            <span>Community hub</span>
            <span>Forum</span>
            <span>Events</span>
            <span>Blog</span>
            <span>Influencers</span>
            <span>Affiliates</span>
            <span>Podcast</span>
            <span>Invite a Friend</span>
            <span>Become a Seller</span>
            <span>Community Standards</span>
          </div>
          <div className="item">
            <h2>More From Hire</h2>
            <span>Hire Business</span>
            <span>Hire Pro</span>
            <span>Hire Logo Maker</span>
            <span>Hire Guides</span>
            <span>Hire Inspired</span>
            <span>Hire Select</span>
            <span>ClearVoice</span>
            <span>Hire Workspace</span>
            <span>Learn</span>
            <span>Working Not Working</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>Hire.</h2>
            <span>©Hire International Ltd. 2023</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/assets/twitter(3).png" alt="" />
              <img src="/assets/facebook.png" alt="" />
              <img src="/assets/linkedin.png" alt="" />
              <img src="/assets/pinterest.png" alt="" />
              <img src="/assets/instagram.png" alt="" />
            </div>
            <div className="link">
              <img src="/assets/language.png" alt="" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="/assets/coin(1).png" alt="" />
              <span>USD</span>
            </div>
            <img src="/assets/accessibility.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
