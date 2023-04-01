import "../styles/inputField.css";
export default function InputField(props: any) {
  const { zipCode, setZipCode, getTemperature, error, title } = props;

  function handleKeyDown(e: any) {
    if (e.key === "Enter") {
      getTemperature();
    }
  }

  return (
    <div className="input-field">
      <input
        type="number"
        min="0"
        placeholder={"Enter zip code"}
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <button onClick={getTemperature} disabled={zipCode.length === 0}>
        Submit
      </button>
      {error && <div className="error">Sorry :( Something went wrong!</div>}
    </div>
  );
}
