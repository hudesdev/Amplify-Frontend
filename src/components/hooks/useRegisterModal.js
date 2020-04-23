import { useState } from 'react';

const useRegisterModal = () => {
  const [isRegister, setIsShowing] = useState(false);

  function toggleRegister() {
    setIsShowing(!isRegister);
  }

  return {
    isRegister,
    toggleRegister,
  }
};

export default useRegisterModal;