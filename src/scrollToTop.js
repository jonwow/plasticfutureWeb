import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";


export default function ScrollToTop(props) {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    var elmnt = document.getElementsByClassName("container");
    elmnt[0].scrollLeft = 0;
    elmnt[0].scrollTop = 0;
  }, [pathname]);

  return null;
}
