import { useState, useEffect } from 'react';
import { vietnameseDate } from '../../util/getDateInVietnamese';
import logo from '../../assets/logo-transparent.png';
import axiosInstance from '@network/httpRequest';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditCouponModal from '../../component/shop-dashboard/edit-coupon/EditCoupon';
import AddCouponModal from '../../component/shop-dashboard/add-coupon/AddCoupon';

const Coupon = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [notification, setNotification] = useState('');
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [formData, setFormData] = useState({
        description: '',
        discount_value: '',
        start_date: '',
        end_date: '',
    });

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const response = await axiosInstance.get('/coupons');
            setCoupons(response.data.data);
        } catch (error) {
            console.error('Lỗi khi lấy mã giảm giá:', error);
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(''), 3000);
    };

    const formatDate = (date) => {
        if (!date) return '';
        const [year, month, day] = date.split('T')[0].split('-');
        return `${day}/${month}/${year}`;
    };

    const toggleDropdown = (id) => {
        setDropdownOpen(dropdownOpen === id ? null : id);
    };

    const openEditModal = (coupon) => {
        setSelectedCoupon(coupon);
        setFormData({
            description: coupon.description,
            discount_value: coupon.discount_value,
            start_date: coupon.start_date.split('T')[0],
            end_date: coupon.end_date.split('T')[0],
        });
        setIsEditModalOpen(true);
        setDropdownOpen(null);
    };

    const handleEditSubmit = async () => {
        try {
            await axiosInstance.put(`/coupons/${selectedCoupon.id}`, formData);
            showNotification('Mã giảm giá đã được cập nhật thành công!');
            setIsEditModalOpen(false);
            fetchCoupons();
        } catch (error) {
            console.error('Lỗi khi cập nhật mã giảm giá:', error);
        }
    };

    const openDeleteModal = (coupon) => {
        setSelectedCoupon(coupon);
        setIsDeleteModalOpen(true);
        setDropdownOpen(null);
    };

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/coupons/${selectedCoupon.id}`);
            showNotification('Mã giảm giá đã được xóa thành công!');
            setIsDeleteModalOpen(false);
            fetchCoupons();
        } catch (error) {
            console.error('Lỗi khi xóa mã giảm giá:', error);
        }
    };

    const handleAddCoupon = async (data) => {
        try {
            await axiosInstance.post('/coupons', data);
            showNotification('Mã giảm giá đã được thêm thành công!');
            setIsAddModalOpen(false);
            fetchCoupons();
        } catch (error) {
            console.error('Lỗi khi thêm mã giảm giá:', error);
        }
    };

    return (
        <div className="container mx-auto  p-4">
            <div className="flex justify-between items-center mb-8 bg-[#FAFAFC] p-6 rounded-xl shadow-md">
                <div className="flex items-center space-x-4">
                    <img src={logo} alt="Logo" className="w-16" />
                    <h1 className="text-2xl font-bold text-[#5789cf]">
                        Quản Lý Mã Giảm Giá
                    </h1>
                </div>
                <p className="text-gray-600 text-lg">{vietnameseDate}</p>
            </div>
            {notification && (
                <div className="fixed z-10 top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                    {notification}
                </div>
            )}
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Danh Sách Mã Giảm Giá</h1>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    + Thêm Mã Giảm Giá
                </button>
            </div>

            {/* Table */}
            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-lg">
                <thead>
                    <tr className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Mã Giảm Giá</th>
                        <th className="px-4 py-3">Mô Tả</th>
                        <th className="px-4 py-3">Loại</th>
                        <th className="px-4 py-3">Giá Trị</th>
                        <th className="px-4 py-3">Ngày Bắt Đầu</th>
                        <th className="px-4 py-3">Ngày Kết Thúc</th>
                        <th className="px-4 py-3">Sản Phẩm</th>
                        <th className="px-4 py-3">Trạng Thái</th>
                        <th className="px-4 py-3 text-center">Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="10" className="text-center py-4">
                                Đang tải...
                            </td>
                        </tr>
                    ) : (
                        coupons.map((coupon) => (
                            <tr key={coupon.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">{coupon.id}</td>
                                <td className="px-4 py-3">{coupon.code}</td>
                                <td className="px-4 py-3">
                                    {coupon.description}
                                </td>
                                <td className="px-4 py-3">
                                    {coupon.discount_type}
                                </td>
                                <td className="px-4 py-3">
                                    {coupon.discount_value}%
                                </td>
                                <td className="px-4 py-3">
                                    {formatDate(coupon.start_date)}
                                </td>
                                <td className="px-4 py-3">
                                    {formatDate(coupon.end_date)}
                                </td>
                                <td className="px-4 py-3">
                                    {coupon.CouponProduct?.name ||
                                        'Không áp dụng'}
                                </td>
                                <td className="px-4 py-3">
                                    {coupon.is_active
                                        ? 'Đang hoạt động'
                                        : 'Không hoạt động'}
                                </td>
                                <td className="px-4 py-3 text-center relative">
                                    <button
                                        onClick={() =>
                                            toggleDropdown(coupon.id)
                                        }
                                    >
                                        <MoreVertIcon />
                                    </button>
                                    {dropdownOpen === coupon.id && (
                                        <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg z-10">
                                            <button
                                                className="flex px-4 py-2 hover:bg-gray-100"
                                                onClick={() =>
                                                    openEditModal(coupon)
                                                }
                                            >
                                                <EditIcon className="mr-2" />{' '}
                                                Chỉnh sửa
                                            </button>
                                            <button
                                                className="flex px-4 py-2 hover:bg-gray-100 text-red-500"
                                                onClick={() =>
                                                    openDeleteModal(coupon)
                                                }
                                            >
                                                <DeleteIcon className="mr-2" />{' '}
                                                Xóa
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {isAddModalOpen && (
                <AddCouponModal
                    onClose={() => setIsAddModalOpen(false)}
                    onSave={handleAddCoupon}
                />
            )}
            {isEditModalOpen && (
                <EditCouponModal
                    formData={formData}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                        })
                    }
                    onSave={handleEditSubmit}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg">
                        <h2 className="text-lg font-bold mb-4">
                            Bạn có chắc chắn muốn xóa mã giảm giá này không?
                        </h2>
                        <div className="flex justify-end">
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Xóa
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Coupon;
