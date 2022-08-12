import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = ({path : newPath}) => {
   // const location = useLocation();
   // const path = location.pathname.split("/").filter(x => x);
   // let tyt = location.href.split("=").filter(e => e);
   // tyt.shift();
   let path = newPath.filter(x => x);
   return (
      <Breadcrumb>
         <Link to={"/"}><FontAwesomeIcon style={{ fontSize: "13px", color: "var(--color-dark)" }} icon={faHome} /></Link>
         <span>&nbsp;<FontAwesomeIcon style={{ fontSize: "13px", color: "orange" }} icon={faChevronRight}/>&nbsp;</span>
         {
            path && path.map((e, i, arr) => {

               const routeTo = `${path.slice(0, i + 1).join("/")}`;
               let lastOne = arr.length - 1 === i;
               return (
                  <React.Fragment key={i}>
                     <Link to={"/" + routeTo} style={lastOne ? { pointerEvents: "none", color: "gray" } : { pointerEvents: "auto" }}>
                        {e.replace(/[-]/g, " ")}
                     </Link>
                     {i < path.length - 1 && <span>&nbsp;<FontAwesomeIcon style={{ fontSize: "13px", color: "orange" }} icon={faChevronRight}/>&nbsp;</span>}
                  </React.Fragment>
               )
            })
         }
      </Breadcrumb>
   );
};

export default Breadcrumbs;

// const Breadcrumbs = () => {
//    const location = useLocation();
//    const path = location.pathname.split("/").filter(x => x);
//    // let tyt = location.href.split("=").filter(e => e);
//    // tyt.shift();
//    // console.log(tyt);
//    return (
//       <Breadcrumb>
//          <Link to={"/"}> <FontAwesomeIcon icon={faHome} /> Home</Link>
//          <span>&nbsp;/&nbsp;</span>
//          {
//             path && path.map((e, i, arr) => {
//                const routeTo = `${path.slice(0, i + 1).join("/")}`;
//                let lastOne = arr.length - 1 === i;
//                return (
//                   <React.Fragment key={i}>
//                      <Link to={"/" + routeTo} style={lastOne ? { pointerEvents: "none", color: "gray" } : { pointerEvents: "auto" }}>
//                         {e.replace("%20", " ")}
//                      </Link>
//                      {i < path.length - 1 && <span>&nbsp;/&nbsp;</span>}
//                   </React.Fragment>
//                )
//             })
//          }
//       </Breadcrumb>
//    );
// };

// export default Breadcrumbs;