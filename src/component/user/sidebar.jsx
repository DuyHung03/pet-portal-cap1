import { useState } from 'react';

const Sidebar = ({ onSelectPage }) => {
    const [activePage, setActivePage] = useState('profile'); // Trạng thái của mục đang active

    const handlePageSelect = (page) => {
        setActivePage(page);
        onSelectPage(page); // Gọi hàm từ prop để thay đổi trang hiện tại
    };

    return (
        <aside className="w-64 bg-gray-800 text-white h-screen">
            {' '}
            {/* Full height */}
            <div className="flex items-center justify-center h-20 bg-purple-700">
                <h1 className="text-3xl font-bold">3MM</h1>
            </div>
            <nav className="mt-10">
                <button
                    onClick={() => handlePageSelect('profile')}
                    className={`flex items-center px-4 py-2 text-white w-full text-xl hover:bg-purple-600 transition-all duration-200 ${
                        activePage === 'profile' ? 'bg-purple-600' : ''
                    }`}
                >
                    Hồ sơ
                </button>
            </nav>
            <nav className="mt-4">
                <button
                    onClick={() => handlePageSelect('products')}
                    className={`flex items-center px-4 py-2 text-white w-full text-xl hover:bg-purple-600 transition-all duration-200 ${
                        activePage === 'products' ? 'bg-purple-600' : ''
                    }`}
                >
                    Sản Phẩm Đã Mua
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
