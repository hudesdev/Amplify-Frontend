import { useState } from 'react';

const useLoginModal = () => {
  const [isLogin, setIsShowing] = useState(false);

  function toggleLogin() {
    setIsShowing(!isLogin);
  }

  return {
    isLogin,
    toggleLogin,
  }
};

export default useLoginModal;