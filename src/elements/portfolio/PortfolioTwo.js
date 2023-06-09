import React, { useState, useEffect } from "react";
import PortfolioTwoItem from "./PortfolioTwoItem";
import { FaSpinner } from "react-icons/fa";
import ScrollAnimation from "react-animate-on-scroll";
import PortfolioData from "../../data/portfolio/PortfolioData.json";
import EducationInfo from "../../data/education.json";
import SponsorsInfo from "../../data/sponsors.json";
import filters from "../../data/stack.json";

const alldata = SponsorsInfo;
const PortfolioTwo = ({ Column }) => {
  const [getAllItems] = useState(alldata);
  const [dataVisibleCount, setDataVisibleCount] = useState(8);
  const [dataIncrement] = useState(4);
  const [noMorePost, setNoMorePost] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");
  const [visibleItems, setVisibleItems] = useState([]);
  useEffect(() => {
    setActiveFilter(filters[0].text.toLowerCase());
    setVisibleItems(getAllItems.filter((item) => item.id <= dataVisibleCount));
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setActiveFilter(e.target.textContent.toLowerCase());
    let tempData;
    if (e.target.textContent.toLowerCase() === filters[0].text.toLowerCase()) {
      tempData = getAllItems.filter((data) => data.id <= dataVisibleCount);
    } else {
      tempData = getAllItems.filter(
        (data) => data.stack === e.target.textContent.toLowerCase()
      );
    }
    setVisibleItems(tempData.slice(0, dataVisibleCount));
  };

  const handleLoadmore = (e) => {
    e.preventDefault();
    let tempCount = dataVisibleCount + dataIncrement;
    if (dataVisibleCount >= getAllItems.length) {
      setNoMorePost(true);
    } else {
      setDataVisibleCount(tempCount);
      if (activeFilter === filters[0].text.toLowerCase()) {
        setVisibleItems(getAllItems.filter((data) => data.id <= tempCount));
      } else {
        setVisibleItems(
          getAllItems.filter(
            (data) => data.stack === activeFilter && data.id <= tempCount
          )
        );
      }
    }
  };

  return (
    <ScrollAnimation
      animateIn="fadeInUp"
      animateOut="fadeInOut"
      delay={200}
      animateOnce={true}
    >
      <div className="row row--15">
        {visibleItems.map((item) => (
          <div key={item.id} className={Column}>
            <PortfolioTwoItem portfolio={item} />
          </div>
        ))}
      </div>

      {/* <div className="row row--15">
        <div className="col-lg-12">
          <div className="rwt-load-more text-center mt--50">
            <button
              className="btn btn-default btn-large btn-icon"
              onClick={handleLoadmore}
              disabled={noMorePost ? "disabled" : null}
            >
              {noMorePost ? (
                "No More"
              ) : (
                <span>
                  See More
                  <span className="icon">
                    <FaSpinner />
                  </span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div> */}
    </ScrollAnimation>
  );
};

export default PortfolioTwo;
