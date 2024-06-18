import { Routes, Route } from 'react-router-dom';
import { RepositoriesScreen } from './screens/Repositories';

function App() {
  return (
    <Routes>
      <Route index element={<RepositoriesScreen />} />
    </Routes>
  );
}

export default App;
