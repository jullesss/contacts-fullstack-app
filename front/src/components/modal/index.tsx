import React from "react";
import { createPortal } from "react-dom";
import { ReactNode, useEffect, useRef } from "react";
import { Container } from ".";

export interface ModalProps {
  toggleModal: () => void;
  children: ReactNode;
}

export const Modal = ({ children, toggleModal }: ModalProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current) {
        return;
      }
      if (!e.target) {
        return;
      }
      if (!ref.current?.contains(e.target as HTMLElement)) {
        toggleModal();
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [toggleModal]);

  return createPortal(
    <Container>
      <section ref={ref}>{children}</section>
    </Container>,
    document.body
  );
};
