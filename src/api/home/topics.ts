import axios from "axios";

interface ICurrentTopicResponse {
  activeFrom: string;
  activeUntil: string;
  id: number;
  question: string;
}

const getCurrentTopic = async () => {
  const response = await axios
    .get<{ data: ICurrentTopicResponse }>(
      `${import.meta.env.VITE_API_URL}/api/home/topics/current`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
    .then((res) => res.data);

  return response.data || [];
};

export { getCurrentTopic };
