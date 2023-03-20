import { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

interface Type {
  portalElement: Element | DocumentFragment;
}
const Backdrop = (props: any) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props: any) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
// add a null-check "!"
const portalElement = document.getElementById("overlays")!;

const Modal = (props: any) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
