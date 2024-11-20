import React, { useState } from 'react';
import { useAuthStore } from '@store/authStore';
import { Card, Badge, Text, Flex, Image } from '@mantine/core';
import useFetchData from '@hooks/useFetchData';

function ShopStore() {
    const { user } = useAuthStore();

    const {
        data: storeInfo,
        loading,
        error,
    } = useFetchData(user ? `/auth/users/${user.id}` : null, {}, 'GET');

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        console.error('Error fetching store data:', error);
        return <Text>Error loading store data.</Text>;
    }
    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
            {storeInfo && (
                <Card
                    shadow="sm"
                    padding="lg"
                    style={{ marginBottom: '30px', borderRadius: '10px' }}
                >
                    <Flex direction="column" align="center">
                        <Image
                            src={storeInfo.store_logo || 'No Image'}
                            alt={`${storeInfo.store_description} Logo`}
                            width={120}
                            height={120}
                            style={{
                                borderRadius: '50%',
                                marginBottom: '20px',
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                        <Text
                            size="xl"
                            weight={700}
                            style={{
                                textAlign: 'center',
                                marginBottom: '10px',
                            }}
                        >
                            {storeInfo.store_name}
                        </Text>
                        <Text
                            color="dimmed"
                            align="center"
                            style={{ fontStyle: 'italic', marginBottom: '5px' }}
                        >
                            {storeInfo.store_description || 'No Description'}
                        </Text>
                        <Text align="center" style={{ marginBottom: '10px' }}>
                            <strong>Địa chỉ:</strong>{' '}
                            {storeInfo.store_address || 'No Address'}
                        </Text>
                        <Text color="dimmed" align="center">
                            <strong>Liên hệ:</strong>{' '}
                            {storeInfo.phone || 'No Phone'}
                        </Text>
                        {storeInfo.is_store_verified && (
                            <Badge
                                color="green"
                                size="lg"
                                style={{ marginTop: '15px' }}
                            >
                                Verified Store
                            </Badge>
                        )}
                    </Flex>
                </Card>
            )}
        </div>
    );
}

export default ShopStore;
