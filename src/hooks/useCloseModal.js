import { useEffect } from "react";
import { useRef } from "react";

export function useCloseModal(closeModal, propagation = true) {
  const closeRef = useRef();

  useEffect(
    function () {
      function modalClose(e) {
        if (closeRef.current && !closeRef.current.contains(e.target)) {
          closeModal();
        }
      }

      document.addEventListener("click", modalClose, propagation);
      return () =>
        document.removeEventListener("click", modalClose, propagation);
    },
    [closeModal, propagation]
  );
  return { closeRef };
}
