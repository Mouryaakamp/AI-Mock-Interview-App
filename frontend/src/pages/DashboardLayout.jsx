import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function DashboardLayout() {
  return (
    <div>
      <Header />
      <div className='mx-5 md:mx-20 lg:mx-36'>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
