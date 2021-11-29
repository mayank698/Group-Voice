import { makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  bg: {
    background: ``,
  },
}));

const Price = () => {
  const styles = useStyles();

  return (
    <div>
      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center justify-content-between">
          <h1 className="logo">
            <Link to="/home">Group Voice</Link>
          </h1>

          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <Link to="/main/listpodcast">Podcasts</Link>
              </li>
              <li>
                <a className="nav-link scrollto" href="#services">
                  Services
                </a>
              </li>
              <li>
                <Link to="/pricing" className="nav-link">
                  Become a Premium Member
                </Link>
              </li>
              <li>
                <a className="nav-link scrollto" href="#team">
                  Team
                </a>
              </li>
              <li className="dropdown">
                <a href="#">
                  <span>Member</span> <i className="bi bi-chevron-down"></i>
                </a>
                <ul>
                  <li>
                    <Link to="main/register">New member ??</Link>
                  </li>
                  <li>
                    <Link to="/main/login">Already a member ??</Link>
                  </li>
                </ul>
              </li>
              <li>
                <a className="nav-link" href="/contact">
                  Contact
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#about">
                  Get Started
                </a>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>
      <div className="price-head">
        <section id="pricing" className="pricing">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2 className="text-white">Pricing</h2>
              <p className="text-white">Our plans.</p>
            </div>

            <div className="row">
              <div
                className="col-lg-3 col-md-6"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="box">
                  <h3>Free</h3>
                  <h4>
                    <sup>$</sup>0<span> / month</span>
                  </h4>
                  <ul>
                    <li>2 gb of online storage.</li>
                    <li>3 users at a time.</li>
                    <li>Help access</li>
                  </ul>
                  <div className="btn-wrap">
                    <a href="/user/checkout" className="btn-buy">
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6 mt-4 mt-md-0"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="box featured">
                  <h3>Business</h3>
                  <h4>
                    <sup>$</sup>19<span> / month</span>
                  </h4>
                  <ul>
                    <li>5 gb of storage</li>
                    <li>5 users at a time</li>
                    <li>Upload Podcasts</li>
                    <li>Help access</li>
                  </ul>
                  <div className="btn-wrap">
                    <a href="/user/checkout" className="btn-buy">
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6 mt-4 mt-lg-0"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="box">
                  <h3>Developer</h3>
                  <h4>
                    <sup>$</sup>29<span> / month</span>
                  </h4>
                  <ul>
                    <li>10 gb of storage</li>
                    <li>7 members at a time</li>
                    <li>Recording tool</li>
                    <li>Help access</li>
                  </ul>
                  <div className="btn-wrap">
                    <a href="/user/checkout" className="btn-buy">
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6 mt-4 mt-lg-0"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="box">
                  <span className="advanced">Advanced</span>
                  <h3>Ultimate</h3>
                  <h4>
                    <sup>$</sup>49<span> / month</span>
                  </h4>
                  <ul>
                    <li>15 gb of storage</li>
                    <li>10 members at a time</li>
                    <li>Upload Podcasts</li>
                    <li>Recording tool </li>
                    <li>Help access</li>
                  </ul>
                  <div className="btn-wrap">
                    <a href="/user/checkout" className="btn-buy">
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Price;
