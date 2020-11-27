import React from "react";

const Banner = () => {
  return (
    <div>
      <React.Fragment>
        <section className="hero is-white is-fluid">
          <div className="hero-body">
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <div className="">
                  <a
                        class="button2"
                        href="http://learncodingfun.com/"
                      >
                      </a>

                      <br/>
                      <br/>
                    <h1 className="title">Sudoku</h1>
                    <br />
                    <h2 className="subtitle">Sudoku Game with React</h2>
                  </div>
                </div>
                <div class="level-item">
                  <div class="field has-addons">
                    <p class="control"> </p>
                    <p class="control"> </p>
                  </div>
                </div>
              </div>

              <div class="level-item">
                <div class="field has-addons">
                  <p class="control">
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                  <p class="control"></p>
                </div>
              </div>
            </nav>
          </div>
        </section>
      </React.Fragment>
    </div>
  );
};

export default Banner;
