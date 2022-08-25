import './App.css';
import Layout from './components/Layout/Layout';
import MenuPage from './components/Pages/Menu/MenuPage';
import HistoryPage from './components/Pages/History/HistoryPage';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<MenuPage />} />
					<Route path="/history" element={<HistoryPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
