import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

const links = [
 
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/my-services', label: 'Services' },
    { path: '/service-request', label: 'Requests' },
    { path: '/bookings', label: 'Bookings' },
    { path: '/active-services', label: 'Active Services' },
    { path: '/complaints', label: 'Complaints' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/advertisement', label: 'Advertisements' },
   
    { path: '/transactions', label: 'Transactions' },
    { path: '/history', label: 'History' },
    { path: '/help-center', label: 'Help Center' },
    { path: '/terms-and-conditions', label: 'Terms & Conditions' },
    { path: '/about', label: 'About Us' },
    { path: '/invite-friend', label: 'Invite a Friend' },
];

const Sidebar = ({ isSidebarOpen, toggleSidebar, isAuthenticated, onLogout }) => {
    return (
        isAuthenticated && (  // Render the sidebar only if authenticated
            <div className='flex'>
                <div
                    className={`fixed top-12 h-full left-0 w-60 bg-dark-gray text-primary transform transition-transform sm:translate-x-0 sm:w-46 z-40 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <ul className="p-4 mt-10 space-y-2">
                        {links.map((link) => (
                            <li key={link.path}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `block px-4 rounded transition-colors ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                                    }
                                    onClick={toggleSidebar}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Conditional Rendering of Logout Button */}
                    <div className="sm:hidden px-6 py-3 border-t border-gray-700">
                        <Link
                            className="w-full text-primary hover:bg-gray-700 rounded px-4 py-2 flex items-center"
                            onClick={onLogout}
                        >
                            Logout <FaSignOutAlt className="ml-2" />
                        </Link>
                    </div>
                </div>

                {/* Overlay for mobile when sidebar is open */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-secondary bg-opacity-50 z-30 sm:hidden"
                        onClick={toggleSidebar}
                    ></div>
                )}
            </div>
        )
    );
};

export default Sidebar;
