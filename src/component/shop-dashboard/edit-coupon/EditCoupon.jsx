import React from 'react';

const EditCouponModal = ({ formData, onChange, onSave, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">
                    Chỉnh Sửa Mã Giảm Giá
                </h2>

                <div className="space-y-3">
                    <input
                        name="description"
                        value={formData.description}
                        onChange={onChange}
                        placeholder="Mô tả"
                        className="border px-4 py-2 w-full rounded"
                    />
                    <input
                        name="discount_value"
                        value={formData.discount_value}
                        onChange={onChange}
                        placeholder="Giá trị giảm"
                        className="border px-4 py-2 w-full rounded"
                    />
                    <input
                        name="start_date"
                        value={formData.start_date}
                        onChange={onChange}
                        placeholder="Ngày bắt đầu"
                        type="date"
                        className="border px-4 py-2 w-full rounded"
                    />
                    <input
                        name="end_date"
                        value={formData.end_date}
                        onChange={onChange}
                        placeholder="Ngày kết thúc"
                        type="date"
                        className="border px-4 py-2 w-full rounded"
                    />
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Lưu
                    </button>
                    <button
                        onClick={onClose}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditCouponModal;
