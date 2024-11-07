import { Group, Image } from '@mantine/core';
import { Carousel } from 'react-responsive-carousel';

function ShopBanner() {
    const images = [
        'https://shop.akc.org/cdn/shop/files/shop-homepage-hero-desktop-promo-april-johnson.png?crop=center&height=420&v=1728675943&width=1440',
        'https://shop.akc.org/cdn/shop/files/shop-homepage-hero-desktop-product-highlight-paikka-pumpkin-playmats.png?crop=center&height=420&v=1727819206&width=1440',
        'https://shop.akc.org/cdn/shop/files/shop-homepage-hero-desktop-new-arrivals-early-fall.png?crop=center&height=840&v=1722805278&width=2880',
    ];

    return (
        <Group h={420}>
            <Carousel infiniteLoop autoPlay interval={5000} showThumbs={false}>
                {images.map((image, index) => (
                    <Image src={image} key={index} h={420} />
                ))}
            </Carousel>
        </Group>
    );
}

export default ShopBanner;
