import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VotingHistory from './pages/VotingHistory';
import CreateRoom from './pages/CreateRoom';
import VotingReady from './pages/VotingReady';
import Voting from './pages/Voting';
import UserWaiting from './pages/UserWaiting';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/votingHistory" element={<VotingHistory />} />
        <Route path="/createRoom" element={<CreateRoom />} />
        <Route path="/votingReady" element={<VotingReady />} />
        <Route path="/voting/:roomCode" element={<Voting />} />
        <Route path="/userWaiting" element={<UserWaiting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
