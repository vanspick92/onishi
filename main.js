"use strict";

// the filenames
const FILEPATH = "./photos/toppage_text/onishi_";
const EXTENSION = ".png";
const sequence = ["01", "02", "03", "04"];
const ANIMATION_SECONDS = 0.5;
const FADE_IN_SECONDS = 0.4;
const INITIAL_DELAY_SECONDS = 1;

const Img = ({ imgPath, zIndex, isVisible }) => {
  const [opacity, setOpacity] = React.useState(0);

  React.useEffect(() => {
    if (isVisible === true) setOpacity(1);
  }, [isVisible]);

  return (
    <img
      style={{
        position: "absolute",
        width: "100%",
        opacity: opacity,
        transition: `opacity ${FADE_IN_SECONDS * 1000}ms ease`,
        zIndex: zIndex,
      }}
      src={imgPath}
    />
  );
};

const Animation = () => {
  const [count, setCount] = React.useState(-1);

  React.useEffect(() => {
    // on mount an array of timeouts for switching opacity
    sequence.forEach((_, i) => {
      const seconds =
        (i + 1) * 1000 * ANIMATION_SECONDS + INITIAL_DELAY_SECONDS * 1000;
      setTimeout(() => {
        setCount((p) => p + 1);
      }, seconds);
    });
  }, []);

  const main = FILEPATH + "main" + EXTENSION;

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        maxWidth: 500,
        margin: "auto",
      }}
    >
      <Img imgPath={main} isVisible={true} />
      {sequence.map((name, i) => {
        const imgPath = FILEPATH + name + EXTENSION;
        const isVisible = i === count;

        return (
          <Img
            imgPath={imgPath}
            isVisible={isVisible}
            zIndex={i + 100}
            key={imgPath}
          />
        );
      })}
    </div>
  );
};

const App = () => {
  return <Animation />;

  const [liked, setLiked] = React.useState(false);

  if (liked) {
    return <Animation />;
  }

  return <button onClick={() => setLiked(true)}>click me!</button>;
};

const domContainer = document.querySelector("#root");
ReactDOM.render(<App />, domContainer);
