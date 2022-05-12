import React, { useEffect, useState, useContext } from "react";
import "../css/main.css";
import "../css/scroll.css";

import "../css/gay.css";
import "../css/media.css";
import { nav, videos, articals, links, trend_topic } from "./data";
import useSound from "use-sound";
import mySound from "./../back_sound/sound1.mp3"; // Your sound file path here
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsLeftRight,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";

var id = new Date();

/*==========================================================*/

/*==========================================================*/
/*==========================================================*/
/*==========================================================*/

let pos = 900;

const css = (e, styles, ...l) => {
  setTimeout(() => {
    for (let i = 0; i < e.length; i++) {
      let d = $(e[i]);
      for (const property in styles) d.style[property] = styles[property];
    }
  }, l[0] || 0);
};

const $ = (e) => document.querySelector(e);

const animScroll = () => {
  if (pos > 500) {
    pos = 0;
    css([".scroller"], {
      animation: "revScroll 2s ease forwards",
    });
    css([".after"], {
      animation: "reveal 2s ease forwards",
    });
  } else {
    pos = 900;
    console.log(pos);
    css([".scroller"], {
      animation: "-revScroll 2s ease forwards ",
    });
    css([".after"], {
      animation: "-reveal 2s ease forwards ",
    });
  }
};

/*==========================================================*/
/*==========================================================*/
/*==========================================================*/

const TabContext = React.createContext();

function App() {
  return (
    <>
      <Land></Land>
    </>
  );
}

const Land = () => {
  const [tab, setTab] = useState("trending");

  const active_Tab = (e) => {
    setTab(e);
  };

  const sec = {
    videos: <Videos></Videos>,
    trending: <Trend></Trend>,
    articles: <Artic></Artic>,
  };

  return (
    <>
      <section className="land">
        <TabContext.Provider value={{ active_Tab, tab }}>
          <section className="innerLand">
            <Header></Header>
            {sec[tab]}
            <Footer></Footer>
          </section>
        </TabContext.Provider>
      </section>
    </>
  );
};

const Load = (props) => {
  const remLoad = () => {
    css(
      [".load"],
      {
        display: "none",
      },
      1000
    );

    css([".load"], {
      opacity: "0",
    });
  };
  return (
    <>
      <section className="load">
        <img src={require("./../artics/climate/load.gif")}></img>
        <h3>
          Use headphones for a better experince <br></br>[the circle in the
          header controles background music]
        </h3>
        <h3
          onClick={() => {
            props.sound();
            remLoad();
          }}
        >
          click to start
        </h3>
      </section>
    </>
  );
};

const Videos = () => {
  const changeBack = (e) => {
    $(".vid_pic").style.backgroundImage =
      "url(" +
      require("./../artics/climate/" +
        e.target.parentElement.classList[0].split("/").join(".")) +
      ")";

    $(".vid_pic").style.animation = "start 0.5s ease forwards";
  };
  const removeBack = (e) => {
    $(".vid_pic").style.animation = "end 0.7s ease forwards";
  };

  return (
    <>
      <section className="videos">
        <div className="cont">
          <main>
            <div className="vid_pic"></div>
            <ul
              className="topics"
              onMouseOut={() => removeBack()}
              onTouchEnd={() => removeBack()}
            >
              {videos.map((e, i) => {
                return (
                  <>
                    <li key={id.getTime()} className={"top" + i}>
                      <a
                        key={id.getTime()}
                        href={e.link}
                        className={e.name}
                        onMouseEnter={(e) => changeBack(e)}
                        onTouchStart={(e) => changeBack(e)}
                        target="_blank"
                      >
                        <h2 key={id.getTime()}>{e.title}</h2>
                      </a>
                    </li>
                  </>
                );
              })}
            </ul>
          </main>
        </div>
      </section>
    </>
  );
};

const Trend = () => {
  const openTrend = () => {
    css([".header", ".footer"], {
      visibility: "Hidden",
      opacity: 0,
    });

    $(".trend button").classList.add("but-active");
    css(
      [".trend button"],
      {
        opacity: 1,
      },
      3000
    );

    css([".trend"], { position: "absolute" }, 2000);

    css([".cover"], { height: "100%" }, 1000);

    css([".cover"], {
      transform: "translate(-50%, -50%)",
      transition: "height 0.3s cubic-bezier(0.77, 0, 0.175, 1)",
      height: "60%",
      left: "50%",
      top: "50%",
    });

    css(
      [".innerLand"],
      { gridTemplate: "'head' 0% 'body' 100% 'foot' 0%" },
      1000
    );

    setTimeout(() => {
      $(".content").classList.add("content-active");
      $(".trend-topic").classList.add("trend-topic-active");
    }, 2000);
  };

  /*==========================================================================*/
  /*================================== Close Trend ===========================*/
  /*==========================================================================*/

  const closeTrend = () => {
    css(
      [".header", ".footer"],
      {
        visibility: "visible",
        opacity: 1,
      },
      2000
    );

    $(".trend button").classList.remove("but-active");
    css([".trend button"], {
      opacity: 0,
    });

    css([".trend"], { position: "relative" });

    css([".cover"], { height: "100%" }, 2000);

    css(
      [".cover"],
      {
        transform: "translate(-50%, -50%)",
        transition: "height 0.3s cubic-bezier(0.77, 0, 0.175, 1)",
        height: "60%",
        left: "50%",
        top: "50%",
      },
      500
    );

    css(
      [".innerLand"],
      { gridTemplate: "'head' 18% 'body' 72% 'foot' 10%" },
      2000
    );

    setTimeout(() => {
      $(".content").classList.remove("content-active");
      $(".trend-topic").classList.remove("trend-topic-active");
    }, 1000);
  };

  const changeBack = () => {
    $(".cover").style.backgroundImage =
      "url(" +
      require("./../artics/climate/" + "img1.jpg") +
      // e.target.classList[0].split("/").join(".")) +
      ")";

    $(".cover").style.animation = "start 0.5s ease forwards";
  };
  return (
    <>
      <main className="trend">
        <button
          onClick={() => {
            $(".content").scrollTo({
              top: 0,
              behavior: "smooth",
            });

            setTimeout(() => {
              css([".read"], { opacity: "0.8" }, 500);
              css([".read"], { display: "block" });
              css([".scroll-icon"], { display: "none" }, 500);
              css([".scroll-icon"], { opacity: 0 });
              closeTrend();
            }, 500);
          }}
        >
          <h3>
            <FontAwesomeIcon
              className="icon"
              icon={faAnglesLeft}
            ></FontAwesomeIcon>
          </h3>
        </button>
        <div className="cover"></div>
        <section className="content">
          <div className="inner-trend">
            <article>
              <h2
                className="trend-title"
                onClick={() => {
                  // openTrend();
                }}
              >
                {articals[0].title}
              </h2>
              <p>{articals[0].txt}</p>
              <h3
                className="read"
                onClick={() => {
                  css([".read"], { opacity: "0" });
                  css([".scroll-icon"], { display: "block" });
                  css([".read"], { display: "none" }, 500);
                  css([".scroll-icon"], { opacity: 1 }, 2000);
                  openTrend();
                }}
              >
                Read More
              </h3>
              <div className="scroll-icon">
                <svg
                  className="arrows"
                  onClick={() => {
                    $("#metaverse").scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  <path className="a1" d="M0 0 L30 32 L60 0"></path>
                  <path className="a2" d="M0 20 L30 52 L60 20"></path>
                  <path className="a3" d="M0 40 L30 72 L60 40"></path>
                </svg>
              </div>
            </article>
          </div>

          <Trend_Topic></Trend_Topic>
        </section>
      </main>
    </>
  );
};

var paras = trend_topic.part1.txt.split("#");

const Trend_Topic = () => {
  return (
    <>
      <main className="trend-topic">
        <section className="pulsar" id="metaverse">
          <div className="part1">
            <h2 className="h1">#Towards the Metaverse</h2>
            <p className="p1">{paras[0]}</p>
            <img
              className="img1"
              src={require("./../artics/galaxy/vr.gif")}
            ></img>

            <p className="p2">{paras[1]}</p>
            <p className="p3">{paras[2]}</p>

            <img
              className="img2"
              src={require("./../artics/galaxy/meta.webp")}
            ></img>

            <h2 className="h2">{trend_topic.part1.h}</h2>

            <p className="p4">
              {paras[3]}
              <br></br>
              <br></br>
              {paras[4]}
              <span
                onClick={() => animScroll()}
                style={{ cursor: "pointer", display: "none" }}
              >
                {" "}
                Click Me!
              </span>
            </p>

            <div className="window">
              <div className="before">
                <img
                  className="content-image"
                  src={require("./../artics/galaxy/b6.gif")}
                />
              </div>
              <div className="after">
                <img
                  className="content-image im2"
                  src={require("./../artics/galaxy/dims2.gif")}
                />
              </div>
              <div className="scroller" onClick={() => animScroll()}>
                <FontAwesomeIcon
                  icon={faArrowsLeftRight}
                  className="icon"
                ></FontAwesomeIcon>
              </div>
            </div>
            <p className="p5">
              <br></br>= Yup! you guessed it right, it's the processor.
              <br></br>
              <br></br>
              {paras[5]}
              <br></br>
              <br></br>
              {paras[6]}
            </p>
            <p className="p6">
              <ul className="points">
                {paras[7].split("*").map((e) => {
                  return (
                    <>
                      <li key={id.getTime()}>{e}</li>
                    </>
                  );
                })}
              </ul>
              {paras[8]}
            </p>
            <img
              className="img4"
              src={require("./../artics/galaxy/meme.jpg")}
            ></img>
            <p className="p7">
              {paras[9]}
              <br></br>
              <br></br>
              {paras[10]}
            </p>
            <p className="f">
              {paras[11]} #{paras[12]}
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

const Header = () => {
  const trans = () => {
    css([".trans"], {
      transition: "1.2s cubic-bezier(0.77, 0, 0.175, 1)",
      height: "100%",
    });
    css([".trans span"], {
      transition: "0.8s cubic-bezier(0.77, 0, 0.175, 1) 0.3s",
      height: "100%",
    });

    setTimeout(() => {
      css([".trans"], {
        transition: "1.2s cubic-bezier(0.77, 0, 0.175, 1) 0.1s",
        height: "0%",
      });
      css([".trans span"], {
        transition: "0.8s cubic-bezier(0.77, 0, 0.175, 1)",
        height: "0%",
      });
    }, 1300);
  };
  const { tab, active_Tab } = useContext(TabContext);

  const clicked = (e) => {
    trans();

    setTimeout(() => {
      $(".active").classList.remove("active");
      e.target.classList.add("active");
      return active_Tab(e.target.classList[0]);
    }, 1000);
  };

  const [volume, setVolume] = useState(0.2);
  const [play, { stop, sound }] = useSound(mySound, { volume });

  const sound_cont = () => {
    if ($(".sound").classList.toggle("s_on")) {
      sound.loop(true);
      sound.pause();
      play();
    } else {
      stop();
    }
  };
  return (
    <>
      <header className="header">
        <Load sound={sound_cont}></Load>
        <div className="trans">
          <span></span>
        </div>
        <div className="cont">
          <main>
            <span
              className="sound"
              onClick={() => {
                sound_cont();
              }}
            >
              <span></span>
            </span>
            <ul className="nav">
              {nav.map((e) => {
                return (
                  <>
                    <li key={id.getTime()}>
                      <a
                        key={id.getTime()}
                        className={e.tab + " " + e.state}
                        data-replace={e.tab}
                        onClick={(e) => {
                          clicked(e);
                        }}
                      >
                        {e.tab}
                      </a>
                    </li>
                  </>
                );
              })}
            </ul>
          </main>
        </div>
      </header>
    </>
  );
};

const Artic = () => {
  const move = () => {
    let l = Math.floor(Math.random() * 90);
    let m = Math.floor(Math.random() * 50);

    css([".no"], {
      top: m + "%",
      left: l + "%",
    });
  };

  const heyDarrel = () => {
    css([".inner-trend article"], {
      opacity: 0,
    });
    css(
      [".vid"],
      {
        opacity: 1,
      },
      1000
    );

    setTimeout(() => {
      $(".vid").play();
    }, 1000);
  };

  const sub = () => {
    if (
      !$(".type")
        .value.replace(/\s+/g, " ")
        .replace(/^[ \t]+|[ \t]+$/g, "")
        .match(/^(?:.*i'm gay)*$/gi)
    ) {
      alert("wrong");
    } else {
      css([".art2"], {
        opacity: "0",
      });
      css(
        [".art2"],
        {
          display: "none",
        },
        1000
      );

      css(
        [".art1"],
        {
          display: "block",
          opacity: "1",
        },
        1000
      );
    }
  };

  return (
    <>
      <header className="artic">
        <div className="cont">
          <main className="trend">
            <section className="content">
              <div className="inner-trend">
                <video className="vid">
                  <source
                    src={require("./../artics/climate/laugh.mp4")}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <article className="art1">
                  <h2>
                    {
                      "Good news, you're not a robot. Bad news, this section for straight people only.one last time- Are you gay?"
                    }
                  </h2>
                  <div className="choice">
                    <button className="yes" onClick={() => heyDarrel()}>
                      yes
                    </button>
                    <button
                      className="no"
                      onMouseOver={() => move()}
                      onClick={() => move()}
                    >
                      no
                    </button>
                  </div>
                </article>
                <article className="art2">
                  <h2>Are you a robot?</h2>
                  <div className="choice">
                    <img
                      className="captcha"
                      src={require("./../artics/climate/gaylol.jpg")}
                    ></img>
                    <input
                      type="text"
                      class="type"
                      placeholder="type the text"
                    ></input>
                    <button
                      className="sub"
                      onClick={() => {
                        sub();
                      }}
                    >
                      Continue
                    </button>
                  </div>
                </article>
              </div>
            </section>
          </main>
        </div>
      </header>
    </>
  );
};

const Footer = () => {
  return (
    <>
      <section className="footer">
        <div className="cont">
          <main>
            <h3>#the_void</h3>
            <ul className="links">
              {links.map((e) => {
                return (
                  <>
                    <li key={id.getTime()}>
                      <a href={e.link} target="_blank" key={id.getTime()}>
                        <FontAwesomeIcon
                          icon={e.icon}
                          className="icon"
                        ></FontAwesomeIcon>
                        <h4 key={id.getTime()}>{e.title}</h4>
                      </a>
                    </li>
                  </>
                );
              })}
            </ul>
            <div className="creator">
              <h4>Created by Khaled Fahmy</h4>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default App;
