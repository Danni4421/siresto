import { useEffect, useRef, useState } from 'react';
import { Link, animateScroll } from 'react-scroll';
import { getMenu } from '../../api/menu';
import { getReviews } from '../../api/reviews';
import { Bar } from '../../Components/Navbar/Bar';
import CreamButton from '../../Components/Button/CreamButton';
import ChefImage from '../../assets/img/chef.png';
import PopularMenuCard from '../../Components/Card/menu/PopularMenuCard';
import { UserReview } from '../../Components/Card/reviews/UserReview';

import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialTwitter,
} from 'react-icons/ti';

export const Home = () => {
  const [menu, setMenu] = useState([]);
  const [userReview, setUserReview] = useState([]);
  const [activeNav, setActiveNav] = useState('home');
  const scroll = useRef(0);

  useEffect(() => {
    getMenu().then((response) => {
      setMenu(response.menu);
    });

    getReviews().then((response) => {
      setUserReview(response.reviews);
    });

    const handlerScroll = () => {
      scroll.current = window.scrollY;

      if (scroll.current < 384) {
        setActiveNav('home');
      } else if (scroll.current >= 384 && scroll.current < 1020) {
        setActiveNav('popular-menu');
      } else if (scroll.current === 1020) {
        setActiveNav('user-reviews');
      }
    };

    window.addEventListener('scroll', handlerScroll);

    return () => {
      window.removeEventListener('scroll', handlerScroll);
    };
  }, []);

  const GetListMenu = () => {
    return menu.map((m) => {
      return <PopularMenuCard key={m.id} menu={m} />;
    });
  };

  const GetUserReviews = () => {
    return userReview.map((r) => {
      return <UserReview key={r.id} review={r} />;
    });
  };

  return (
    <div className="bg-background">
      <div className="bg-dark-green" id="home">
        {/* NAVBAR */}
        <Bar>
          <nav>
            <ul className="navbar flex justify-evenly item-center">
              <li className={activeNav === 'home' ? 'nav-active' : ''}>
                <Link
                  activeClass="active"
                  to=""
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  onClick={() => animateScroll.scrollToTop()}
                >
                  Home
                </Link>
              </li>
              <li className={activeNav === 'popular-menu' ? 'nav-active' : ''}>
                <Link
                  activeClass="active"
                  to=""
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  onClick={() => animateScroll.scrollTo(384)}
                >
                  Popular Menu
                </Link>
              </li>
              <li className={activeNav === 'user-reviews' ? 'nav-active' : ''}>
                <Link
                  activeClass="active"
                  to=""
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  onClick={() => {
                    setActiveNav('user-reviews');
                    animateScroll.scrollTo(1020);
                  }}
                >
                  Reviews
                </Link>
              </li>
              <li className={activeNav === 'about' ? 'nav-active' : ''}>
                <Link
                  activeClass="active"
                  to=""
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={1000}
                  onClick={() => {
                    setActiveNav('about');
                    animateScroll.scrollToBottom();
                  }}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </Bar>
        {/* CLOSE NAVBAR */}

        {/* MOTTO */}
        <div className="w-full h-[200px] flex justify-center mt-24">
          <div className="motto w-1/2 text-xl text-center text-cream mt-10">
            <q>Elevate your dining moments with Sirestos</q>
            <h4>Feel like in reastaurant just in one click</h4>
            <CreamButton>
              <a href="/menu">Explore</a>
            </CreamButton>
          </div>
          <img
            src={ChefImage}
            alt=""
            className="h-[350px] mt-[-65px] ml-[-150px] overflow-auto"
          />
        </div>
        <svg
          className="mt-[-90px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#f3f4f5"
            fillOpacity="1"
            d="M0,128L48,128C96,128,192,128,288,138.7C384,149,480,171,576,176C672,181,768,171,864,154.7C960,139,1056,117,1152,112C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        {/* CLOSE MOTTO */}
      </div>

      {/* POPULAR MENU */}
      <div
        className="flex-col gap-10 mt-[-80px] p-10 justify-center items-center text-center"
        id="popular-menu"
      >
        <h2 className="logo p-10 text-4xl text-dark-green font-bold">
          Popular Menu`s
        </h2>
        <div className="list-menu flex flex-wrap gap-10 justify-center">
          <GetListMenu />
        </div>
        <a
          href="/menu"
          className="menu-expand ease-in-out duration-1000 border-none hover:border-solid border-b-2 pb-1 border-dark-green"
        >
          Expand Menu
        </a>
      </div>
      {/* CLOSE POPULAR MENU */}

      {/* USER REVIEW */}
      <h2
        id="reviews"
        className="logo p-10 mt-10 text-4xl text-center text-dark-green font-bold"
      >
        User Review`s
      </h2>
      <div className="flex flex-wrap justify-center mb-10 gap-10">
        <GetUserReviews />
      </div>
      {/* CLOSE USER REVIEW */}

      {/* FOOTER */}
      <div className="footer" id="footer">
        <svg
          className="xl:mb-[-280px] z-10 lg:mb-[-220px] md:mb-[-170px] sm:mb-[-140px] min-[320px]:mb-[-90px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#f3f4f5"
            fillOpacity="1"
            d="M0,96L48,101.3C96,107,192,117,288,133.3C384,149,480,171,576,154.7C672,139,768,85,864,69.3C960,53,1056,75,1152,85.3C1248,96,1344,96,1392,96L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
        <div className="bg-dark-green w-full h-96 pt-40 px-20 flex justify-between">
          <div className="contact text-cream">
            <h1 className="logo text-5xl">Siresto</h1>
            <div className="mx-3 mt-3">
              <h4>Contact Us: </h4>
              <ul>
                <li>Address: 123 Main Street, Cityville, Country</li>
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@siresto.com</li>
                <li>Working Hours: Mon-Sun, 10 AM - 10 PM (GMT)</li>
              </ul>
            </div>
          </div>

          <div className="about w-80 text-cream text-right" id="about">
            <h1 className="logo text-5xl">About</h1>
            <p className="mt-3">
              Stay connected with us on social media for the latest updates,
              mouthwatering food photos, and exclusive promotions.
            </p>
            <div className="flex justify-end mt-2 gap-5 text-4xl">
              <a href="#">
                <TiSocialInstagram />
              </a>
              <a href="#">
                <TiSocialFacebook />
              </a>
              <a href="#">
                <TiSocialTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* CLOSE FOOTER */}
    </div>
  );
};
