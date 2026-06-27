import RootNavigation from "./src/navigation/RootNavigation";
import { ThemeProvider } from "./src/constants/theme/contextProvider/ThemeProvider";
 

function App() {
  return (
    <ThemeProvider>
      <RootNavigation/>
    </ThemeProvider>
   
  );
}


export default App;
