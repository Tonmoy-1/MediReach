import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="spinner-text">Loading...</p>
    </div>
  );
};

export default Spinner;
