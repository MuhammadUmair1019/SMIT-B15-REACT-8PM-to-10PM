import { Navigate } from "react-router-dom";
// import { useAuth } from '../context/AuthContext';

export default function PrivateRoute(props) {
  //   const { currentUser } = useAuth();

  return props.user ? props.children : <Navigate to="/login" />;
}
