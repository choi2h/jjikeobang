import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VotingHistory from './pages/VotingHistory';
import CreateRoom from './pages/CreateRoom';
import VoteAdmin from './pages/VoteAdmin';
import VoteUser from './pages/VoteUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/votingHistory" element={<VotingHistory />} />
        <Route path="/createRoom" element={<CreateRoom />} />
        <Route path="/voteAdmin" element={<VoteAdmin />} />
        <Route path="/voteUser" element={<VoteUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
