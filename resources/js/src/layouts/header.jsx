import React from "react";

function Header() {
    return (
        <div>
            <div className="flex justify-between items-center w-full max-h-[50px] min-h-[50px] px-6 bg-gray-300 sticky top-0 z-50">
                {/* Left Controller */}
                <div className="flex text-[15px]">
                  <div>Toggle Button</div>
                </div>

                {/* User Info*/}
                <div className="flex space-x-4 text-[15px]">
                    <div className="flex">UserAvatar</div>
                    <div className="flex">UserName</div>
                  
                    {/* Right Controller */}
                    <div className="flex">Menu Dropdown</div>
                </div>
            </div>
        </div>
    );
}

export default Header;
