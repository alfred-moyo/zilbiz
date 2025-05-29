import './App.css';
import CustomerLogin from './pages/Customer_login';
import CustomerSignup from './pages/Customer_signup';
import Reviews from './pages/Reviews';
import ContactUs from './pages/Contact';
import BusinessLogin from './pages/Business_login';
import BusinessSignup from './pages/Business_signup';
import About from './pages/About';
import FAQ from './pages/FAQ';
import BusinessListings from './pages/BusinessListings';
import TermsAndConditions from './pages/TermsAndConditions'
import TermsOfUse from './pages/TermsOfUse'
import Login from './pages/Login'
import CustomerRoute from './routes/customerRoute'
import BusinessDashboard from './pages/Business_dashboard'
import VerifiedDashboard from './pages/BusinessVerfied'
import CustomerDashboard from './pages/CustomerDashboard'
import GetVerified from './pages/business-onboarding/GetVerified';
import GetVerified2 from './pages/business-onboarding/GetVerified2';
import GetVerified3 from './pages/business-onboarding/GetVerified3';
import GetVerified4 from './pages/business-onboarding/GetVerified4';
import Home from './pages/Home';
import { 
  BrowserRouter as Router, 
  Route, 
  Routes } from 'react-router-dom';


function App() {
  return (
    <main className="main-content">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/customer-signup" element={<CustomerSignup />} />
          <Route path="/write-a-review" element={<Reviews />} />
          <Route path="/business-login" element={<BusinessLogin />} />
          <Route path="/business-signup" element={<BusinessSignup />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms&conditions" element={<TermsAndConditions />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/business-listings" element={<BusinessListings />} />
          <Route path='/business-dashboard' element={<BusinessDashboard />} />
          <Route element={<CustomerRoute />}>
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          </Route>
          <Route path="/get-verified" element={<GetVerified />} />
          <Route path="/get-verified2" element={<GetVerified2 />} />
          <Route path="/get-verified3" element={<GetVerified3 />} />
          <Route path="/get-verified4" element={<GetVerified4 />} />
          <Route path="/verified-business" element={<VerifiedDashboard />} />
        </Routes>
    </Router>
    </main>
  );
}

export default App;