import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-10">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div>
                    <h2 className="text-2xl font-bold text-blue-600 flex items-center">
                        Pet Shop<span className="text-blue-500 ml-1">®</span>
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Pet Shop là nhãn hiệu của các sản phẩm may mặc thiết kế
                        và sản xuất gồm các mặt hàng thời trang (quần, áo,
                        váy,...), túi xách, ba-lô, bóp, phụ kiện các loại, các
                        mặt hàng phòng ngủ, phòng bếp và rất nhiều sản phẩm
                        khác,...
                    </p>
                    <div className="mt-4 text-gray-700">
                        <div className="flex items-center mb-2">
                            <PhoneIcon className="text-green-500 mr-2" />
                            0937.809.123
                        </div>
                        <div className="flex items-center">
                            <EmailIcon className="text-green-500 mr-2" />
                            kinhdoanh@petshop.vn
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Chăm Sóc Khách Hàng
                        </h3>
                        <ul className="text-gray-600 space-y-2">
                            <li>Liên hệ hỗ trợ</li>
                            <li>Hướng dẫn mua hàng</li>
                            <li>Quan điểm kinh doanh</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Chính Sách
                        </h3>
                        <ul className="text-gray-600 space-y-2">
                            <li>Chính Sách Đổi Hàng</li>
                            <li>Chính Sách Vận Chuyển</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Đăng Ký Nhận Tin
                    </h3>
                    <form className="flex flex-col space-y-4">
                        <input
                            type="email"
                            placeholder="Email của bạn"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Đăng ký
                        </button>
                    </form>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
