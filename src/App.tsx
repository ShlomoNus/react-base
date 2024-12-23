import "./App.css";
import Button from "@mui/material/Button";

function App() {
  const X = 2;

  console.log(X);

  return (
    <>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </>
  );
}

export default App;
