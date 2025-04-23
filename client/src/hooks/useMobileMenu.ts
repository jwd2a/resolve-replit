import { useState, useCallback, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const openMenu = useCallback(() => {
    setIsOpen(true);
  }, []);
  
  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);
  
  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  // Close menu when changing to desktop view
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);
  
  return {
    isOpen,
    openMenu,
    closeMenu,
    toggleMenu
  };
}
