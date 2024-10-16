import { useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function useHooks() {
  const userRef = useRef(null);

  const navigate = useNavigate();

  const location = useLocation();

  const calculatedValue = useMemo(() => {
    return 100;
  }, []);

  useEffect(() => {
    console.log('Component mounted');

    return () => {
      console.log('Component unmounted');
    };
  }, []);

  const goToPage = (page) => {
    if (!page) {
      console.error('No page provided for navigation');
      return;
    }
    navigate(page);
  };

  return {
    calculatedValue,
    goToPage,
    location,
    userRef,
  };
}

export default useHooks;
