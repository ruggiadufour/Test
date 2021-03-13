const ArrowLeft = ({ callback }) => (
  <img
    src="/icons/arrowleft.png"
    alt="left arrow"
    className="scroll-button scroll-button__left"
    onClick={callback}
  />
);
const ArrowRight = ({ callback }) => (
  <img
    src="/icons/arrowright.png"
    alt="right arrow"
    className="scroll-button scroll-button__right"
    onClick={callback}
  />
);

export { ArrowLeft, ArrowRight };
