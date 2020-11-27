/**
 * Wrapper for Lodash's template utility to allow loading templates from files.
 * @module sudoku/newE
 */

import _ from "underscore";

class newE {
  /**
   *  Engine functions to handle sudoku game
   */

  constructor() {}

  /**
   * Goes to the cell next
   * @param {string } id  - id of the current cell
   * @param {Array} cellValues - current values on the board
   * @return {function}
   */

  goNext(id, cellValues) {
    console.log("go next was called ", id, cellValues);

    let index = parseInt(this.convertIdToIndex(id));

    console.log("this should give index of the current cell", index);
    let nextIndex = this.getNextEmpty(index, cellValues);

    console.log("find next index( +1 )", nextIndex);
    let idObj = this.convertIndexToId(nextIndex);
    id = idObj.row.toString() + idObj.column.toString();

    //id = nextIndex
    console.log("this should be next available empty cell id", id);
    return id;
  }
  /**
   * gets the next empty cell
   * @param {number } index  - index of cell between 0-80
   * @param {Array} cellValues - current values on the board
   * @return {function}
   */

  getNextEmpty(index, cellValues) {
    index = index + 1;
    let count = -1;

    let IndexToReturn = null;

    if (index > 80) {
      index = 0; // false; /* index = 1 ; */
    }

    let allCells = this.getAllCellsInfo(cellValues);

    // console.log("id, allCells", index, allCells);

    allCells.map(element => {
      count++;

      if (count === index) {
        if (parseInt(element.value) === 0) {
          console.log("this is allcells", allCells);
          console.log(
            "this should be next empty cell value and index of it  ",
            element.value,
            count
          );
          IndexToReturn = index;
        } else {
          IndexToReturn = false;
        }
      }
    });
    if (IndexToReturn === false) {
      return this.getNextEmpty(index, cellValues);
    }
    return IndexToReturn;
  }

  //0;0;6;0;0;5;0;0;0;1;9;0;0;0;0;0;0;0;0;0;7;0;1;2;0;4;0;3;7;0;0;9;1;0;5;0;8;0;0;0;0;0;0;0;1;0;1;0;7;5;0;0;6;3;0;4;0;1;7;0;6;0;0;0;0;0;0;0;0;0;1;9;0;0;0;5;0;0;8;0;0;

  /** this will give us the current game as a String. We can store it for later use.
   * or if we like we can write another function which will give as a stringify of JSON
   * to store first games
   * But I think this one is easier..
   * @param {Array} cellValues - current values on the board
   * @return {string}  - formatted string of the board values
   */

  getThis(cellValues) {
    let allCells = this.getAllCellsInfo(cellValues);

    console.log(allCells);
    let str = "";
    allCells.map(element => {
      if (parseInt(element.value) === 0) {
        str = str + ";";
      } else {
        str = str + element.value + ";";
      }
    });

    return str;
  }

  /**
   * gets the next empty cell
   * @param {number } row  - row number of the cell
   * @param {number} column -column  number of the cell
   * @return {number}  cube- cube number between 1-9
   */

  getCubeIndex(row, column) {
    let cube = null;
    let rowDivision = Math.floor((row - 1) / 3);
    let columnDivision = Math.floor((column - 1) / 3);
    cube = rowDivision * 3 + columnDivision + 1;
    return cube;
  }

  /**
   * calculates Id of the cell from row number and column number
   * @param {number } row  - row number of the cell
   * @param {number} column -column  number of the cell
   * @return {number}  cube- cube number between 1-9
   */

  getIdfromRowColumn(row, column) {
    let id = row.toString() + column.toString();
    return id;
  }
  /**
     * calculates index from ID - "12"=> index number : 1 of  [0-80] 
     * @param {string  } id  - row number of the cell 
 
     * @return {number}  index- index number between  [0-80]  
     */

  convertIdToIndex(id) {
    let index = (parseInt(id[0]) - 1) * 9 + parseInt(id[1]) - 1;
    return index;
  }

  /**
   * converts index such as 0 to "11"
   *
   *    0 , 9    => { row : 1, column : 1  , value : 9   }
   * @param {string  } index  - row number of the cell
   * @param {number  } value  - row number of the cell
   * @return {object}  obj- { row: division, column: reminder,  cube,  value };
   */

  convertIndexToId(index, value) {
    /* converts index such as 0 to "11"
     *
     *    0    => { row : 1, column : 1 , row : 1   }
     */

    let num = parseInt(index, 10) + 1; //  num :  1
    let division = Math.floor(num / 9) + 1;
    //  console.log( "division" ,  division );
    //   round ( 1 / 9 )  : 0 + 1 : 1
    let reminder = num % 9; // reminder : 1
    if (reminder === 0) {
      division = division - 1;
      reminder = 9;
    }
    value = parseInt(value) || 0;

    let cube = this.getCubeIndex(division, reminder);

    let obj = { row: division, column: reminder, cube: cube, value: value };
    /* or we can write like this shortly */

    //  let obj = { row: division, column: reminder,  cube,  value };
    return obj;
  }

  /**
     * get current detail information of all 81 cells
     *     0: {row: 1, column: 1, value: 9}
    * 1: {row: 1, column: 2, value: 8}
    * 2: {row: 1, column: 3, value: 1}
    * 3: {row: 1, column: 4, value: 0}
    * @param { Array } cellValues  - row number of the cell 
 
     * @return {object}  objArray-        * 1: {row: 1, column: 2, value: 8}
    * 2: {row: 1, column: 3, value: 1}
    * 3: {row: 1, column: 4, value: 0}
     */

  getAllCellsInfo(cellValues) {
    let count = 0;
    let objArray = [];
    cellValues.map(value => {
      let g = this.convertIndexToId(count, value);
      objArray.push(g);
      // console.log(  "cellValues" , cellValues  , g ) ;
      count++;
    });

    return objArray;
  }
  /**
   * calculates Id of the cell from row number and column number
   * we get array of available numbers and check if value exists in available candidates
   * @param {number } row  - row number of the cell
   * @param {number} column -column  number of the cell
   * @return {Boolean }  `true` - if we can put this value to the current cell
   *
   * */

  canWePutThis(cellValues, id, value) {
    let arr = this.whichValuesById(cellValues, id);
    // console.log("canWe arr ", arr);
    if (arr.indexOf(parseInt(value)) > -1) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * check all the cells connected to the current cell and if the value matches
   * return their ids as an array for notification error
   *
   * @param {Array } cellValues  - row number of the cell
   * @param {string} id -column  number of the cell
   * @param {number} value -column  number of the cell
   *
   * @return {Array }  errorCellsIdArray - array of IDs that value matches
   *
   * */

  errorCells(cellValues, id, value) {
    let row = parseInt(id[0]);
    let column = parseInt(id[1]);
    let cube = this.getCubeIndex(row, column);

    let errorCellsIdArray = [];

    let allCells = this.getAllCellsInfo(cellValues);

    /* We get known numbers that restricts this Cell. We can not put those values  */

    let known = this.getKnownValues(allCells, row, column, cube);

    let knownValuesObj = known.knownValuesObj;

    knownValuesObj.map(elem => {
      if (elem.v === parseInt(value)) {
        let id1 = elem.r;
        let id2 = elem.c;
        let nid = id1.toString() + id2.toString();
        errorCellsIdArray.push(nid);
      }
    });

    //  console.log("known o", known.knownValuesObj);

    return errorCellsIdArray;
  }

  getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }

  /**
   * check all the cells connected to the current cell and if the value matches 
   * return their ids as an array for notification error 
   *  
   * @param {Array } cellValues  - board values 

   * 
   * @return {object }  foundCells - array of this object  obj = { value: numb + 1, detail: storeObjArray[numb] };
   *  
   * @function secondSolve 
   * */

  secondSolve(cellValues) {
    let gameInfo = this.checkTheGame(cellValues);

    let allCellsWithCands = gameInfo.cells;

    // console.log("allCellsWithCands", allCellsWithCands);

    let foundCells = [];

    let refs = ["cube", "row", "column"];
    refs.map(ref => {
      let simple9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      // cube : 1  , cube 2  , ... row 1, row 2  ... , column 1 , 2 ...

      simple9.map(num => {
        let res = this.checkCandsDynamic(ref, num, allCellsWithCands);
      

        if (res.length > 0) {
         
          //console.log( res , "res ");
          foundCells =  foundCells.concat( res );
         
        }
      });
    });



    return foundCells;
  }

  /**
   * check all the cells for the second algorithm
   * return their information as object to
   * @see  {@link secondSolve}
   *
   * @param {string } ref  -  row | column | cube
   * @param {number } refValue  -  value [ 1 - 9 ]
   * @param {Array } cellValues  - board values
   *
   * @return {object }  foundCells - array of this object  obj = { value: numb + 1, detail: storeObjArray[numb] };
   *
   *
   * */

  checkCandsDynamic(ref, refValue, allCellsWithCands) {
    // ref will be either of these
    // row | column | cube
    let count = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    let storeObjArray = [];

    let foundCellsObjArr = [];

    allCellsWithCands.map(elem => {
      //  console.log("I was here ", elem[ref], elem.cands);
      // now we are in a certain cube or row or column
      if (elem[ref] === refValue && elem.cands !== undefined) {
        elem.cands.map(candOne => {
          /* Here we just want to count what is the freq. of a cand. in certain cells */

          // we have an empty cell

          count[candOne - 1] = count[candOne - 1] + 1;

          storeObjArray[candOne - 1] = elem;
        });
      }
    });

    // now we have an array like this
    // [ 0,0,2,3,1,0,0,3,4,5]
    // bingo we have this guy right here just we can put it only to this cell in these 9 cells
    // and the value is el + 1
    // however we
    let numb = -1;

    count.map(el => {
      numb++;

      if (el === 1) {
        if (storeObjArray[numb]) {
          let obj = { value: numb + 1, detail: storeObjArray[numb] };
          foundCellsObjArr.push(obj);
        }
      }
    });

    // console.log("foundCellsObjArr", foundCellsObjArr);

    return [...foundCellsObjArr ];
  }
  /**
   * starts trying values for a couple of cells
   *
   * @param {Array } cellValues  - board values
   *
   * @return {object }  foundCells - array of this object  obj = { value: numb + 1, detail: storeObjArray[numb] };
   *
   *
   * */

  feelLucky(cellValues) {
    let gameInfo = this.checkTheGame(cellValues);
    let allCellsWithCands = gameInfo.cells;
    let foundCells = [];

    //(cellValues )
    allCellsWithCands.map(elem => {
      // our Best empty cells are the ones which have two candidates
      // lets return them for our application to make educated guesses
      
      if (elem.cands !== undefined && elem.cands.length === 2) {
        //console.log("feelLucky I  could not find any cell with two cands");
        // alert("0");
        foundCells.push(elem);
        //return elem ;
      }
    });

    if (foundCells.length === 0) {
      console.log("feelLucky I  could not find any cell with two cands");
      // alert("0");
      allCellsWithCands.map(elem => {
        if (elem.cands !== undefined && elem.cands.length > 0) {
          //console.log("Wowo found it ", elem);
          // alert("asd");
          foundCells.push(elem);
          //return elem ;
        }
      });
    }

    return foundCells;
  }

  /**
   * starts solving the game
   *
   * @param {Array } cellValues  - board values
   * @return {object }  foundCells - array of this object  obj = { value: numb + 1, detail: storeObjArray[numb] };
   *
   *
   * */

  firstSolve(cellValues) {
    let gameInfo = this.checkTheGame(cellValues);
    let allCellsWithCands = gameInfo.cells;
    let foundCells = [];

    //(cellValues )
    allCellsWithCands.map(elem => {
      if (elem.cands !== undefined && elem.cands.length === 1) {
        //console.log("Wowo found it ", elem);
        // alert("asd");
        foundCells.push(elem);
      }
    });
    return foundCells;
  }
  /**
   * checks the current state of the game
   * creates game info for gameinfo panel complexity etc. 
   *   
   * @param {Array } cellValues  - board values 
   * @return {object }  foundCells - array of this object  obj = { value: numb + 1, detail: storeObjArray[numb] };
   *  
   *     gameInfo = {
      cells: allCells,
      complexity,
      emptyCount,
      countFilledCells,
      complexityLog

   * */

  //////////////////////////////////////////
  checkTheGame(cellValues) {
    let gameInfo = {};
    let complexity = 1;
    let complexityLog;

    let countFilledCells = 0;
    let emptyCount = 0;

    /* iterates all cells and gets candidates for empty cells 
    and return array of object allCells   */

    /*
                   allCells
                      2: {row: 1, column: 3, value: 1}
                      3: {row: 1, column: 4, value: 0}
                      */
    let allCells = [...this.getAllCellsInfo(cellValues)];

    allCells.map(elem => {
      if (parseInt(elem.value) > 0) {
        countFilledCells++;
      } else {
        emptyCount++;

        let cands = this.whichValuesByRowColumnCube(
          cellValues,
          elem.row,
          elem.column,
          elem.cube
        );
        // console.log("cands", cands);
        elem.cands = cands;

        complexity = complexity * cands.length;
      }
    });

    complexityLog = this.getBaseLog(10, complexity);

    gameInfo = {
      cells: allCells,
      complexity,
      emptyCount,
      countFilledCells,
      complexityLog
    };
    return gameInfo;
  }

  /**
   * checks the current state if there is any error 
   *  
   *   
   * @param {Array } cellValues  - board values 
   * @return {Boolean }   `true` - everycell looks ok.
   *  
 
   * */

  checkNow(cellValues) {
    let gameInfo = this.checkTheGame(cellValues);
    let cellsDetail = gameInfo.cells;
    cellsDetail.map(elem => {
      if (parseInt(elem.value) === 0 && elem.cands.length === 0) {
        console.log("stop please ", gameInfo, elem.row, elem.column, elem.cube);
        // alert( "stop please " );
        return false;
      }
    });

    return true;
  }

  /**
   * finds which values are ok for this cell 
   *  
   *   
   * @param {Array } cellValues  - board values 
   * @param {number } row  - board values 
   * @param {number } column  - board values 
   * @param {number } cube  - board values 
   * @return {Array }   candidates - candidates for the empty cell 
   *  
 
   * */

  whichValuesByRowColumnCube(cellValues, row, column, cube) {
    /* returns available candidates for row , column , cube  */
    let allCells = this.getAllCellsInfo(cellValues);

    /* We get known numbers that restricts this Cell. We can not put those values  */

    let known = this.getKnownValues(allCells, row, column, cube);
    // console.log("known", known);

    /* using underscore library we will get numbers that exists in first array that do not exist in the other */

    let candidates = _.difference(
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      known.knownValues
    );

    // or we can use without _ array prototype [1, 2, 3, 4, 5, 6, 7, 8, 9].diff(known.knownValues);
    //console.log("candidates", candidates);

    return candidates;
  }
  /**
   * finds which values are ok for   cell  by ID 
   *  
   *   
   * @param {Array } cellValues  - board values 
   * @param {string } id  - id of the cell 
 
   * @return {Array }   candidates - candidates for the empty cell 
   *  
 
   * */

  whichValuesById(cellValues, id) {
    /* returns available candidates for the id  */
    let allCells = this.getAllCellsInfo(cellValues);

    let row = parseInt(id[0]);
    let column = parseInt(id[1]);

    // console.log("allCells", id, allCells);
    /* We will get cube index from Id row and column  */

    let cube = this.getCubeIndex(row, column);

    return this.whichValuesByRowColumnCube(cellValues, row, column, cube);
  }

  /**
   * gets row, column, cube information for the values known
   * and creates an array of object such as 
    0: {r: 1, c: 1, cub: 1, v: 4}
    1: {r: 1, c: 5, cub: 2, v: 9}
    2: {r: 1, c: 8, cub: 3, v: 7}
   *  
   *   
   * @param {Array } cellValues  - board values 
   * @param {number } row  - board values 
   * @param {number } column  - board values 
   * @param {number } cube  - board values 
   *  
   * @return {object } - {  array , Array of object  }  - { knownValues, knownValuesObj }  
   *  knownValuesObj = {
            r: elem.row,
            c: elem.column,
            cub: elem.cube,
            v: elem.value
          };
 
   * */

  getKnownValues(allCells, row, column, cube) {
    let knownValues = [];
    let knownValuesObj = [];

    allCells.map(elem => {
      if (parseInt(elem.value) > 0) {
        if (elem.row === row || elem.column === column || elem.cube === cube) {
          let obj = {
            r: elem.row,
            c: elem.column,
            cub: elem.cube,
            v: elem.value
          };

          knownValues.push(elem.value);
          knownValuesObj.push(obj);
        }
      }
    });

    return { knownValues, knownValuesObj };
  }

  checkIfCellsProper(cellValues) {
    // let knownObj  = this.getKnownValues( )

    let cells = this.getAllCellsInfo(cellValues);
    let cubeNumbers = new Array(9).fill(null);

    cells.map(elem => {
      let cube = elem.cube;
      let row = elem.row;
      let column = elem.column;
      let filln = [];

      if (elem.value > 0) {
        if (cubeNumbers[cube - 1] !== null) {
          filln = [...cubeNumbers[cube - 1]];
        }

        filln.push(elem.value);
        cubeNumbers[cube - 1] = filln;
        filln = [];
      }
    });
    console.log("cubeNumbers", cubeNumbers);

    let result = [];

    cubeNumbers.map(arr => {
      result.push(this.checkIfArrayHasDup(arr));
    });

    if (result.indexOf(true) > -1) {
      return false;
    } else {
      return true;
    }
  }

  checkIfArrayHasDup(arr) {
    if (arr === null) {
      return false;
    }
    let narr = [...arr];

    let gg = _.union(narr, arr);

    if (narr.length === gg.length) {
      console.log("No we do not have dups");
      return false;
    } else {
      console.log("yes we do ", gg, narr);
      return true;
    }
  }
}

export default newE;
