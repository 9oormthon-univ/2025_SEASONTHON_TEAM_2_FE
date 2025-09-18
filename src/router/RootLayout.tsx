import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../style/CustomToast.css";
import useSSE from '../hooks/useSSE.tsx';
import NotificationModal from '../components/modal/NotificationModal.tsx';
import {useState} from "react"; // NotificationModal 경로 확인 필요


const RootLayout = () => {
    const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);

    useSSE(() => {
        setNotificationModalOpen(true);
    });

  return (
    <>
      <Outlet />
      <ToastContainer
        limit={3}
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
        <NotificationModal
            isOpen={isNotificationModalOpen}
            onClose={() => setNotificationModalOpen(false)}
        />
    </>
  );
};

export default RootLayout;
