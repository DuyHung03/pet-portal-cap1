import React, { useState } from 'react';

const AddCouponModal = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        code: '',
        description: '',
        discount_type: 'Percentage',
        discount_value: '',
        start_date: '',
        end_date: '',
        product_id: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Thêm Mã Giảm Giá</h2>
                <form className="space-y-4">
                    <input
                        type="text"
                        name="code"
                        placeholder="Mã giảm giá"
                        value={formData.code}
                        onChange={handleInputChange}
                        className="border px-4 py-2 w-full rounded"
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Mô tả"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="border px-4 py-2 w-full rounded"
                        required
                    />
                    <select
                        name="discount_type"
                        value={formData.discount_type}
                        onChange={handleInputChange}
                        className="border px-4 py-2 w-full rounded"
                    >
                        <option value="Percentage">Percentage</option>
                        <option value="Fixed">Fixed</option>
                        <option value="FreeShipping">Free Shipping</option>
                    </select>
                    <input
                        type="number"
                        name="discount_value"
                        placeholder="Giá trị giảm"
                        value={formData.discount_value}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFormData({
                                ...formData,
                                discount_value: Math.max(1, value),
                            });
                        }}
                        className="border px-4 py-2 w-full rounded"
                        required
                    />
                    <input
                        type="date"
                        name="start_date"
                        placeholder="Ngày bắt đầu"
                        value={formData.start_date}
                        onChange={handleInputChange}
                        className="border px-4 py-2 w-full rounded"
                        required
                    />
                    <input
                        type="date"
                        name="end_date"
                        placeholder="Ngày kết thúc"
                        value={formData.end_date}
                        onChange={handleInputChange}
                        className="border px-4 py-2 w-full rounded"
                        required
                    />
                    <input
                        type="number"
                        name="product_id"
                        placeholder="ID sản phẩm"
                        value={formData.product_id}
                        onChange={handleInputChange}
                        className="border px-4 py-2 w-full rounded"
                    />
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500 mr-2 hover:text-gray-700"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Thêm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCouponModal;
