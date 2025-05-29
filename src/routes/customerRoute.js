import { Navigate, Outlet, useLocation } from 'react-router-dom';

const CustomerRoute = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');
  const location = useLocation();

  if (!token || role !== 'customer') {
    return (
      <Navigate 
        to="/customer-login" 
        state={{ message: 'Please login as a customer to continue', from: location }} 
        replace 
      />
    );
  }

  return <Outlet />;
};

export default CustomerRoute;
