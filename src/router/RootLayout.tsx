import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../style/CustomToast.css";

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="custom-welcome-toast"
      />
    </>
  );
};

export default RootLayout;
