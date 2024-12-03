import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Calendar, UserCircle, Shield, MessageSquare, UsersRound } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
              <Calendar className="h-5 w-5" />
              <span>Events</span>
            </Link>
            <Link to="/users" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
              <Users className="h-5 w-5" />
              <span>Users</span>
            </Link>
            <Link to="/groups" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
              <UsersRound className="h-5 w-5" />
              <span>Groups</span>
            </Link>
            <Link to="/accounts" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
              <UserCircle className="h-5 w-5" />
              <span>Accounts</span>
            </Link>
            <Link to="/roles" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
              <Shield className="h-5 w-5" />
              <span>Roles</span>
            </Link>
            <Link to="/chat" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
              <MessageSquare className="h-5 w-5" />
              <span>Chat</span>
            </Link>
          </div>
          <div>
            {token ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}