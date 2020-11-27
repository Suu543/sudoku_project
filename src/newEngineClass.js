
class newE   {

    constructor(){
  
  
      Array.prototype.diff = function(a) {
        return this.filter(function(i) {return a.indexOf(i) < 0;});
    };
    
    Array.prototype.random = function () {
        return this[Math.floor((Math.random()*this.length))];
      }
  
  
  
    }
  
  
  
  
  
      //var foundItems = [];
  
      //var numberOfSolved = 0;
      
  
      
       
      
      /*
      *
      *
      *  TODO 
      * we will move other functions to here
      * this will be concise and awesome
      * Game info can be calculated easily
      * 
       */ 
      
   getCubeIndex (row, column){
        let cube = null;
        let rowDivision = Math.floor((row - 1) / 3);
        let columnDivision = Math.floor((column - 1) / 3);
        cube = rowDivision * 3 + columnDivision + 1;
        return cube;
      }
      
    convertIndexToId(index, value) {
        /* converts index such as 0 to "11"
         *
         *   [ 0,1,2,3,4 ] => { row : 1, column : 1 , row : 1 , column : 2 , ... so on }
         */
        let cube = 1;
      
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
      
        cube = getCubeIndex(division, reminder);
      
        let obj = { row: division, column: reminder, cube: cube, value: value };
       /* or we can write like this shortly */ 
      //  let obj = { row: division, column: reminder,  cube,  value };
        return obj;
      
      }
      
       getAllCellsInfo (cellValues) {
        /*
      0: {row: 1, column: 1, value: 9}
      1: {row: 1, column: 2, value: 8}
      2: {row: 1, column: 3, value: 1}
      3: {row: 1, column: 4, value: 0}
      */
      
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
      
      
      
      
      
      canWePutThis(cellValues, id, value) {
        /* we get array of available numbers and check if value exists in available candidates */ 
        let arr = this.whichValuesByPass(cellValues, id);
        console.log("canWe arr ", arr);
        if (arr.indexOf(parseInt(value)) > -1) {
          return true;
        } else {
          return false;
        }
      }
      
          errorCells(cellValues, id, value){
        let row = parseInt(id[0]);
        let column = parseInt(id[1]);
        let cube = this.getCubeIndex(row, column);
      
        let errorCellsIdArray = [] ;
      
      
        let allCells = this.getAllCellsInfo(cellValues);
      
      
           /* We get known numbers that restricts this Cell. We can not put those values  */ 
           let known = this.getKnownValues(allCells, row, column, cube);
      
           let knownValuesObj = known.knownValuesObj ; 
      
           knownValuesObj.map(elem=>{
      
            if (elem.v === parseInt(value ) ) {
              let id1 = elem.r ; 
              let id2 = elem.c ;
              let nid  = id1.toString() +id2.toString()  ;
              errorCellsIdArray.push(nid ) ; 
      
      
             }
      
      
           });
      
           console.log("known o", known.knownValuesObj);
      
      
           return errorCellsIdArray ; 
      
      
      
      
      
      }
      
       getBaseLog=(x, y)  {
        return Math.log(y) / Math.log(x);
      }
      
      
      /*
      
      
      
      */
      firstSolve (cellValues ){
      
        let gameInfo = this.checkTheGame(cellValues )   ;
        let allCellsWithCands = gameInfo.cells ; 
        let foundCells=[] ;
      
        //(cellValues )
        allCellsWithCands.map( elem =>{ 
      
          if( elem.cands!== undefined&& elem.cands.length === 1 ) { 
            console.log("Wowo found it " , elem );
           // alert("asd");
           foundCells.push( elem );
          }
        }); 
        return foundCells; 
        
        
      }
      
      
      //////////////////////////////////////////
     checkTheGame(cellValues ){
      
        let gameInfo = {} ; 
        let complexity =1  ; 
        let complexityLog ; 
      
        let filledCount =0 ;
        let emptyCount = 0 ;
      
      
      /* iterates all cells and gets candidates for empty cells 
      and return array of object allCells   */ 
      
      /*
                     allCells
                        2: {row: 1, column: 3, value: 1}
                        3: {row: 1, column: 4, value: 0}
                        */
        let allCells = this.getAllCellsInfo(cellValues);
      
        allCells.map( elem => { 
      
              if(elem.value> 0 ){
                filledCount++ ; 
      
      
              }else{ 
                emptyCount++ ; 
      
                let cands = this.whichValuesByRowColumnCube(cellValues, elem.row , elem.column , elem.cube   );
                console.log("cands", cands);
                elem.cands = cands ; 
      
                complexity = complexity* cands.length; 
      
      
              }
      
        } ); 
      
        complexityLog = getBaseLog(10, complexity);
      
        gameInfo = { cells : allCells , complexity , emptyCount ,filledCount ,complexityLog } ; 
        return gameInfo ;
      
      
      
      
      
      }
      
      
      
      whichValuesByRowColumnCube(cellValues, row , column , cube   ) {
        /* returns available candidates for row , column , cube  */
        let allCells = this.getAllCellsInfo(cellValues);
       
        
         /* We get known numbers that restricts this Cell. We can not put those values  */ 
        let known = this.getKnownValues(allCells, row, column, cube);
        console.log("known", known);
      
        /* using underscore library we will get numbers that exists in first array that do not exist in the other */ 
        let candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9].diff( known.knownValues);
        console.log("candidates", candidates);
        return candidates;
      }
      
      
        whichValuesByPass(cellValues, id) {
        /* returns available candidates for the id  */
        let allCells = this.getAllCellsInfo(cellValues);
      
        let row = parseInt(id[0]);
        let column = parseInt(id[1]);
      
        console.log("allCells", id, allCells);
        /* We will get cube index from Id row and column  */ 
        let cube = this.getCubeIndex(row, column);
        
      
        return this.whichValuesByRowColumnCube(cellValues, row , column , cube   ) ; 
      
      }
      
      
         getKnownValues(allCells, row, column, cube) {
        let knownValues = [];
        let knownValuesObj = [];
      
        /*
      0: {r: 1, c: 1, cub: 1, v: 4}
      1: {r: 1, c: 5, cub: 2, v: 9}
      2: {r: 1, c: 8, cub: 3, v: 7}
      3: {r: 2, c: 7, cub: 3, v: 9}
      4: {r: 3, c: 9, cub: 3, v: 2}
      5: {r: 4, c: 9, cub: 6, v: 1}
      6: {r: 6, c: 9, cub: 6, v: 4}
      7: {r: 9, c: 9, cub: 9, v: 5}
      
      */
      
        allCells.map(elem => {
          if (elem.value > 0) {
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
      
      
      
      
       
      /*
      * This function returns our games and their levels to load 
      *
      */
      
      
         getFirstValue()  {
        var stArr = [];
      
        var st;
        var level;
        var OyunObj;
      
        level = "medium";
        st =
          "6;3;;;;;;;;7;;4;;;5;;;;;1;5;;4;;;;6;5;;7;;;8;;;;;8;;;2;;;1;;;;;5;;;3;;7;4;;;;6;;1;7;;;;;9;;;2;;5;;;;;;;;4;3;";
        OyunObj = { str: st, level: level };
        stArr.push(OyunObj);
      
        st =
          ";;;;2;3;;;;;5;6;;;4;;1;2;;3;7;;;;;;5;;;2;;;;;6;;1;8;;;;;;9;7;;9;;;;;2;;;4;;;;;;8;3;;7;2;;3;;;6;5;;;;;6;9;;;;;";
      
        level = "easy";
        OyunObj = { str: st, level: level };
      
        stArr.push(OyunObj);
      
        // medium
        st =
          ";8;3;;;2;;1;;;;;;3;;;;4;;2;7;;;;;;8;;;5;;7;;;3;;;;;5;8;6;;;;;6;;;4;;1;;;9;;;;;;5;7;;3;;;;1;;;;;;7;;6;;;4;9;;";
        level = "medium";
        OyunObj = { str: st, level: level };
      
        stArr.push(OyunObj);
      
        // hard
        st =
          ";;6;;;5;;;;1;9;;;;;;;;;;7;;1;2;;4;;3;7;;;9;1;;5;;8;;;;;;;;1;;1;;7;5;;;6;3;;4;;1;7;;6;;;;;;;;;;1;9;;;;5;;;8;;;";
        level = "hard";
        OyunObj = { str: st, level: level };
      
        stArr.push(OyunObj);
      
        st =
          "4;;;;9;;;7;;;;;2;;6;9;;;;;;;;7;;;2;3;8;;9;;;;;1;;2;4;;;;6;3;;9;;;;;3;;5;4;8;;;4;;;;;;;;1;6;;8;;;;;9;;;7;;;;5;";
        level = "easy";
        OyunObj = { str: st, level: level };
      
        stArr.push(OyunObj);
      
        st =
          "9;8;1;;;6;4;5;;;;;4;;;1;;7;;;;;;;;;;;;;;2;;;4;;1;;9;;;;2;;3;;3;;;1;;;;;;;;;;;7;;;6;;3;;;5;;;;;1;8;9;;;5;2;6;";
        level = "hard";
      
        OyunObj = { str: st, level: level };
      
        stArr.push(OyunObj);
      
        //var st = Engine.getFirstValue();
      
        return stArr.random( );
      }
  
      
  
   
   
  
  }
  
  const newEngine=new newE();
  console.log(newEngine) ; 
  
  
  
  
  