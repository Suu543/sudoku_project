import React from "react";

const Tools = props => {
  const { getThisAsStr, goBackT , solve , deleteGame  ,newGame , stop  , showPopup ,togglePopup , showConnected , toggleConnected  } = props;


  return (
    <div className="">
      <div className="field is-grouped">

 

        <p className="control">
          <a href="#" className="button is-small is-link" onClick={solve}>
          Solve{" "}
          </a>
        </p>

        <p className="control">
          <a href="#" className="button is-small is-warning" onClick={stop}>
            Stop{" "}
          </a>
        </p>



        <p className="control"> 
          <a className="button is-small is-success" onClick={newGame}>
    New Game 
       
           
          </a>
          </p>


        <p className="control">
          <a className="button is-small is-danger" onClick={deleteGame}>Delete </a>
        </p>

        <p className="control">
          <a className="button is-small is-info" onClick={getThisAsStr}>
            Get this
          </a>
        </p>

        <p className="control">
          <a className="button is-small is-warning" onClick={goBackT}>
            Go Back
          </a>
        </p>
      
        <p className="control">
          <input type="checkbox"  defaultChecked={ showPopup}  onChange={ togglePopup }  />
          

          Show Cands {" "}
        
        </p>
        

  <p className="control">
          <input type="checkbox"  defaultChecked={ showConnected}  onChange={ toggleConnected }  />
          

          Show Connected Cells {" "}
        
        </p>
        
      
      </div>


    </div>
  );
};

export default Tools;
