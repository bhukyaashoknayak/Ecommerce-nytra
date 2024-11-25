import { NavLink } from "react-router-dom";
import { FaPlusCircle, FaShoppingCart } from "react-icons/fa";  // Import React Icons

const Sidebar = () => {
    return (
        <div className="flex">
            <div className="w-1/5 sm:w-1/5 bg-white text-black p-4 sm:p-6 flex flex-col border-r-2 shadow-md fixed h-full pt-14">
                <div className="text-sm sm:text-xl font-bold text-black mb-6 flex items-center justify-center sm:justify-start gap-2 mt-16">
                    {/* <DashboardIcon fontSize="small" /> */}
                    <span className="hidden sm:inline">Admin Panel</span>
                </div>
                <div className="space-y-4">
                    <NavLink
                        to="/add"
                        className={({ isActive }) =>
                            `flex items-center justify-center sm:justify-start gap-2 p-2 rounded-md transition-colors text-black ${isActive ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-200'}`
                        }
                    >
                        <FaPlusCircle className="text-lg" />  {/* Add Item Icon */}
                        <span className="hidden sm:inline">Add Items</span>
                    </NavLink>
                    <NavLink
                        to="/lists"
                        className={({ isActive }) =>
                            `flex items-center justify-center sm:justify-start gap-2 p-2 rounded-md transition-colors text-black ${isActive ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-200'}`
                        }
                    >
                        <FaShoppingCart className="text-lg" />  {/* List Item Icon */}
                        <span className="hidden sm:inline">List Items</span>
                    </NavLink>
                    <NavLink
                        to="/orders"
                        className={({ isActive }) =>
                            `flex items-center justify-center sm:justify-start gap-2 p-2 rounded-md transition-colors text-black ${isActive ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-200'}`
                        }
                    >
                        <FaShoppingCart className="text-lg" />  {/* Orders Icon */}
                        <span className="hidden sm:inline">Orders</span>
                    </NavLink>
                </div>
            </div>
            <div className="w-4/5 sm:w-4/5 ml-auto p-4 pt-10 overflow-y-auto mt-5">
            </div>
        </div>
    );
};

export default Sidebar;
