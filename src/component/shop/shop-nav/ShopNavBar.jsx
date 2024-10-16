import { Group, Text } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function ShopNavBar() {
  const location = useLocation();
  const [showSubNav, setShowSubNav] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);

  const isActive = (path) => location.pathname === path;

  return (
    <Group
      w={'100%'}
      justify="center"
      align="center"
      bg={'#f5f5f5'}
      p={10}
      style={{
        border: '1px solid #dfe6e9',
        padding: '5px',
      }}
    >
      <Group maw={1440} spacing="xs">
        <Link to={'/'}>
          <Text
            c={isActive('/') || hoveredNav === '/' ? 'white' : 'dark'}
            size="md"
            pr={12}
            pl={12}
            pt={6}
            pb={6}
            bg={isActive('/') || hoveredNav === '/' ? '#dfe6e9' : 'transparent'}
            onMouseEnter={() => setHoveredNav('/')}
            onMouseLeave={() => setHoveredNav(null)}
            style={{ transition: 'background-color 0.3s' }}
          >
            Trang Chủ
          </Text>
        </Link>
        <Link to={'/shop'}>
          <Text
            c={isActive('/shop') || hoveredNav === 'home' ? 'white' : 'dark'}
            size="md"
            pr={12}
            pl={12}
            pt={6}
            pb={6}
            bg={
              isActive('/shop') || hoveredNav === 'home'
                ? 'blue'
                : 'transparent'
            }
            onMouseEnter={() => setHoveredNav('home')}
            onMouseLeave={() => setHoveredNav(null)}
            style={{ transition: 'background-color 0.3s' }}
          >
            Cửa Hàng
          </Text>
        </Link>

        <div
          onMouseEnter={() => {
            setShowSubNav(true);
            setHoveredNav('collection');
          }}
          onMouseLeave={() => {
            setShowSubNav(false);
            setHoveredNav(null);
          }}
          style={{ position: 'relative' }}
        >
          <Link to={'/collection'}>
            <Text
              c={
                isActive('/collection') || hoveredNav === 'collection'
                  ? 'white'
                  : 'dark'
              }
              size="md"
              pr={12}
              pl={12}
              pt={6}
              pb={6}
              bg={
                isActive('/collection') || hoveredNav === 'collection'
                  ? '#dfe6e9'
                  : 'transparent'
              }
              style={{ transition: 'background-color 0.3s' }}
            >
              Sản Phẩm
            </Text>
          </Link>

          {showSubNav && (
            <Group
              direction="column"
              spacing={0}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: '#ffffff',
                border: '1px solid #dfe6e9',
                borderRadius: '8px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                zIndex: 1000,
                padding: '8px 0',
                width: '150px',
              }}
            >
              <Link to={'/collection/meo'}>
                <Text
                  p={10}
                  c="dark"
                  size="sm"
                  style={{ transition: 'background-color 0.3s' }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = '#dfe6e9')
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = 'transparent')
                  }
                >
                  Sản phẩm cho mèo
                </Text>
              </Link>
              <Link to={'/collection/cho'}>
                <Text
                  p={10}
                  c="dark"
                  size="sm"
                  style={{ transition: 'background-color 0.3s' }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = '#dfe6e9')
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = 'transparent')
                  }
                >
                  Sản phẩm cho chó
                </Text>
              </Link>
              <Link to={'/collection/chim'}>
                <Text
                  p={10}
                  c="dark"
                  size="sm"
                  style={{ transition: 'background-color 0.3s' }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = '#dfe6e9')
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = 'transparent')
                  }
                >
                  Sản phẩm cho chim
                </Text>
              </Link>
            </Group>
          )}
        </div>

        <Link to={'/phu-kien'}>
          <Text
            c={
              isActive('/phu-kien') || hoveredNav === 'phukien'
                ? 'white'
                : 'dark'
            }
            size="md"
            pr={12}
            pl={12}
            pt={6}
            pb={6}
            bg={
              isActive('/phu-kien') || hoveredNav === 'phukien'
                ? '#dfe6e9'
                : 'transparent'
            }
            onMouseEnter={() => setHoveredNav('phukien')}
            onMouseLeave={() => setHoveredNav(null)}
            style={{ transition: 'background-color 0.3s' }}
          >
            Phụ Kiện
          </Text>
        </Link>
        <Link to={'/lien-he'}>
          <Text
            c={
              isActive('/lien-he') || hoveredNav === 'contact'
                ? 'white'
                : 'dark'
            }
            size="md"
            pr={12}
            pl={12}
            pt={6}
            pb={6}
            bg={
              isActive('/lien-he') || hoveredNav === 'contact'
                ? '#dfe6e9'
                : 'transparent'
            }
            onMouseEnter={() => setHoveredNav('contact')}
            onMouseLeave={() => setHoveredNav(null)}
            style={{ transition: 'background-color 0.3s' }}
          >
            Liên hệ
          </Text>
        </Link>

        <Link to={'/gioi-thieu'}>
          <Text
            c={
              isActive('/gioi-thieu') || hoveredNav === 'about'
                ? 'white'
                : 'dark'
            }
            size="md"
            pr={12}
            pl={12}
            pt={6}
            pb={6}
            bg={
              isActive('/gioi-thieu') || hoveredNav === 'about'
                ? '#dfe6e9'
                : 'transparent'
            }
            onMouseEnter={() => setHoveredNav('about')}
            onMouseLeave={() => setHoveredNav(null)}
            style={{ transition: 'background-color 0.3s' }}
          >
            Giới Thiệu
          </Text>
        </Link>
      </Group>
    </Group>
  );
}

export default ShopNavBar;
