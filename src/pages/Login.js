import React, { useState } from "react";
import { Translate } from "react-localize-redux";
import { login } from "./../store/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function doLogin(username, password) {
    dispatch(login(username, password));
  }

  const user = useSelector((state) => state.user);
  // useEffect(() => {
  //     dispatch(getOrder(orderId, 2));
  //     // dispatch(addMedicinesToAttachments([],true));
  // }, []);

  return (
    <div className="container d-flex flex-column full-height justify-content-center">
      <div>
        <div className="text-light font-weight-bold mb-3 h3">
          <Translate id="general.medic" />
        </div>
        <div className="text-light mb-5">
          <Translate id="general.webAppIntroMsg" />
        </div>
      </div>
      <div class="login-form-wrapper">
        <Translate>
          {({ translate }) => (
            <input
              style={{ textAlign: "center", marginBottom: 10, fontSize: 16 }}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-75 mb-3"
              placeholder={translate("general.mobileNo")}
            />
          )}
        </Translate>
        <Translate>
          {({ translate }) => (
            <input
              style={{ textAlign: "center", marginBottom: 10, fontSize: 16 }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-75 mb-3"
              placeholder={translate("general.password")}
            />
          )}
        </Translate>
        {user.hasError && user.error && (
          <div className="text-danger">
            <span>
              {Object.keys(user.error).map((key, index) => {
                return user.error[key]["message"];
              })}
            </span>
          </div>
        )}

        <button
          onClick={() => doLogin(username, password)}
          className="w-100 button-secondary mt-4"
        >
          <Translate id="general.login" />
        </button>
      </div>
    </div>
  );
}
