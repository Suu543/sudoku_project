/*!
 * Sudoku React
 * Copyright(c) 2019 Recep Pekin
 *  
 */
/**
 *  Sudoku Application
 * @module sudoku/App
 */

import React, { Component } from "react";

/* CSS */

import "./App.css";
import "bulma/css/bulma.css";
// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// underscore
import _ from "underscore";
import highlight from "highlight.js";
import "highlight.js/styles/default.css";

// Components
import Banner from "./Components/Banner";
import Board from "./Components/Board";
import ConsoleRight from "./Components/ConsoleRight";
import Message from "./Components/Message";
import Tools from "./Components/Tools";
import GameInfo from "./Components/GameInfo";
import Footer from "./Components/Footer";

// Controls
import nGame from "./Controls/NewGame.js";
import newEngine from "./Controls/NewEngine.js";

class App extends Component {
  /**
   * @param {object} props - props are the things which make React great.
   */

  constructor(props) {
    super(props);

    this.rnum = Math.round(Math.random() * 10);

    this.newEngine = new newEngine();
    this.nGame = new nGame();

    const filledArray = new Array(81).fill("");

    this.state = {
      txt: "empty",

      firstGiven: "",
      messageBoxBelow: ":=|",
      sudokuArr: [],
      poppedArr: [],
      newtask: [],
      first: [],
      foundCount: 0,
      firstMaxIteration: 10,
      maxIteration: -1,
      numberOfSolved: 0,
      gameLevel: "",
      gameStr: "",
      complexityLevel: 1,
      countEmptyCells: 0,
      countFilledCells: 0,
      complexityLog: 1,
      foundItemsStore: [],
      cellValues: filledArray,
      stepsArchive: [],
      gameLoadedFirst: null,
      stop: false,
      rnum: "",
      cellsBackgroundColors: [],
      gameId: "",
      stateOfGame: "active",
      backupGame: null,
      triedArray: [],
      bottomConsoleText: "",
      popupCells: [],
      popupCellsMessage: [],
      showPopup: false,
      showConnected: false
    };
  }

  /**
   * Loads template from given file.
   * @param {object} e - Template filename.
   * @return {function} Returns template closure.
   */

  handleShowFound = e => {
    this.sendConsole(JSON.stringify(this.state.foundItemsStore));
  };

  sendBottom = str => {
    return;

    // str  = this.state.bottomConsoleText + "</br>" +  str ;

    // str = '<span className="is-large container is-code"> hello world </span>' ;
    // const highlightedCode = str ;

    const highlightedCode = highlight.highlightAuto(str).value;
    this.setState({ bottomConsoleText: highlightedCode });
    // this.setState( { bottomConsoleText : str });
  };

  /**
   * @typedef {App} gameInit
   * @property {string} str this is a desc
   *  @property {string} str2 this is a desc
   *  @property {string} str3 this is a desc
   *  @property {string} str4 this is a desc
   * @property {string} str5 this is a desc
   */

  /**
  * Starts the game 
  * @function gameInit
 
  * @param {object} e  event
  */

  gameInit = e => {
    console.log("game init...");

    this.getGameInfo();
    this.colorFirst();

    this.setState({ maxIteration: this.state.firstMaxIteration });
    const filledArray = new Array(81).fill("");
    this.setState({ numberOfSolved: 0 });
    this.setState({ cellValues: filledArray });

    const popArray = new Array(81).fill("hidden");
    this.setState({ popupCells: popArray });

    const popArrayMessage = new Array(81).fill("");
    this.setState({ popupCellsMessage: popArrayMessage });

    this.setState({ stepsArchive: [] });
    document.getElementById("messageBoxBelow").style.backgroundColor = "#fffff";
  };

  /**
   *  Toastifies new information about cells
  * @function notify
   * @param { object } obj - 
  
   * @return {void}  
 
 
   */

  notify = uerror => {
    let str = uerror.toString();

    // var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
    // let gg  =_.max(stooges, function(stooge){ return stooge.age; });

    // toast(`  ${str} ${JSON.stringify(gg) }`);

    toast(`  ${str}  `);

    //toast("Mistakes! " + uerror.toString()   );
  };

  allhide = () => {
    let newArray = new Array(81).fill("hidden");
    this.setState({ popupCells: [...newArray] });

    let newPopValues = new Array(81).fill("");

    this.setState({ popupCellsMessage: newPopValues });
  };

  togglePopup = () => {
    this.setState({ showPopup: !this.state.showPopup });
    console.log("this.showPopup", this.state.showPopup);
  };

  toggleConnected = () => {
    this.setState({ showConnected: !this.state.showConnected });
    console.log("this.showConnected", this.state.showConnected);
    setTimeout(() => {
      if (this.state.showConnected === false) {
        this.resetNotify();
      }
    }, 30);
  };

  popupmes = (id, str, quick) => {
    if (this.state.showPopup === false) {
      return;
    }
    let index = this.newEngine.convertIdToIndex(id);
    let newArray = new Array(81).fill("hidden");
    newArray[index] = "shown";

    this.setState({ popupCells: newArray });
    let popValues = [...this.state.popupCellsMessage];
    popValues[index] = str;

    this.setState({ popupCellsMessage: popValues });

    if (quick === true) {
      setTimeout(() => {
        this.allhide();
      }, 150);
    } else {
      setTimeout(() => {
        this.allhide();
      }, 5000);
    }

    // this.allhide();
  };
  /**
   * shows Cell Info row number and column number and available candidates to be put.
   *
   * @function showCellInfo
   * @param {string} id this is the cell id
   * @param {number} value value between 1-9 or empty
   */
  showCellInfo = (id, value) => {
    /* First lets check if the cell is already filled  */

    if (parseInt(value) > 0) {
      this.sendConsole(
        "this one is filled { Row : " +
          id[0] +
          ", Column : " +
          id[1] +
          " } , [ " +
          value +
          " ]"
      );

      return;
    }

    let squaresInfo = this.newEngine.whichValuesById(this.state.cellValues, id);

    // let popid = "popup" + id ;
    //element.classList.add("my-class");

    let str = "  " + "   " + squaresInfo.toString() + "  ";

    this.popupmes(id, str);

    this.sendConsole(
      "{ Row : " +
        id[0] +
        ", Column : " +
        id[1] +
        " } , [ " +
        squaresInfo.toString() +
        " ]"
    );

    if (squaresInfo[0] === "filled") {
    } else {
      if (squaresInfo.length === 1) {
        this.notify(
          "Bingooo, we can write here: (" + id + ") : " + squaresInfo.toString()
        );
      }
    }
  };

  colorThisCell = (id, color) => {
    let index = this.newEngine.convertIdToIndex(id);

    let colorCells = new Array(81).fill("bg-white"); //  [...this.state.cellsBackgroundColors];

    colorCells[index] = "bg-" + color;

    this.setState({ cellsBackgroundColors: colorCells });
  };

  /**
   * handles focus event for the cells
   *
   * @function handleFocus
   * @param {object} e event
   */

  handleFocus = e => {
    const id = e.target.id;
    const value = e.target.value;

    // bg-green
    //this.colorThisCell( id , "green");

    this.showCellInfo(id, value);

    this.colorConnectedCells(id, "coral");

    // this.sendConsole(JSON.stringify(  this.newEngine.checkTheGame(this.state.cellValues)    ));
  };

  /**
   * when Engine finds a value it puts it the the cell
   *
   * @function IfoundAValue
   * @param {object} obj event
   */

  IfoundAValue = obj => {
    console.log("IfoundAValue", obj);
    obj.map(elem => {
      this.changeCellValueById(elem.id, elem.someValue);
    });
  };

  /**
   * when user wants to stop iteration
   *
   * @function stop
   * @param {object} e event
   */

  stop = e => {
    this.setState({
      //  numberOfSolved: this.state.numberOfSolved + oneAlternatives.length
      stop: !this.state.stop
    });
    if (this.state.stop === false) {
      setTimeout(() => {
        this.solve();
      }, 500);
    }

    console.log("stop ", this.state.stop);
  };

  /**
   * this one handles when user clicks solve button
   * Engine starts solving the puzzle
   *
   * @function solveHandler
   * @param {object} e event
   */

  solveHandler = e => {
    this.setState({ stateOfGame: "active" });

    this.setState({ maxIteration: this.state.firstMaxIteration });

    setTimeout(() => {
      this.solve();
    }, 300);


  };

  /**
   * this one was calles by solveHandler when user clicks solve button
   * Engine starts solving the puzzle
   *
   * @function solve
   * @param {object} e event
   * @see {solveHandler}
   */

  solve = e => {
    this.getGameInfo();


    setTimeout(() => {
      if (this.state.stateOfGame === "solved") {
        console.log("returning 218 , ", this.state.stateOfGame);

        return true;
      }
    }, 500);

    this.newEngine.checkNow(this.state.cellValues);


    // if ( false === this.newEngine.checkNow(this.state.cellValues) ) { return  false ; };

    console.log("this.state.maxIteration", this.state.maxIteration);

    if (this.state.stop === true) {
      // if (this.getGameInfo() === false || this.state.stop == true) {
      console.log("Game was stopped ", this.state);
      // alert("stopped");
      return false;
    }

    // Second Algorithm

    let foundCellsSecond = this.newEngine.secondSolve(this.state.cellValues);

    // let foundS = foundCellsSecond[0];

    console.log("foundCellsSecond ", foundCellsSecond);

    foundCellsSecond.map(found => {
      //  console.log(found);

      // console.log("found  ", found);
      //  let id = getIdfromRowColumn( found.detail.row , found.detail.column   );
      let id = found.detail.row.toString() + found.detail.column.toString();
      let val = found.value;
      setTimeout(() => {
        this.changeCellValueById(id, val);
      }, 300);

      this.setState({ backupGame: this.state.cellValues });
    });

    let foundCells = this.newEngine.firstSolve(this.state.cellValues);

    // I could not find but I want a have a second look

    if (foundCells.length > 0) {
    } else {
      this.setState({ maxIteration: this.state.maxIteration - 1 });
    }

    // let us decide if we should repeat solving
    // check if we found some values
    // if we have nt found any value in the last round lets check max iteration count
    // we should avoid infinite loops that is why we use max iteration count

    let again =
      foundCells.length > 0 ||
      foundCellsSecond.length > 0 ||
      this.state.maxIteration > 0
        ? true
        : false;

    console.log("foundCells", foundCells);

    foundCells.map(elem => {
      let id1 = elem.row;
      let id2 = elem.column;
      let value = elem.cands[0];
      let id = id1.toString() + id2.toString();

     
        this.changeCellValueById(id, value);
   

      this.setState({ backupGame: this.state.cellValues });
    });


    setTimeout(() => {
      if (again === true) {
        this.solve(e);
      } else {
        if (this.state.stateOfGame === "active" && again === false) {
          this.setState({ gameLoadedFirst: this.state.cellValues });

          this.feelLucky();
        }

        setTimeout(() => {
          this.getASafeBackup();
          if (this.state.stateOfGame !== "solved") {
            this.setState({ stateOfGame: "paused" });
            this.feelLucky();
          }
        }, 1300);
      }
    }, 800);
  };


  /**
   * Whenever engine finds only one cadidate for the cell this value is put to the cell
   * @function changeCellValueById
   * @param {string} id id
   *  @param {string} val val
   * @see {solve}
   */

  changeCellValueById = (id, val) => {
    // this.colorThisCell( id , "green");

    let nArray = [];
    nArray.push(id);
    this.blinkTheseCells("coral", nArray);

    this.notify("{ id : " + id + ", value : " + val + "} ");
    let foundObj = { id: id, value: val };
    let foundArr = [...this.state.foundItemsStore];
    foundArr.push(foundObj);

    if (this.state.stateOfGame === "active") {
      this.setState({ foundItemsStore: foundArr });
    }

    let indexNum = (parseInt(id[0]) - 1) * 9 + parseInt(id[1]) - 1;
    let newCellValues = [...this.state.cellValues];

    if (parseInt(newCellValues[indexNum]) > 0 || id === "Info") {
      return;
    }

    // console.log(newCellValues);
    //console.log( id , val , indexNum );

    newCellValues[indexNum] = val;
    this.popupmes(id, val.toString(), true);

    this.showCellInfo(id, val);

    this.colorConnectedCells(id, "coral");

    // in order to move back and forward in our steps

    if (this.checkValues(val, id) === false) {
      //  alert("prıoblem" , id , val );
      console.log("problem", id, val);
      return false;
    } else {
      this.stepsArchiveSafe(id, val, newCellValues);
      this.setState({ cellValues: newCellValues });
    }
  };

  /**
   * Whenever user inserts a number to the cell this func is called
   * @function whenUserInserted
   * @param {string} value value
   *  @param {string} id id
   * @see {solve}
   */

  whenUserInserted = (value, id) => {
    console.log("whenUserInserted");

    // console.log("you have changed" + e.target.value);
    // console.log("e" , e.target.id );

    let sArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    console.log("gg", sArray.indexOf(value.toString()));

    if (sArray.indexOf(value.toString()) > -1) {
      //gonext(e.target.id);

      let nextId = this.newEngine.goNext(id, this.state.cellValues);

      if (nextId !== null) {
        console.log("gid ", nextId);
        // this.handleFocus(this);

        document.getElementById(nextId).focus();
      }

      if (this.checkValues(value, id) === false) {
      } else {
        this.changeCellValueById(id, value);
        setTimeout(() => {
          this.showCellInfo(nextId, 0);
        }, 500);
      }
    } else {
      // it is not numeric between 1-9
    }
  };

  /**
   * Whenever user inserts a number to the cell this func is called
   * @function handleChange
   * @param {object} e event
   * @see   {handleFocus}
   */

  handleChange = e => {
    console.log("handleChange");

    this.newEngine.checkIfCellsProper(this.state.cellValues);

    let value = e.target.value;
    let id = e.target.id;

    this.whenUserInserted(value, id);
    // this.sendConsole(JSON.stringify(  this.newEngine.checkTheGame(this.state.cellValues)    ));

    console.log(this.newEngine.checkTheGame(this.state.cellValues));

    //this.sendBottom(JSON.stringify(  this.newEngine.checkTheGame(this.state.cellValues)    ) );

    this.sendBottom(
      JSON.stringify(
        this.newEngine.checkTheGame(this.state.cellValues),
        undefined,
        2
      )
    );

    //JSON.stringify(someObject, undefined, 2);
  };

  /**
   * this one is used to blink the cells in case of error
   * @function notifyTheseItems
   * @param {Array} uerror Array of ids of cells
   * @see   {checkValues}
   */

  notifyTheseItems = uerror => {
    //toast(" " + uerror.toString()   );

    console.log("uerror", uerror);
    if (uerror.length === 0) {
      return;
    }

    for (var i = uerror.length - 1; i >= 0; i--) {
      document.getElementById(uerror[i]).style.backgroundColor = "#e544e5";
    }

    this.notify(uerror.toString());
    return;
  };

  /**
   * this one is used to reset colors of cells to white again after error or any other notification
   * @function resetNotify
   * @param
   * @see   {notifyTheseItems}
   */

  resetNotify() {
    const cellsB = new Array(81).fill("bg-white");
    this.setState({ cellsBackgroundColors: cellsB });
  }

  /**
   * this one is used to blink the cells in case of error
   * @function blinkTheseCells
   * @param {string } color color by choice
   * @see   {resetNotify}
   */

  blinkTheseCells = (color, idArray) => {
    // coral - aqua - red
    this.colorThese(color, idArray);

    const whiteF = this.colorFirst;

    setTimeout(() => {
      whiteF();
    }, 3000);
  };
  /**
   * this one is used to blink the cells in case of error
   * @function checkValues
   * @param {string } value value of the cell
   * @param {string } id id of the cell
   * @see   {resetNotify}
   */
  checkValues = (value, id) => {
    //  if ( this.newEngine.checkIfCellsProper( this.state.cellValues ) === false ) { return false ; }

    console.log("check values ", value, id);

    let errorC = this.newEngine.errorCells(this.state.cellValues, id, value);

    console.log("errorCells", errorC);

    this.blinkTheseCells("red", errorC);

    this.notifyTheseItems(errorC);

    const resetnfy = () => {
      this.resetNotify();
    };

    setTimeout(function() {
      resetnfy();
    }, 500);

    // canWe => true | false
    let canWe = this.newEngine.canWePutThis(this.state.cellValues, id, value);
    console.log(" : ", canWe, value);
    return canWe;
  };

  //////////////////////////////////////////////////

  /**
   * used for getting the game info as a formatted string to store for later use 
   * @function getThisAsStr

   */
  getThisAsStr = e => {
    e.preventDefault();
    let str = this.newEngine.getThis(this.state.cellValues);
    console.log(str);

    this.setState({ messageBoxBelow: str });
  };

  /**
   * to show some info at the panel
   * @function sendConsole
   * @param {string } str value of the cell
   */

  sendConsole = str => {
    this.setState({ consoleMessage: str });
  };
  /**
   * to clear the board for a new game to be inserted
   * @function deleteGame
   * @param {object } e event
   */

  deleteGame = e => {
    const filledArray = new Array(81).fill("");
    document.getElementById("messageBoxBelow").style.backgroundColor =
      "#FFffff";
    this.setState({ messageBoxBelow: ":=|" });
    this.setState({ cellValues: filledArray });
    this.setState({ maxIteration: 25 });

    this.gameInit(e);
  };

  /**
   * to go to previous  state of the game before the last inserted value
   * @function goBackT
   * @param {object } e event
   */

  goBackT = e => {
    //this.resetNotify(e);

    // in order to move back and forward in our steps
    const _stepsArchive = [...this.state.stepsArchive];
    //let nObj = { v : newCellValues};

    _stepsArchive.pop();
    console.log("_stepsArchive", this.state.stepsArchive);

    this.setState({ stepsArchive: _stepsArchive });

    if (_stepsArchive.length > 0) {
      // one step back
      let backStep = _stepsArchive[_stepsArchive.length - 1];

      let arr = backStep.v;

      this.setState({ cellValues: arr });
    } else {
      // we came back to beginning of the game
      this.notify("You are in the beginning ");
      this.setState({ cellValues: this.state.gameLoadedFirst });
    }
  };
  /**
   * it gets str like "1;;2;;;;;;......"
   * and converts it to array of 81 values
   * like this [ 1,'',2,'','','','' .....]
   * @function stringToCellValuesArray
   * @param {string } str formatted string with semicolons
   */

  stringToCellValuesArray = str => {
    /* it gets str like "1;;2;;;;;;......"
     * and converts it to array of 81 values
     * like this [ 1,'',2,'','','','' .....]
     *
     */
    console.log(str);
    var pos = str.indexOf(";");
    var cleanOne = str.substring(pos - 1);

    var res = cleanOne.split(";");
    res.pop();

    //console.log(res );
    return res;
  };

  /**
   * loads a new game
   * @function newGame
   * @param {object  } e formatted string with semicolons
   */

  newGame = e => {
    console.log("newGame ");
    this.componentDidMount();

    setTimeout(() => {
      // this.loadARandomGame(e);
      //this.gameInit();
    }, 0);
  };

  faceExpression = level => {
    switch (level) {
      case "hard":
        return ":=(";
      case "medium":
        return ":=|";
      case "easy":
        return ":=)";
      default:
        return ":=|";
    }
  };
  /**
   * loads a new random game
   * @function loadARandomGame
   * @param {object  } e formatted string with semicolons
   */

  loadARandomGame = e => {
    // { level : "easy"  , str : ";;5asdasd sad" }
    const gameObj = this.nGame.getFirstValue();
    const st = gameObj.str;
    //  Engine.loadStr(st);

    let arr = this.stringToCellValuesArray(st);

    this.setState({ gameLoadedFirst: arr });
    this.setState({ cellValues: arr });

    // in order to move back and forward in our steps
    const _stepsArchive = [...this.state.stepsArchive];
    let nObj = { v: arr };
    _stepsArchive.push(nObj);
    this.setState({ stepsArchive: _stepsArchive });

    console.log("first values were added to archive", _stepsArchive);

    const level = gameObj.level;

    // face expressions for funface

    const face = this.faceExpression(level);
    this.setState({ messageBoxBelow: face });

    // store info for the loaded game for later use
    this.setState({ gameId: gameObj.id });

    this.setState({ gameLevel: level });
    this.setState({ gameStr: st });

    this.getGameInfo();
  };

  /**
    * when the puzzle is solved changes the colors of all cells 
   * @function colorFinished
 
   */

  colorFinished = () => {
    const cellsB = new Array(81).fill("bg-coral");
    this.setState({ cellsBackgroundColors: cellsB });

    setTimeout(() => {
      //const cellsB = new Array(81).fill("bg-coral");
      this.setState({ cellsBackgroundColors: cellsB });
    }, 2000);
  };

  yayFinishedTheGame = e => {
    //  this.getGameInfo();
    this.colorFinished();



    this.setState({ stop: true });


    console.log("  yayFinishedTheGame   ", this.state);

    this.setState({ stateOfGame: "solved" });


    setTimeout(() => {
      this.notify("Solved the game !!! Yayy ");
      this.sendConsole("Solved the game !!! Yayy ");
      //    messageBoxBelow
      document.getElementById("messageBoxBelow").style.backgroundColor =
        "#FFDD57";
      this.setState({ messageBoxBelow: ":=)" });
    }, 2000);

    return false;
  };

  /**
   * gets the game info
   * @function getGameInfo
   * @param {object  } e
   */
  getGameInfo = e => {
    setTimeout(() => {
      if (this.state.stateOfGame === "solved") {
        console.log(
          "this one is already solved I am returning ",
          this.state.stateOfGame
        );
        return false;
      }
    }, 300);

    let info = this.newEngine.checkTheGame(this.state.cellValues);

    
    console.log(info);

    setTimeout(() => {
      this.setState({ complexityLevel: info.complexity });
      this.setState({ countEmptyCells: info.emptyCount });
      this.setState({ countFilledCells: info.countFilledCells });
      this.setState({ complexityLog: info.complexityLog });




      if (info.emptyCount === 0 ) {
        this.setState({ stateOfGame: "solved" });
        // here we can add extra control
        console.log("I am getting empty cells ... emptyCount", info.emptyCount);
        this.yayFinishedTheGame(e);

        return false;
      }
    }, 80);
  };

  ///////////////////////////////////////////////////////////////////////////
  /**
  * Initial colors for the cells 
  * @function colorFirst
 
  */
  colorFirst = () => {
    const cellsB = new Array(81).fill("bg-white");
    this.setState({ cellsBackgroundColors: cellsB });
  };

  /*store which ones you tried in order to avoid dublicate  */

  storeTry(id, value) {
    // triedObj=
    let triedObj = { id: id, value: value };

    // triedArray

    let triedArray = [...this.state.triedArray];

    triedArray.push(triedObj);

    this.setState({ triedArray });
    console.log("saved this ", this.state.triedArray);
  }

  /**
   * takes ids of cells as array and using color paints them
   * @function colorThese
   * @param {string} color color
   * @param {array} arrayId array of id of cells
   */
  colorThese = (color, arrayId) => {
    //  alert("asd");
    console.log(" color ", arrayId);

    if (arrayId.length > 0) {
      let colorCells = [...this.state.cellsBackgroundColors];

      arrayId.map(elem => {
        let index = this.newEngine.convertIdToIndex(elem);
        colorCells[index] = "bg-" + color;
      });

      this.setState({ cellsBackgroundColors: colorCells });
    }
  };

  /**
    * starts trying 
   * @function feelLucky
 
   */

  feelLucky = () => {
    //return;

    //alert( "I am trying ");
    if (this.state.stateOfGame === "solved") {
      return;
    }
    this.setState({ stateOfGame: "trying" });

    //  it will return some empty cells which has two cands
    // because currently these are best info we have
    let try1 = this.newEngine.feelLucky(this.state.cellValues);

    // this.setState( { backupGame :this.state.cellValues  });

    if (try1 === null) {
      console.log("try1", try1);
      console.log("this is empty I can not do anything ");
      return false;

      // this.setState({ maxIteration: this.state.firstMaxIteration });

      // this.gobackSafe();

      // this.solve();
    } else {
      console.log("try1", try1);

      if (this.trynow(try1) === false) {
        console.log("trynow is false I go back  ");
        this.gobackSafe();

       // this.solve();
      }
    }
  };


  //////////
  trynow = try1 => {

    let handed = _.sample(try1);

    console.log("handed", handed);

    if (handed === null || handed === undefined) {
      console.log("empty ");
      this.gobackSafe();

      setTimeout(() => {
        this.solve();
      }, 300);

      return false;
    } else {
      if (this.tryA(handed, _.sample(handed.cands)) === false) {
        return false;
      }
    }
  };

  //////////////

  tryA = (hand, value) => {
    this.setState({ maxIteration: 2 });

    if (this.newEngine.checkIfCellsProper(this.state.cellValues) === false) {
      return false;
    }

    if (this.getGameInfo() === false || this.state.stop == true) {
      //alert("stopped");
      return false;
    }

    let id = hand.row.toString() + hand.column.toString();

    console.log("I am trying this ", id, value);
    this.changeCellValueById(id, value);

    if (this.solve() === false) {
      return false;
    }

    if (this.newEngine.checkNow(this.state.cellValues) === false) {
      console.log("there is an error in the cells  ");
      return false;
    }
  };





    /**
    * pops the last state of the array 
   * @function stepsArchivePop
 
   */

  stepsArchivePop() {
    setTimeout(() => {
      let arc = [...this.state.stepsArchive];
      arc.pop();

      this.setState({ stepsArchive: arc });
    }, 1);
  }
  /**
    * goes back to previous safe step 
   * @function stepsArchiveSafe
 
   */
  gobackSafe() {

    this.setState({ maxIteration: this.state.firstMaxIteration });

    this.setState({ cellValues : [...this.state.gameLoadedFirst] });
  }

  /**
    * Saves all corrects steps 
   * @function stepsArchiveSafe
 
   */
  stepsArchiveSafe(id, val, newCellValues) {
    if (this.newEngine.checkNow(this.state.cellValues) === true) {
      // in order to move back and forward in our steps
      const _stepsArchive = [...this.state.stepsArchive];
      let nObj = { id: id, val: val, v: newCellValues };
      _stepsArchive.push(nObj);
      this.setState({ stepsArchive: _stepsArchive });

      setTimeout(() => {
        console.log("stepsArchive", this.state.stepsArchive);
      }, 300);
    }
  }
  /**
    * Saves a correct state of a game
   * @function getASafeBackup
 
   */

  getASafeBackup() {
    if (this.newEngine.checkNow(this.state.cellValues) === true) {
      this.setState({ backupGame: this.state.cellValues });
    }
  }
  /////////



  colorConnectedCells = (id, color) => {
    if (this.state.showConnected === false) {
      this.resetNotify();

      return;
    }
    let index = this.newEngine.convertIdToIndex(id);

    //it creates default colors white again
    let colorCells = new Array(81).fill("bg-white"); //  [...this.state.cellsBackgroundColors];
    // it changes current cells bacground to whatever color we passed as color

    let row = parseInt(id[0]);
    let column = parseInt(id[1]);

    let cube = this.newEngine.getCubeIndex(row, column);

    let allCells = this.newEngine.getAllCellsInfo(this.state.cellValues);
    let count = -1;

    allCells.map(cell => {
      count++;
      if (cell.row === row || cell.column === column || cell.cube === cube) {
        if (cell.row === row && cell.column === column && cell.cube === cube) {
          // we found our current Cell
          colorCells[count] = "bg-blue";
        } else {
          colorCells[count] = "bg-" + color;
        }
      }
    });

    this.setState({ cellsBackgroundColors: [...colorCells] });
  };

  componentDidMount() {
    console.log("componentDidMount 18 ");
    this.setState({ stop: false });
    this.setState({ stateOfGame: "active" });

    this.colorFirst();

    setTimeout(() => {
      this.gameInit();
      this.loadARandomGame();
      this.getGameInfo();
    }, 300);
  }

  render() {
    return (
      <div className="container">
        <ToastContainer autoClose={7000} />

        <section className="hero is-fullheight">
          <div className="container is-fluid">
            <br />
            <br />
            <Banner />

            <div className="container">
              <Tools
                getThisAsStr={this.getThisAsStr}
                stop={this.stop}
                goBackT={this.goBackT}
                solve={this.solveHandler}
                newGame={this.newGame}
                deleteGame={this.deleteGame}
                togglePopup={this.togglePopup}
                showPopup={this.showPopup}
                toggleConnected={this.toggleConnected}
                showConnected={this.showConnected}
              />
            </div>

            <div className="columns">
              <div className="column">
                <Board
                  handleChange={this.handleChange}
                  handleFocus={this.handleFocus}
                  cellValues={this.state.cellValues}
                  cellsBackgroundColors={this.state.cellsBackgroundColors}
                  popupCells={this.state.popupCells}
                  popupCellsMessage={this.state.popupCellsMessage}
                />{" "}
              </div>

              <div className="column">
                {" "}
                <GameInfo
                  stateOfGame={this.state.stateOfGame}
                  gameId={this.state.gameId}
                  gameLevel={this.state.gameLevel}
                  complexityLevel={this.state.complexityLevel}
                  countEmptyCells={this.state.countEmptyCells}
                  countFilledCells={this.state.countFilledCells}
                  complexityLog={this.state.complexityLog}
                  rnum={this.rnum}
                />
              </div>
              <div className="column">
                <div className="columns">
                  <div className="row">
                    <div className="column">
                      {" "}
                      <ConsoleRight
                        sendConsole={this.sendConsole}
                        consoleMessage={this.state.consoleMessage}
                        numberOfSolved={this.state.numberOfSolved}
                        showFound={this.handleShowFound}
                      />{" "}
                    </div>
                    <div className="column">
                      {" "}
                      <input
                        className="button is-large"
                        readOnly
                        id="messageBoxBelow"
                        value={this.state.messageBoxBelow}
                        /*      value={JSON.stringify(this.state.messageBoxBelow)}*/
                      />{" "}
                    </div>

                    <div className="column">
                      <Message />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="footer">
            <div className="content has-text-centered">
              <Footer bottomConsoleText={this.state.bottomConsoleText} />
            </div>
          </footer>
        </section>
      </div>
    );
  }
}

export default App;
