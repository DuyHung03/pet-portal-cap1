import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPhone,
    faEnvelope,
    faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
    return (
        <div className="bg-white py-10">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Thông tin liên hệ
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Petshop thuộc công ty TNHH May Mặc Thăng Long là thương
                        hiệu hơn 20 năm lĩnh vực dệt may thủ công truyền thống.
                        Chuyên xuất khẩu các sản phẩm từ cotton 100% từ thiết kế
                        đến sản xuất: túi xách, ba-lô, bóp ví, phụ kiện thời
                        trang,... uy tín.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start text-gray-700">
                            <FontAwesomeIcon
                                icon={faMapMarkerAlt}
                                className="text-red-500 mr-3 mt-1"
                            />
                            <div>
                                <span className="font-semibold">Địa chỉ:</span>{' '}
                                62/4 Trần Bình Trọng, Phường 8, TP. Vũng Tàu
                            </div>
                        </li>
                        <li className="flex items-start text-gray-700">
                            <FontAwesomeIcon
                                icon={faPhone}
                                className="text-green-500 mr-3 mt-1"
                            />
                            <div>
                                <span className="font-semibold">
                                    Điện thoại:
                                </span>{' '}
                                0937.809.123
                            </div>
                        </li>
                        <li className="flex items-start text-gray-700">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="text-red-500 mr-3 mt-1"
                            />
                            <div>
                                <span className="font-semibold">Email:</span>{' '}
                                kinhdoanh@petshop.vn
                            </div>
                        </li>
                    </ul>
                    <div className="mt-6">
                        <iframe
                            className="w-full h-64 rounded-md"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.635396482237!2d107.123456!3d10.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x123456789abcdef!2zQ8O0bmcgVHkgVE5ISCBNYXkgTWHhuqFjIFRow6BuaCBMb25n!5e0!3m2!1sen!2s!4v1234567890"
                            allowFullScreen=""
                            loading="lazy"
                            title="Petshop Location"
                        ></iframe>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Bạn có bất kỳ câu hỏi nào?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Bạn có câu hỏi, nhận xét hoặc ý tưởng tuyệt vời muốn
                        chia sẻ? Gửi cho chúng tôi một ghi chú nhỏ bên dưới -
                        chúng tôi muốn nghe ý kiến của bạn và sẽ luôn trả lời!
                    </p>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    Họ và tên
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nhập họ và tên"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    Email<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Nhập địa chỉ Email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Điện thoại
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="Nhập số điện thoại"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Nội dung<span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows="4"
                                placeholder="Nội dung liên hệ"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                        >
                            Gửi tin nhắn
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
