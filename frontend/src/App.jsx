import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './pages/DashboardLayout';
import Interview from './pages/Interview';
import StartInterview from './pages/StartInterview';
import Feedback from './pages/Feedback';
import Questions from './pages/Questions';
import Upgrade from './pages/Upgrade';
import How from './pages/How';

function App() {
  return (
   <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="interviews/:interviewid" element={<Interview />} />
          <Route path="interviews/:interviewid/start" element={<StartInterview />} />
          <Route path="interviews/:interviewid/feedback" element={<Feedback />} />
          <Route path="Questions" element={<Questions />} />
          <Route path="Upgrade" element={<Upgrade />} />
          <Route path="How" element={<How />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
   </>
  );
}

export default App;
