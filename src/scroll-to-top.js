import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";


export default function ScrollToTop() {
  const { pathname } = useLocation();
  console.log('yessirski');
  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    var elmnt = document.getElementsByClassName("container");
    elmnt[0].scrollLeft = 0;
    elmnt[0].scrollTop = 0;
    

    console.log('yo im changing ')
  }, [pathname]);

  return null;
}
