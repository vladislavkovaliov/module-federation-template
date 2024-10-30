// TODO: typesctip types(optional)

import { HostButton } from "remoteApp/HostButton";
import { PlainButton } from "remoteApp/PlainButton";

function App() {
  return (
    <div>
      <div>Demo React with vite</div>
      <HostButton />
      <PlainButton />
      <div>Import HostButton components via federation</div>
    </div>
  );
}

export default App;
