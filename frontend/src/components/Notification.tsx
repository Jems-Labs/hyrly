import { notificationType } from "@/lib/types";
import { useApp } from "@/stores/useApp";
import { X } from "lucide-react";

function Notification({ notification }: { notification: notificationType }) {
  const { deleteNotification, fetchMyNotifications } = useApp();

  const handleDelete = async () => {
    await deleteNotification(notification?.id);
    fetchMyNotifications();
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm flex justify-between bg-secondary">
      <p className="text-lg">{notification?.message}</p>
      <button
        className="cursor-pointer hover:text-red-500 transition"
        onClick={handleDelete}
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}

export default Notification;
