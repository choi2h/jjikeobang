import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VotingHistory from './pages/VotingHistory';
import CreateRoom from './pages/CreateRoom';
import VotingReady from './pages/VotingReady';
import Voting from './pages/Voting';
import AdminWaiting from './pages/AdminWaiting';
import UserWaiting from './pages/UserWaiting';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/votingHistory" element={<VotingHistory />} />
        <Route path="/createRoom" element={<CreateRoom />} />
        <Route path="/votingReady" element={<VotingReady />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/adminWaiting" element={<AdminWaiting />} />
        <Route path="/userWaiting" element={<UserWaiting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
