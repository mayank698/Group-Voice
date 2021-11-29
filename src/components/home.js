import React from "react";
import {
  SocialLink,
  SocialProvider,
} from "@mui-treasury/components/socialLink";
import { useRoundSocialLinkStyles } from "@mui-treasury/styles/socialLink/round";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Home = () => {
  const [open, setOpen] = useState(false);
  const CustomLink = (to) =>
    React.useMemo(
      () =>
        React.forwardRef((linkProps, ref) => (
          <Link ref={ref} to={to} {...linkProps} />
        )),
      [to]
    );
  let { path, url } = useRouteMatch();
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
                <Link to="/contact">Contact</Link>
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

      <section id="hero" className="d-flex align-items-center">
        <div className="container-fluid" data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-6 pt-3 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1>Best Podcast Experience with Group Voice</h1>
              <h2>We are a team of talented designers.</h2>
              <div>
                <Link
                  className="btn-get-started scrollto"
                  to="/main/listpodcast"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-6 order-1 order-lg-2 hero-img"
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              <img
                src="assets/img/hero-img.png"
                className="img-fluid animated"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <main id="main">
        <section id="about" className="about">
          <div className="container">
            <div className="row">
              <div
                className="col-lg-6 order-1 order-lg-2"
                data-aos="zoom-in"
                data-aos-delay="150"
              >
                <img src="assets/img/about.jpg" className="img-fluid" alt="" />
              </div>
              <div
                className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content"
                data-aos="fade-right"
              >
                <h3>Features of our Group Voice</h3>
                <p className="fst-italic">
                  Get latest and popular podcast at low cost.
                </p>
                <ul>
                  <li>
                    <i className="bi bi-check-circle"></i> Listen to our
                    podcasts in group with friends from all over India.
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i> Upload your podcast
                    at very low and affordable cost.
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i>Download and listen
                    best and popular podcasts.
                  </li>
                </ul>
                <a href="#" className="read-more">
                  Read More <i className="bi bi-long-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="services section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Services</h2>
              <p>Get additional services by purchasing our pack.</p>
            </div>

            <div className="row gy-4">
              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className="icon-box iconbox-blue">
                  <div className="icon">
                    <svg
                      width="100"
                      height="100"
                      viewBox="0 0 600 600"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke="none"
                        strokeWidth="0"
                        fill="#f5f5f5"
                        d="M300,521.0016835830174C376.1290562159157,517.8887921683347,466.0731472004068,529.7835943286574,510.70327084640275,468.03025145048787C554.3714126377745,407.6079735673963,508.03601936045806,328.9844924480964,491.2728898941984,256.3432110539036C474.5976632858925,184.082847569629,479.9380746630129,96.60480741107993,416.23090153303,58.64404602377083C348.86323505073057,18.502131276798302,261.93793281208167,40.57373210992963,193.5410806939664,78.93577620505333C130.42746243093433,114.334589627462,98.30271207620316,179.96522072025542,76.75703585869454,249.04625023123273C51.97151888228291,328.5150500222984,13.704378332031375,421.85034740162234,66.52175969318436,486.19268352777647C119.04800174914682,550.1803526380478,217.28368757567262,524.383925680826,300,521.0016835830174"
                      ></path>
                    </svg>
                    <i className="bx bxl-dribbble"></i>
                  </div>
                  <h4>
                    <a href="">Unlimited Download</a>
                  </h4>
                  <p>
                    Download your favourite podcasts and create a offline
                    playlist.
                  </p>
                </div>
              </div>

              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="icon-box iconbox-orange ">
                  <div className="icon">
                    <svg
                      width="100"
                      height="100"
                      viewBox="0 0 600 600"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke="none"
                        strokeWidth="0"
                        fill="#f5f5f5"
                        d="M300,582.0697525312426C382.5290701553225,586.8405444964366,449.9789794690241,525.3245884688669,502.5850820975895,461.55621195738473C556.606425686781,396.0723002908107,615.8543463187945,314.28637112970534,586.6730223649479,234.56875336149918C558.9533121215079,158.8439757836574,454.9685369536778,164.00468322053177,381.49747125262974,130.76875717737553C312.15926192815925,99.40240125094834,248.97055460311594,18.661163978235184,179.8680185752513,50.54337015887873C110.5421016452524,82.52863877960104,119.82277516462835,180.83849132639028,109.12597500060166,256.43424936330496C100.08760227029461,320.3096726198365,92.17705696193138,384.0621239912766,124.79988738764834,439.7174275375508C164.83382741302287,508.01625554203684,220.96474134820875,577.5009287672846,300,582.0697525312426"
                      ></path>
                    </svg>
                    <i className="bx bx-file"></i>
                  </div>
                  <h4>
                    <a href="">Upload your own podcast</a>
                  </h4>
                  <p>
                    Get some extra features and upload your podcast to get
                    popularity.
                  </p>
                </div>
              </div>

              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <div className="icon-box iconbox-pink">
                  <div className="icon">
                    <svg
                      width="100"
                      height="100"
                      viewBox="0 0 600 600"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke="none"
                        strokeWidth="0"
                        fill="#f5f5f5"
                        d="M300,541.5067337569781C382.14930387511276,545.0595476570109,479.8736841581634,548.3450877840088,526.4010558755058,480.5488172755941C571.5218469581645,414.80211281144784,517.5187510058486,332.0715597781072,496.52539010469104,255.14436215662573C477.37192572678356,184.95920475031193,473.57363656557914,105.61284051026155,413.0603344069578,65.22779650032875C343.27470386102294,18.654635553484475,251.2091493199835,5.337323636656869,175.0934190732945,40.62881213300186C97.87086631185822,76.43348514350839,51.98124368387456,156.15599469081315,36.44837278890362,239.84606092416172C21.716077023791087,319.22268207091537,43.775223500013084,401.1760424656574,96.891909868211,461.97329694683043C147.22146801428983,519.5804099606455,223.5754009179313,538.201503339737,300,541.5067337569781"
                      ></path>
                    </svg>
                    <i className="bx bx-tachometer"></i>
                  </div>
                  <h4>
                    <a href="">Third Party tools</a>
                  </h4>
                  <p>
                    Doesn't require any extra tool for recording it's inbuilt in
                    our podcasts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Features</h2>
              <p>Enjoy the best podcast from all over the world.</p>
            </div>

            <div className="row">
              <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column align-items-lg-center">
                <div
                  className="icon-box mt-5 mt-lg-0"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <i className="bx bx-receipt"></i>
                  <h4>Minimal cost.</h4>
                  <p>
                    Get best features at affordable price and become a permanent
                    member.
                  </p>
                </div>
                <div
                  className="icon-box mt-5"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <i className="bx bx-cube-alt"></i>
                  <h4>Third party tools</h4>
                  <p>
                    No requirements of third party tools for downloading and
                    recording.
                  </p>
                </div>
                <div
                  className="icon-box mt-5"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <i className="bx bx-images"></i>
                  <h4>Upload Podcast</h4>
                  <p>
                    Upload your podcast to let everyone know about it and to
                    earn some rewards.
                  </p>
                </div>
                <div
                  className="icon-box mt-5"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <i className="bx bx-shield"></i>
                  <h4>Download</h4>
                  <p>
                    Download your favourite podcasts and get them offline and
                    create your playlist.
                  </p>
                </div>
              </div>
              <div
                className="image col-lg-6 order-1 order-lg-2 "
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <img
                  src="assets/img/features.svg"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="portfolio">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Portfolio</h2>
              <p>
                Magnam dolores commodi suscipit. Necessitatibus eius consequatur
                ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam
                quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.
                Quia fugiat sit in iste officiis commodi quidem hic quas.
              </p>
            </div>

            <div className="row">
              <div className="col-lg-12 d-flex justify-content-center">
                <ul id="portfolio-flters">
                  <li data-filter="*" className="filter-active">
                    All
                  </li>
                  <li data-filter=".filter-app">App</li>
                  <li data-filter=".filter-card">Card</li>
                  <li data-filter=".filter-web">Web</li>
                </ul>
              </div>
            </div>

            <div className="row portfolio-container">
              <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                <div className="portfolio-wrap">
                  <img
                    src="assets/img/portfolio/portfolio-1.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="portfolio-info">
                    <h4>App 1</h4>
                    <p>App</p>
                  </div>
                  <div className="portfolio-links">
                    <a
                      href="assets/img/portfolio/portfolio-1.jpg"
                      data-gallery="portfolioGallery"
                      className="portfolio-lightbox"
                      title="App 1"
                    >
                      <i className="bx bx-plus"></i>
                    </a>
                    <a href="portfolio-details.html" title="More Details">
                      <i className="bx bx-link"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                <div className="portfolio-wrap">
                  <img
                    src="assets/img/portfolio/portfolio-2.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="portfolio-info">
                    <h4>Web 3</h4>
                    <p>Web</p>
                  </div>
                  <div className="portfolio-links">
                    <a
                      href="assets/img/portfolio/portfolio-2.jpg"
                      data-gallery="portfolioGallery"
                      className="portfolio-lightbox"
                      title="Web 3"
                    >
                      <i className="bx bx-plus"></i>
                    </a>
                    <a href="portfolio-details.html" title="More Details">
                      <i className="bx bx-link"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                <div className="portfolio-wrap">
                  <img
                    src="assets/img/portfolio/portfolio-3.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="portfolio-info">
                    <h4>App 2</h4>
                    <p>App</p>
                  </div>
                  <div className="portfolio-links">
                    <a
                      href="assets/img/portfolio/portfolio-3.jpg"
                      data-gallery="portfolioGallery"
                      className="portfolio-lightbox"
                      title="App 2"
                    >
                      <i className="bx bx-plus"></i>
                    </a>
                    <a href="portfolio-details.html" title="More Details">
                      <i className="bx bx-link"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                <div className="portfolio-wrap">
                  <img
                    src="assets/img/portfolio/portfolio-4.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="portfolio-info">
                    <h4>Card 2</h4>
                    <p>Card</p>
                  </div>
                  <div className="portfolio-links">
                    <a
                      href="assets/img/portfolio/portfolio-4.jpg"
                      data-gallery="portfolioGallery"
                      className="portfolio-lightbox"
                      title="Card 2"
                    >
                      <i className="bx bx-plus"></i>
                    </a>
                    <a href="portfolio-details.html" title="More Details">
                      <i className="bx bx-link"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                <div className="portfolio-wrap">
                  <img
                    src="assets/img/portfolio/portfolio-5.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="portfolio-info">
                    <h4>Web 2</h4>
                    <p>Web</p>
                  </div>
                  <div className="portfolio-links">
                    <a
                      href="assets/img/portfolio/portfolio-5.jpg"
                      data-gallery="portfolioGallery"
                      className="portfolio-lightbox"
                      title="Web 2"
                    >
                      <i className="bx bx-plus"></i>
                    </a>
                    <a href="portfolio-details.html" title="More Details">
                      <i className="bx bx-link"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                <div className="portfolio-wrap">
                  <img
                    src="assets/img/portfolio/portfolio-6.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="portfolio-info">
                    <h4>App 3</h4>
                    <p>App</p>
                  </div>
                  <div className="portfolio-links">
                    <a
                      href="assets/img/portfolio/portfolio-6.jpg"
                      data-gallery="portfolioGallery"
                      className="portfolio-lightbox"
                      title="App 3"
                    >
                      <i className="bx bx-plus"></i>
                    </a>
                    <a href="portfolio-details.html" title="More Details">
                      <i className="bx bx-link"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                <div className="portfolio-wrap">
                  <img
                    src="assets/img/portfolio/portfolio-7.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="portfolio-info">
                    <h4>Card 1</h4>
                    <p>Card</p>
                  </div>
                  <div className="portfolio-links">
                    <a
                      href="assets/img/portfolio/portfolio-7.jpg"
                      data-gallery="portfolioGallery"
                      className="portfolio-lightbox"
                      title="Card 1"
                    >
                      <i className="bx bx-plus"></i>
                    </a>
                    <a href="portfolio-details.html" title="More Details">
                      <i className="bx bx-link"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                <div className="portfolio-wrap">
                  <img
                    src="assets/img/portfolio/portfolio-8.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="portfolio-info">
                    <h4>Card 3</h4>
                    <p>Card</p>
                  </div>
                  <div className="portfolio-links">
                    <a
                      href="assets/img/portfolio/portfolio-8.jpg"
                      data-gallery="portfolioGallery"
                      className="portfolio-lightbox"
                      title="Card 3"
                    >
                      <i className="bx bx-plus"></i>
                    </a>
                    <a href="portfolio-details.html" title="More Details">
                      <i className="bx bx-link"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                <div className="portfolio-wrap">
                  <img
                    src="assets/img/portfolio/portfolio-9.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="portfolio-info">
                    <h4>Web 3</h4>
                    <p>Web</p>
                  </div>
                  <div className="portfolio-links">
                    <a
                      href="assets/img/portfolio/portfolio-9.jpg"
                      data-gallery="portfolioGallery"
                      className="portfolio-lightbox"
                      title="Web 3"
                    >
                      <i className="bx bx-plus"></i>
                    </a>
                    <a href="portfolio-details.html" title="More Details">
                      <i className="bx bx-link"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="faq">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Frequently Asked Questions</h2>
              <p>Frequently asked Questions with group voice.</p>
            </div>

            <div className="faq-list">
              <ul>
                <li data-aos="fade-up" data-aos="fade-up" data-aos-delay="100">
                  <i className="bx bx-help-circle icon-help"></i>{" "}
                  <a
                    data-bs-toggle="collapse"
                    className="collapse"
                    data-bs-target="#faq-list-1"
                  >
                    Do group voice supports online recording ?{" "}
                    <i className="bx bx-chevron-down icon-show"></i>
                    <i className="bx bx-chevron-up icon-close"></i>
                  </a>
                  <div
                    id="faq-list-1"
                    className="collapse show"
                    data-bs-parent=".faq-list"
                  >
                    <p>
                      Yes group voice supports online recording it has inbuilt
                      tools.
                    </p>
                  </div>
                </li>

                <li data-aos="fade-up" data-aos-delay="200">
                  <i className="bx bx-help-circle icon-help"></i>{" "}
                  <a
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-list-2"
                    className="collapsed"
                  >
                    Do users can upload their podcasts?{" "}
                    <i className="bx bx-chevron-down icon-show"></i>
                    <i className="bx bx-chevron-up icon-close"></i>
                  </a>
                  <div
                    id="faq-list-2"
                    className="collapse"
                    data-bs-parent=".faq-list"
                  >
                    <p>Yes users can upload podcasts on Group Voice.</p>
                  </div>
                </li>

                <li data-aos="fade-up" data-aos-delay="300">
                  <i className="bx bx-help-circle icon-help"></i>{" "}
                  <a
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-list-3"
                    className="collapsed"
                  >
                    Do group voice requires any third party app?{" "}
                    <i className="bx bx-chevron-down icon-show"></i>
                    <i className="bx bx-chevron-up icon-close"></i>
                  </a>
                  <div
                    id="faq-list-3"
                    className="collapse"
                    data-bs-parent=".faq-list"
                  >
                    <p>
                      No, group voice already has inbuilt tools for recording
                      creating playlist and for uploading.
                    </p>
                  </div>
                </li>

                <li data-aos="fade-up" data-aos-delay="400">
                  <i className="bx bx-help-circle icon-help"></i>{" "}
                  <a
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-list-4"
                    className="collapsed"
                  >
                    Do group voice supports group recording?{" "}
                    <i className="bx bx-chevron-down icon-show"></i>
                    <i className="bx bx-chevron-up icon-close"></i>
                  </a>
                  <div
                    id="faq-list-4"
                    className="collapse"
                    data-bs-parent=".faq-list"
                  >
                    <p>
                      Yes, in group voice you can listen to your favourite
                      podcasts with your friends living at distant from you and
                      can record the podcast in group.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 footer-contact">
                <h3>Group Voice </h3>
                <p>
                  Faizabad road <br />
                  Lucknow
                  <br />
                  India <br />
                  <br />
                  <strong>Phone:</strong> +91 93058 88865
                  <br />
                  <strong>Email:</strong> mpandeymp0@gmail.com
                  <br />
                </p>
              </div>

              <div className="col-lg-2 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#about" className="nav-link scroll to">
                      Home
                    </a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                    <Link to="/contact">Contact us</Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                    <a href="#services" className="nav-link scroll to">
                      Services
                    </a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                    <a href="#">Terms of service</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                    <a href="#">Privacy policy</a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                    <a href="#">Web Design</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                    <a href="#">Web Development</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">Product Management</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">Marketing</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">Graphic Design</a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-4 col-md-6 footer-newsletter">
                <h4>Join Our Family</h4>
                <p>Enter your email and Subscribe to our podcast.</p>
                <form action="" method="post">
                  <input type="email" name="email" />
                  <input type="submit" value="Subscribe" />
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="copyright-wrap d-md-flex py-4">
            <div className="me-md-auto text-center text-md-start">
              <div className="copyright">
                &copy; Copyright{" "}
                <strong>
                  <span>Group Voice</span>
                </strong>
                . All Rights Reserved
              </div>
              <div className="credits">
                Designed by <a href="https://bootstrapmade.com/">Our Team</a>
              </div>
            </div>
            <div className="social-links text-center text-md-right pt-3 pt-md-0">
              <SocialProvider useStyles={useRoundSocialLinkStyles}>
                <SocialLink brand={"Facebook"} href={" "} />
                <SocialLink brand={"Twitter"} href={" "} />
                <SocialLink brand={"Instagram"} href={""} />
                <SocialLink brand={"LinkedIn"} href={" "} />
                <SocialLink
                  brand={"GithubCircle"}
                  href={"https://github.com/mayank698/Group-Voice"}
                />
              </SocialProvider>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
