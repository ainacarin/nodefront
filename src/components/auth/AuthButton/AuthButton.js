import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../shared";
import { logout } from "../../../api/auth";
import { AuthContextConsumer } from "../context";
import ModalConfirm from "../../shared/ModalConfirm";

const AuthButton = ({ className, isLogged, onLogout }) => {
  // const handleLogoutClick = () => {
  //   logout().then(onLogout);
  // };

  const [isConfirmDisplay, setIsConfirmDisplay] = React.useState(false);

  const handleLogout = () => {
    logout().then(onLogout);
  };

  const handleLogoutClick = () => {
    setIsConfirmDisplay(true);
  };

  const callback = (flag) => {
    setIsConfirmDisplay(false);
    if (flag) {
      handleLogout();
    }
  };

  const props = isLogged
    ? { onClick: handleLogoutClick, children: "Log out" }
    : {
        as: Link,
        to: "/login",
        children: "Log in",
      };

  return (
    <div>
      <Button className={className} {...props}></Button>
      {isConfirmDisplay && (
        <ModalConfirm
          title="¿Está seguro?"
          message="Esta acción no tiene vuelta atrás"
          buttonPressed={callback}
          mainStyle={{ top: 0 }, { left: 0 }}
        />
      )}
    </div>
  );
};

AuthButton.defaultProps = {
  isLogged: false,
};

const ConnectedAuthButton = (props) => {
  return (
    <AuthContextConsumer>
      {(value) => {
        return (
          <AuthButton
            isLogged={value.isLogged}
            onLogout={value.onLogout}
            {...props}
          />
        );
      }}
    </AuthContextConsumer>
  );
};

export default ConnectedAuthButton;

// export default AuthButton;
