import Notification from "@/components/Notification";
import { useApp } from "@/stores/useApp";

function Notifications() {
  const { notifications } = useApp();

  return notifications.length === 0 ? (
    <div className="px-10 py-5">
      <h1 className="text-3xl font-semibold">Notifications</h1>
      <p className="text-gray-500 text-sm  mt-4">No Notifications found</p>{" "}
    </div>
  ) : (
    <div className="px-10 py-5">
      <h1 className="text-3xl font-semibold mt-4 mb-4">Notifications</h1>
      <div className="flex flex-col gap-2">


        {notifications?.map((notification, index) => {
          return (
            <>
              <Notification key={index} notification={notification} />
            </>
          )
        })}
      </div>
    </div>
  );
}

export default Notifications;