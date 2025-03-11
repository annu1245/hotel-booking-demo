import { useNavigate } from 'react-router-dom'

export default function AuthMiddleware({ component, ...rest }) {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  if (!user) {
    return navigate('/login');
  }
  return component
}
