import './how_to_paly.css';
const HowToPlay = ({ confirm }) => {
  return (
    <div className="full-screen white blue-font  ">
      <div className="constainer padding-small">
        <h2>How to play Mancala:</h2>
        <ol>
          <li>
            The game board includes 6 pits for each player and bank (on the
            right). In each pit are placed 4 beans.
          </li>
          <li>
            In turn - take in your hand all the beans from one of the pits on
            your side. In a clockwise direction, place one bean in each pit from
            your hand. The round includes your and your opponent's pit, and your
            bank (but not your opponent's bank).
          </li>
          <li>The round ends when the beans run out in your hand.</li>
          <li>
            If the last pool was placed in your bank - you got another turn
          </li>
          <li>
            If the last bean was placed in a pit that already has beans in it -
            take them and start another round.
          </li>
          <li>
            The game ends when the player has no more beans left on his side.
            The opponent wins all the beans left on his side.
          </li>
        </ol>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/-A-djjimCcM"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="row how-to-play">
          <a
            className="demo-video btn btn-yellow"
            href="https://www.youtube.com/watch?v=-A-djjimCcM"
            target={'_blank'}
            rel="noreferrer"
          >
            Demo video
          </a>
          <div
            className="btn btn-blue "
            id="confirm-btn"
            onClick={() => {
              confirm(true);
            }}
          >
            Got it!
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
