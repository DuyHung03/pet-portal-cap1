import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../component/user/sidebar';

const UserProfile = () => {
    const { user, isAuthenticated, updateUserProfile } = useAuthStore();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [editUserData, setEditUserData] = useState({
        full_name: user.full_name || '',
        gender: user.gender || '',
        date_of_birth: user.date_of_birth || '',
        address: user.address || '',
        email: user.email || '',
        phone: user.phone || '',
        avatar: user.avatar || '', // Avatar hiện tại của người dùng
    });

    const [selectedPage, setSelectedPage] = useState('profile');
    const [errors, setErrors] = useState({});

    if (!isAuthenticated) {
        navigate('/login');
    }

    const handleSelectPage = (page) => {
        setSelectedPage(page);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!editUserData.full_name.trim())
            newErrors.full_name = 'Họ và tên là bắt buộc';
        if (!editUserData.gender.trim())
            newErrors.gender = 'Giới tính là bắt buộc';
        if (!editUserData.date_of_birth)
            newErrors.date_of_birth = 'Ngày sinh là bắt buộc';
        if (!editUserData.address.trim())
            newErrors.address = 'Địa chỉ là bắt buộc';
        if (!editUserData.phone.trim())
            newErrors.phone = 'Số điện thoại là bắt buộc';
        if (!editUserData.email.trim()) newErrors.email = 'Email là bắt buộc';
        return newErrors;
    };

    const handleSaveChanges = () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setErrors({});
            updateUserProfile(editUserData);
            setIsEditing(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditUserData((prevData) => ({
                    ...prevData,
                    avatar: reader.result, // Cập nhật avatar khi chọn ảnh mới
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            <Sidebar onSelectPage={handleSelectPage} />

            <main className="flex-1 p-8">
                {selectedPage === 'profile' && (
                    <section className="bg-white p-8 rounded-lg shadow-lg">
                        {/* Header with User Info */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-6">
                                {/* Avatar */}
                                <div className="relative w-32 h-32">
                                    <img
                                        src={
                                            editUserData.avatar ||
                                            'https://via.placeholder.com/150'
                                        }
                                        alt="Ảnh đại diện"
                                        className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                                    />
                                    {/* Button to edit image */}
                                    <button
                                        className="absolute bottom-0 right-0 bg-purple-700 text-white rounded-full p-2"
                                        onClick={() =>
                                            document
                                                .getElementById('imageInput')
                                                .click()
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M3.5 4a1.5 1.5 0 011.5-1.5h11a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013.5 16V4zm7.5 2a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H11a.75.75 0 01-.75-.75z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                    <input
                                        id="imageInput"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </div>
                                {/* Name and Basic Info */}
                                <div className="flex flex-col">
                                    <h2 className="text-3xl font-semibold text-gray-800">
                                        {user.full_name || 'Chưa có tên'}
                                    </h2>
                                    <p className="text-lg text-gray-600">
                                        {user.title || 'Chức danh người dùng'}
                                    </p>
                                    <button
                                        className="mt-2 text-purple-700 hover:underline"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Chỉnh sửa hồ sơ
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* User Information Section */}
                        <div className="grid grid-cols-2 gap-6">
                            {/* User info */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-all">
                                    <span className="font-semibold text-gray-800 w-32">
                                        Giới tính:
                                    </span>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="gender"
                                            value={editUserData.gender}
                                            onChange={handleInputChange}
                                            className="text-gray-600 w-full p-2 border border-gray-300 rounded-lg"
                                        />
                                    ) : (
                                        <span className="text-gray-600">
                                            {user.gender || 'Chưa có thông tin'}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-all">
                                    <span className="font-semibold text-gray-800 w-32">
                                        Ngày sinh:
                                    </span>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            name="date_of_birth"
                                            value={editUserData.date_of_birth}
                                            onChange={handleInputChange}
                                            className="text-gray-600 w-full p-2 border border-gray-300 rounded-lg"
                                        />
                                    ) : (
                                        <span className="text-gray-600">
                                            {user.date_of_birth ||
                                                'Chưa có thông tin'}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-all">
                                    <span className="font-semibold text-gray-800 w-32">
                                        Địa chỉ:
                                    </span>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="address"
                                            value={editUserData.address}
                                            onChange={handleInputChange}
                                            className="text-gray-600 w-full p-2 border border-gray-300 rounded-lg"
                                        />
                                    ) : (
                                        <span className="text-gray-600">
                                            {user.address ||
                                                'Chưa có thông tin'}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-all">
                                    <span className="font-semibold text-gray-800 w-32">
                                        Số điện thoại:
                                    </span>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="phone"
                                            value={editUserData.phone}
                                            onChange={handleInputChange}
                                            className="text-gray-600 w-full p-2 border border-gray-300 rounded-lg"
                                        />
                                    ) : (
                                        <span className="text-gray-600">
                                            {user.phone || 'Chưa có thông tin'}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-all">
                                    <span className="font-semibold text-gray-800 w-32">
                                        Email:
                                    </span>
                                    <span className="text-gray-600">
                                        {user.email}
                                    </span>
                                </div>
                            </div>

                            {/* Save/Cancel buttons */}
                            {isEditing && (
                                <div className="flex flex-col items-center justify-end space-y-4">
                                    <button
                                        onClick={handleSaveChanges}
                                        className="bg-purple-700 text-white p-3 rounded-lg w-full"
                                    >
                                        Lưu thay đổi
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="bg-gray-300 text-gray-800 p-3 rounded-lg w-full"
                                    >
                                        Hủy
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                )}
                {selectedPage === 'products' && (
                    <section className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">
                            Sản phẩm đã mua
                        </h2>
                        <div className="space-y-4">
                            <div className="bg-gray-100 p-4 rounded-lg shadow">
                                <h3 className="font-bold">Blazer Mới</h3>
                                <p className="text-gray-600">Giá: 500 đô</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg shadow">
                                <h3 className="font-bold">Giày Thể Thao</h3>
                                <p className="text-gray-600">Giá: 100 đô</p>
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default UserProfile;
