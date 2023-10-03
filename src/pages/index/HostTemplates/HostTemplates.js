//React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Button from "../../../components/button/Button";

//External

import {
  Addons,
  Bubbles,
  scrollReveal,
  snackbarNotification,
  newNotification,
  viewNotification,
  closeNotification,
} from "../../../components/addons/Addons";


import cssGlobal from "../../../components/globalcss/GlobalCSS.module.css";
// import cssNavbar from "../../../components/nav/Nav.module.css";
// import Nav from "../../../components/nav/Nav";
// import Footer from "../../../components/footer/Footer";

//Main
import css from "./HostTemplates.module.css";

//Extra
import templateList from "../../../components/data/templateList.json";

export default function HostTemplates() {
  //axios

  document.documentElement.setAttribute("data-apptheme", "dark");


  //template info modal code -------------------------------------------
  // var templateinfobox = document.getElementById("templateinfo-box");
  // var templateinfo = document.getElementById("templateinfo");

  function TemplateInfo(id) {
    var templateinfobox = document.getElementById("templateinfo-box");
    var templateinfo = document.getElementById("templateinfo");
    if (templateinfo.style.transform === "scale(1)") {
      templateinfobox.style.transform = "translateY(80%)";
      setTimeout(() => {
        templateinfo.style.transform = "scale(0)";
      }, 150);
    } else {
      templateinfobox.scrollTop = 0;
      templateinfo.style.transform = "scale(1)";
      templateinfobox.style.transform = "translateY(0%)";
      setTemplateID(id);
    }
  }

  window.onclick = function (closeModal) {
    var templateinfo = document.getElementById("templateinfo");
    if (closeModal.target === templateinfo) {
      TemplateInfo();
    }
  };

  window.onkeyup = function (closeEscape) {
    var templateinfo = document.getElementById("templateinfo");
    if (closeEscape.keyCode === 27) {
      if (templateinfo.style.transform === "scale(1)") {
        TemplateInfo();
      }
    }if(closeEscape.keyCode === 191) {
      document.getElementById("HostTemplates-template-search-type-input").focus();
    }
  };

  let prevScrollPos = window.pageYOffset;

  window.onscroll = function(functionInside) {
    if (prevScrollPos > window.pageYOffset) {
      if(window.pageYOffset > 1000) {
        setTimeout(() => {
          document.getElementById("HostTemplates-backtop-button").style.opacity = "100%";
        }, 150);
        document.getElementById("HostTemplates-backtop-button").style.display = "block";
      }else{
        document.getElementById("HostTemplates-backtop-button").style.opacity = "0%";
        setTimeout(() => {
          document.getElementById("HostTemplates-backtop-button").style.display = "none";
        }, 150);
      }
    }else{
      document.getElementById("HostTemplates-backtop-button").style.opacity = "0%";
      setTimeout(() => {
        document.getElementById("HostTemplates-backtop-button").style.display = "none";
      }, 150);
    }
    prevScrollPos = window.pageYOffset;
  };

  function Dropdown(type){
    if(type === "ram"){
      document.getElementById("HostTemplates-templateinfo-box-select-dropdown-RAM").style.display = "block";
    }
  }

  //modal sending checkout code ------------------------------------------
  var [templateID, setTemplateID] = useState(0);
  var [ramValue, setRamValue] = useState(1);
  var [storageValue, setStorageValue] = useState(5);
  var [priceValue, setPriceValue] = useState(Number(Math.pow(ramValue, 1.4)).toFixed(2));


  /*
    yo some notes ----------

    so ram price is calculated by ram^1.4 and range is 1-16
    storage price is calculated by (X-10)/2 formula
      - 10GB and below is free and after that increments of 0.5 cents per GB
  */
  // var ramList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  var storageList = [5, 10, 15, 25, 50, 80, 120, 200];

  async function specRAM() {
    //ram
    setRamValue(document.getElementById("ram-value").value);

    //calculation
    if(storageValue <= 10) {
      //5GB storage is free so just calculated RAM price
      setPriceValue(Number(Math.pow(document.getElementById("ram-value").value, 1.4)).toFixed(2));
    }else{
      //Calculate both prices of ram and storage
      setPriceValue(
        Number(Math.pow(document.getElementById("ram-value").value, 1.4) + ((storageValue - 10) / 2)).toFixed(2)
      );
    }
  }

  async function specStorage(storage) {

    //calculation
    if(storage <= 10) {
      //5GB storage is free so just calculated RAM price
      setPriceValue(Number(Math.pow(document.getElementById("ram-value").value, 1.4)).toFixed(2));
    }else{
      //Calculate both prices of ram and storage
      setPriceValue(
        Number(Math.pow(document.getElementById("ram-value").value, 1.4) + ((storage - 10) / 2)).toFixed(2)
      );
    }
  }

  /*

  no idea how this works but ill try explain the top 2 functions
  specRAM and specStorage to the best i can

  basically specStorage activated by function parameter to update the price
  it also saves the value to storageValue

  when ram is updated the specRAM function is used - and using the saved storageValue
  it can also calculate the price

  the reason why is because - if i try to combine them there is a Delay
  storageValue needs to change first but when price calculates it takes the old value
  so it is always 1 behind the actual variable value

  so specRAM gets elementID.value because its directly from the input source
  but specStorage gets the value from the function parameter because it is not directly from the input source

  */


  //regular sidebar functions ------------------------------------------
  function ScrollTop(type) {
    if(type === "desktop"){
      document.getElementById("HostTemplates-templates").scrollTop = 0;
    }else if(type === "mobile"){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }

  //template display code ------------------------------------------------

  var [createdByType, setCreatedByType] = useState(".*");
  var [tagType, setTagType] = useState(".*");
  var [tagTag, setTagTag] = useState(2);
  // input value is different - allowing spaces
  var [inputValue, setInputValue] = useState(".*");

  function templateFilter(type) {
    if (type === "allCreated") {
      setCreatedByType(".*");
      document.getElementById("HostTemplates-template-tags-created").className =  "";
      document.getElementById("HostTemplates-template-tags-created").classList.add(css["template-tags-created-all"]);
    } else if (type === "allType") {
      setTagType(".*");
      document.getElementById("HostTemplates-template-tags-type").className =  "";
      document.getElementById("HostTemplates-template-tags-type").classList.add(css["template-tags-type-all"]);
    } else if (type === "allTag") {
      setTagTag(2);
      document.getElementById("HostTemplates-template-tags-tags").className = "";
      document.getElementById("HostTemplates-template-tags-tags").classList.add(css["template-tags-tags-all"]);
    } else if (type === "Stax") {
      setCreatedByType("^.*" + type + ".*$");
      document.getElementById("HostTemplates-template-tags-created").className = "";
      document.getElementById("HostTemplates-template-tags-created").classList.add(css["template-tags-created-" + type]);
    } else if (type === "Community") {
      setCreatedByType("^.*[^Stax].*$");
      //search createdBy value that is not "Stax"
      document.getElementById("HostTemplates-template-tags-created").className = "";
      document.getElementById("HostTemplates-template-tags-created").classList.add(css["template-tags-created-" + type]);
    } else if (type === "Web" || type === "Raw" || type === "Others" || type === "App") {
      setTagType("^.*" + type + ".*$");
      document.getElementById("HostTemplates-template-tags-type").className = "";
      document.getElementById("HostTemplates-template-tags-type").classList.add(css["template-tags-type-" + type]);
    } else if (type === "Popular") {
      setTagTag(0);
      document.getElementById("HostTemplates-template-tags-tags").className = "";
      document.getElementById("HostTemplates-template-tags-tags").classList.add(css["template-tags-tags-" + type]);
    }
  }

  function textFilter() {
    var text = document.getElementById(
      "HostTemplates-template-search-type-input"
    ).value;
    if (!text) {
      setInputValue(".*");
    } else {
      setInputValue("^.*" + text + ".*$");
    }
  }

  const templateDisplay = templateList
    //check for template created by
    .filter(function (templateList) {return String(templateList.createdBy).toLowerCase().match(createdByType.toLowerCase());})
    //check by template type
    .filter((templateList) => String(templateList.tags).toLowerCase().match(tagType.toLowerCase()))
    //check by extra filters
    .filter((templateList) => templateList.popular !== tagTag)
    //check by search value
    .filter(function (templateList) {return String(templateList.title.toLowerCase()).match(inputValue.toLowerCase());})
    //print out template list
    .slice()
    //display only X values
    .map((list) => (
      <div key={list.id + "-key"} className={css["templates-box"]}>
        <div className={css["templates-box-inside"]}>
          <div className={css["templates-box-title"]}>
            <h1>{list.title}</h1>
          </div>
          <div className={css["templates-box-tags"]}>
            {list.popular === 1 && (
              <span className={css["popular-tag"]}>
                <i className={`${css["fas"]} ${css["fa-fire"]} ${"fas fa-fire"}`}></i>
              </span>
            )}
            {list.createdBy.includes("Stax") ? (
              <span className={css["stax-tag"]}>Stax</span>
            ) : (
              <span className={css["community-tag"]}>Community</span>
            )}
            {list.tags.includes("Raw") && (
              <span className={css["raw-tag"]}>Raw</span>
            )}
            {list.tags.includes("Web") && (
              <span className={css["web-tag"]}>Web</span>
            )}
            {list.tags.includes("App") && (
              <span className={css["app-tag"]}>App</span>
            )}
            {list.tags.includes("Others") && (
              <span className={css["others-tag"]}>Others</span>
            )}
          </div>
          <div className={css["templates-box-info"]}>
            {!list.createdBy.includes("Stax") && (
              <span className={css["template-subtitle"]}>
                Created By:{" "}
                <span className={css["template-author"]}>{list.createdBy}</span>
                <br />
              </span>
            )}
            {list.info}
          </div>
        </div>
        <div className={css["templates-box-button"]}>
          <p>
            <i
              onClick={() => TemplateInfo(list.id)} className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
          </p>
        </div>
      </div>
    ));

  return (
    <div id="HostTemplates-react-div" className={cssGlobal["react-div"]}>
      <Addons />
      <div id="HostTemplates-template-split" className={css["template-split"]}>
        {/* modal windows start */}

        <div id="templateinfo" className={css["templateinfo"]}>
          <div id="templateinfo-box" className={css["templateinfo-box"]}>
            <div className={css["templateinfo-box-inside"]}>
              {templateList
                .filter((templateList) => templateList.id === templateID)
                .slice(0, 1)
                .map((list) => (
                  <div key={list.id + "-key"} className={css["templateinfo-box-stats"]}>
                    <h1>{list.title}</h1>
                    <div className={css["templateinfo-box-tags"]}>
                      {list.popular === 1 && (
                        <span className={css["popular-tag"]}>
                          <i className={`${css["fas"]} ${css["fa-fire"]} ${"fas fa-fire"}`}></i>
                        </span>
                      )}
                      {list.createdBy.includes("Stax") ? (
                        <span className={css["stax-tag"]}>Stax</span>
                      ) : (
                        <span className={css["community-tag"]}>Community</span>
                      )}
                      {list.tags.includes("Raw") && (
                        <span className={css["raw-tag"]}>Raw</span>
                      )}
                      {list.tags.includes("Web") && (
                        <span className={css["web-tag"]}>Web</span>
                      )}
                      {list.tags.includes("Others") && (
                        <span className={css["others-tag"]}>Others</span>
                      )}
                      {list.tags.includes("App") && (
                        <span className={css["app-tag"]}>App</span>
                      )}
                    </div>
                    {/* <div className={css["templateinfo-box-statsinfo"]}>
                                        <div className={css["templateinfo-box-statsinfo-box"]}>
                                            <p>Used By:<br/><span className={css["statsnumber"]}>35 servers</span></p>
                                        </div>
                                        <div className={css["templateinfo-box-statsinfo-box"]}>
                                            <p>Created on:<br/><span className={css["statsnumber"]}>16th June 2020</span></p>
                                        </div>
                                        <div className={css["templateinfo-box-statsinfo-box"]}>
                                            <p>Difficulty:<br/><span className={css["statsnumber"]}>Beginner</span></p>
                                        </div>
                                    </div> */}
                    <div className={css["templateinfo-box-info"]}>
                      <p>
                        {!list.createdBy.includes("Stax") && (
                          <span className={css["template-subtitle"]}>
                            Created By:{" "}
                            <span className={css["template-author"]}>
                              {list.createdBy}
                            </span>
                            <br />
                          </span>
                        )}
                        {list.info}
                      </p>
                      {!list.description && (
                        <div className={css["templateinfo-box-message"]}>
                          <p>
                            <span className={css["creator-message"]}>
                              Description:
                            </span>
                            <br />
                            {list.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              <div className={css["templateinfo-box-configure"]}>
                <div className={css["templateinfo-box-configure-inside"]}>
                  <h1>Configure Droplet</h1>
                  <div className={css["templateinfo-box-choice"]}>
                    <div className={css["templateinfo-box-choice-title"]}>
                      {templateList
                        .filter(
                          (templateList) => templateList.id === templateID
                        )
                        .slice(0, 1)
                        .map((list) => (
                          <p key={list.title + "-key"}>{list.title}</p>
                        ))}
                    </div>
                    <div className={css["templateinfo-box-choice-price"]}>
                      <p>€{priceValue}</p>
                    </div>
                    <div className={css["templateinfo-box-choice-info"]}>
                      <p>
                        {ramValue}GB RAM
                        <br />
                        {storageValue}GB Storage
                      </p>
                    </div>
                  </div>
                  <div className={css["templateinfo-box-type"]}>
                    <div className={css["templateinfo-box-input1"]}>
                      <div className={css["templateinfo-box-input-title"]}>
                        <p>Select RAM</p>
                      </div>
                      <div className={css["templateinfo-box-select"]}>
                        {/* <button type="button" onClick={() => Dropdown("ram")} className={`${css["templateinfo-box-select-menu"]} ${cssGlobal["flex-center-left"]}`}>
                          <div className={css["templateinfo-box-select-text"]}>
                            <p>Select RAM</p>
                          </div>
                          <div className={css["templateinfo-box-select-icon"]}>
                            <p><i className={`${css["fas"]} ${css["fa-chevron-down"]} ${"fas fa-chevron-down"}`}></i></p>
                          </div>
                        </button> */}
                        <input id="ram-value" type="range" onChange={() => specRAM()} step="1" min="1" max="16"/>
                        <div className={`${css["templateinfo-box-input-value"]} ${cssGlobal["flex-center-left"]}`}>
                          <div className={css["templateinfo-box-input-value-box1"]}>
                            <p>|</p>
                          </div>
                          <div className={css["templateinfo-box-input-value-box2"]}>
                            <p>|</p>
                          </div>
                          <div className={css["templateinfo-box-input-value-box3"]}>
                            <p>|</p>
                          </div>
                          <div className={css["templateinfo-box-input-value-box4"]}>
                            <p>|</p>
                          </div>
                          <div className={css["templateinfo-box-input-value-box5"]}>
                            <p>|</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={css["templateinfo-box-input2"]}>
                      <div className={css["templateinfo-box-input-title"]}>
                        <p>Select Block Storage</p>
                      </div>
                      <div className={css["templateinfo-box-select"]}>
                        <div className={`${css["templateinfo-box-select-list"]} ${cssGlobal["flex-center-left"]}`}>
                          {storageList.map((list) => (
                            <button key={list + "-key"} style={storageValue === list ? {backgroundColor: "var(--text1)", color: "var(--theme1)"}:{opacity: "100%"}} onClick={() => {setStorageValue(list);specStorage(list)}} className={css["templateinfo-box-select-list-box"]}>
                              <p>{list}GB</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={() => TemplateInfo()} className={css["templateinfo-box-cancel"]}>
                  <p>Close</p>
                </button>
                <div className={css["templateinfo-box-checkout"]}>
                  <Link
                    to="/checkout"
                    state={{
                      templateID: templateID,
                      ram: ramValue,
                      storage: storageValue,
                      price: priceValue,
                    }}>
                    Checkout
                    <i className={`${css["fas"]} ${css["fa-chevron-right"]} ${"fas fa-chevron-right"}`}></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* modal windows end */}

        {/* template filter start */}

        <div id="HostTemplates-template-filter" className={css["template-filter"]}>
          <div id="HostTemplates-template-title" className={css["template-title"]}>
            <h1 id="HostTemplates-template-title-h1">
              Droplet Hosting Templates
            </h1>
          </div>
          <div id="HostTemplates-template-buttons" className={css["template-buttons"]}>
            <div id="HostTemplates-template-button" className={css["template-button"]}>
              <Link id="HostTemplates-template-button-link" className={css["template-button-link"]} to="/products/hosting/droplet">
                <div id="HostTemplates-template-button-inside1" className={css["template-button-inside1"]}>
                  <p id="HostTemplates-template-button-inside1-p">
                    <i id="HostTemplates-template-button-inside1-icon" className={`${css["fas"]} ${css["fa-arrow-left"]} ${"fas fa-arrow-left"}`}></i>Hosting
                  </p>
                </div>
              </Link>
            </div>
            <div id="HostTemplates-template-button--2" className={css["template-button"]}>
              <button id="HostTemplates-template-button-inside2" onClick={() => ScrollTop("desktop")}className={css["template-button-inside2"]}>
                <p id="HostTemplates-template-button-inside2-p">
                  <i id="HostTemplates-template-button-inside2-icon" className={`${css["fas"]} ${css["fa-arrow-up"]} ${"fas fa-arrow-up"}`}></i>
                  Scroll Up
                </p>
              </button>
            </div>
          </div>
          <div id="HostTemplates-template-search" className={css["template-search"]}>
            <div id="HostTemplates-template-search-icon" className={css["template-search-icon"]}>
              <p id="HostTemplates-template-search-icon-p">
                <i id="HostTemplates-template-search-icon-icon" className={`${css["fas"]} ${css["fa-search"]} ${"fas fa-search"}`}></i>
              </p>
            </div>
            <div id="HostTemplates-template-search-type" className={css["template-search-type"]}>
              <input id="HostTemplates-template-search-type-input"
                onInput={() => textFilter()}
                type="text"
                placeholder="Search Templates..."
              />
            </div>
          </div>
          <div className={css["template-filter-box-section"]}>
            <div id="HostTemplates-template-filter-box" className={css["template-filter-box"]}>
              <div id="HostTemplates-template-filter-title" className={css["template-filter-title"]}>
                <p id="HostTemplates-template-filter-title-p">Created By:</p>
              </div>
              <div id="HostTemplates-template-tags-created" className={css["template-tags-created-all"]}>
                <div id="HostTemplates-template-tags" className={css["template-tags"]}>
                  <button id="HostTemplates-template-tags-box-allCreated"
                    onClick={() => templateFilter("allCreated")} className={`${css["template-tags-box"]} ${css["template-tags-all"]}`}>
                    <p id="HostTemplates-template-tags-box-p-allType">All</p>
                  </button>
                  <button id="HostTemplates-template-tags-box-Stax"
                    onClick={() => templateFilter("Stax")} className={`${css["template-tags-box"]} ${css["template-tags-Stax"]}`}>
                    <p id="HostTemplates-template-tags-box-p-Stax">Stax</p>
                  </button>
                  <button id="HostTemplates-template-tags-box-Community"
                    onClick={() => templateFilter("Community")} className={`${css["template-tags-box"]} ${css["template-tags-Community"]}`}>
                    <p id="HostTemplates-template-tags-box-p-Community">
                      Community
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <div id="HostTemplates-template-filter-box--2" className={css["template-filter-box"]}>
              <div id="HostTemplates-template-filter-title--2" className={css["template-filter-title"]}>
                <p id="HostTemplates-template-filter-title-p--2">
                  Server Type:
                </p>
              </div>
              <div id="HostTemplates-template-tags-type" className={css["template-tags-type-all"]}>
                <div id="HostTemplates-template-tags--2" className={css["template-tags"]}>
                  <button id="HostTemplates-template-tags-box-allType"
                    onClick={() => templateFilter("allType")} className={`${css["template-tags-box"]} ${css["template-tags-all"]}`}>
                    <p id="HostTemplates-template-tags-box-p-allType">All</p>
                  </button>
                  <button id="HostTemplates-template-tags-box-Web"
                    onClick={() => templateFilter("Web")} className={`${css["template-tags-box"]} ${css["template-tags-Web"]}`}>
                    <p id="HostTemplates-template-tags-box-p-Web">
                      Web Servers
                    </p>
                  </button>
                  {/* <button id="HostTemplates-template-tags-box-Raw"
                    onClick={() => templateFilter("Raw")} className={`${css["template-tags-box"]} ${css["template-tags-Raw"]}`}>
                    <p id="HostTemplates-template-tags-box-p-Raw">Raw Server</p>
                  </button> */}
                  <button id="HostTemplates-template-tags-box-App"
                    onClick={() => templateFilter("App")} className={`${css["template-tags-box"]} ${css["template-tags-App"]}`}>
                    <p id="HostTemplates-template-tags-box-p-App">App Servers</p>
                  </button>
                  <button id="HostTemplates-template-tags-box-Others"
                    onClick={() => templateFilter("Others")} className={`${css["template-tags-box"]} ${css["template-tags-Others"]}`}>
                    <p id="HostTemplates-template-tags-box-p-Others">Others</p>
                  </button>
                </div>
              </div>
            </div>
            <div id="HostTemplates-template-filter-box--3" className={css["template-filter-box"]}>
              <div id="HostTemplates-template-filter-title--3" className={css["template-filter-title"]}>
                <p id="HostTemplates-template-filter-title-p--3">Tags</p>
              </div>
              <div id="HostTemplates-template-tags-tags" className={css["template-tags-tags-all"]}>
                <div id="HostTemplates-template-tags--3" className={css["template-tags"]}>
                  <button id="HostTemplates-template-tags-box-allTag"
                    onClick={() => templateFilter("allTag")} className={`${css["template-tags-box"]} ${css["template-tags-all"]}`}>
                    <p id="HostTemplates--templates-tags-box-p-allTag">All</p>
                  </button>
                  <button id="HostTemplates-template-tags-box-Popular" onClick={() => templateFilter("Popular")} className={`${css["template-tags-box"]} ${css["template-tags-Popular"]}`}>
                    <p id="HostTemplates--templates-tags-box-p-Popular">Popular</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* template filter end */}

        {/* templates start */}

        <div className={css["templates"]} id="HostTemplates-templates">
          {templateDisplay}

          <div className={css["loader-div"]}>
            <div className={css["loader-background"]}>
              <div className={css["loader-circle"]}></div>
            </div>
          </div>

          <button id="HostTemplates-backtop-button" onClick={() => ScrollTop("mobile")} className={css["backtop-button"]}>
            <p><i className={`${css["fas"]} ${css["fa-arrow-up"]} ${"fas fa-arrow-up"}`}></i></p>
          </button>

        </div>


        {/* templates end */}
      </div>
    </div>
  );
}
