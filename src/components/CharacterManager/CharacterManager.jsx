import "./CharacterManager.css";
import useCharacterApi from "./useCharacterApi";

const CharacterManager = ({ characterAttributes, actionType }) => {
  const githubUsername = "pxlu";
  const apiUrl = `https://recruiting.verylongdomaintotestwith.ca/api/${githubUsername}/character`;

  const method = actionType === "save" ? "POST" : "GET";
  const { response, loading, error, sendRequest } = useCharacterApi(
    githubUsername,
    apiUrl,
    method
  );

  const handleRequest = () => {
    if (actionType === "save") {
      sendRequest({ attributes: characterAttributes });
    } else {
      sendRequest();
    }
  };

  return (
    <div className="character-manager">
      <button onClick={handleRequest} disabled={loading}>
        {loading
          ? actionType === "save"
            ? "Saving..."
            : "Loading..."
          : actionType === "save"
          ? "Save Character"
          : "Load Character"}
      </button>
      {error && <div className="error">Error: {error}</div>}
      {response && <div>Response: {JSON.stringify(response)}</div>}
    </div>
  );
};

export default CharacterManager;
